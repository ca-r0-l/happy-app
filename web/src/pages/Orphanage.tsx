import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import "../styles/pages/orphanage.css";

interface Orphanage {
	latitude: number;
	longitude: number;
	name: string;
	about: string;
	instructions: string;
	open_on_weekends: boolean;
	opening_hours: string;
	images: {
		url: string;
	}[];
}

interface OrphanageParams {
	id: string;
}

export default function Orphanage() {
	const params = useParams() as OrphanageParams;

	const [orphanage, setOrphanage] = useState<Orphanage>();
	const [activeImageIndex, setActiveImageIndex] = useState(0);

	useEffect(() => {
		api.get(`orphanages/${params.id}`).then((res) => {
			setOrphanage(res.data);
			console.log(res.data)
		});
	}, [params.id]);

	if (!orphanage) {
		return <p>Carregando...</p>;
	}

	return (
		<div id="page-orphanage">
			<Sidebar />
			<main>
				<div className="orphanage-details">
                    {
                        orphanage.images.length > 0 ?
                            (
                                <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />
                            ) : (
                                <img src="#" alt="" />
                            )
                    }
					<div className="images">
						{orphanage.images.map((img, index) => {
							return (
                                <button
                                    className={activeImageIndex === index ? 'active' : ''}
                                    type="button"
                                    key={img.url}
                                    onClick={() => setActiveImageIndex(index)}
                                >
									<img src={img.url} alt={orphanage.name} />
								</button>
							);
						})}
					</div>

					<div className="orphanage-details-content">
						<h1>{orphanage.name}</h1>
						<p>{orphanage.about}</p>

						<div className="map-container">
							<MapContainer
								center={[
									orphanage.latitude,
									orphanage.longitude,
								]}
								zoom={16}
								style={{ width: "100%", height: 280 }}
								dragging={false}
								touchZoom={false}
								zoomControl={false}
								scrollWheelZoom={false}
								doubleClickZoom={false}
							>
								<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
								<Marker
									interactive={false}
									icon={mapIcon}
									position={[
										orphanage.latitude,
										orphanage.longitude,
									]}
								/>
							</MapContainer>

							<footer>
                                <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
							</footer>
						</div>

						<hr />

						<h2>Instruções para visita</h2>
						<p>{orphanage.instructions}</p>

						<div className="open-details">
							<div className="hour">
								<FiClock size={32} color="#15B6D6" />
								{orphanage.opening_hours}
							</div>
                            {
                                orphanage.open_on_weekends ?
                                    (
                                        <div className="open-on-weekends">
                                            <FiInfo size={32} color="#39CC83" />
                                            Atendemos <br />
                                            fim de semana
                                        </div>
                                    ) : (
                                        <div className="open-on-weekends dont-open">
                                            <FiInfo size={32} color="#ff669d" />
                                            Não atendemos <br />
                                            fim de semana
                                        </div>
                                    )
                            }
						</div>

						{/* <button type="button" className="contact-button">
							<FaWhatsapp size={20} color="#FFF" />
							Entrar em contato
						</button> */}
					</div>
				</div>
			</main>
		</div>
	);
}
