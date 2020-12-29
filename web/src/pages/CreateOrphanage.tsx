import React, { ChangeEvent, FormEvent, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { FiPlus } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import "../styles/pages/create-orphanage.css";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
    const history = useHistory();
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [instructions, setInstructions] = useState("");
    const [openingHours, setOpeningHours] = useState("");
    const [openOnWeekends, setOpenOnWeekends] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    function HackToGetMapPosition() {
        useMapEvents({
          click: (e) => {
            const { lat, lng } = e.latlng;
                                
            setPosition({
                latitude: lat,
                longitude: lng
            });
          }
        });
        return null;
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { latitude, longitude } = position;
        const data = new FormData();

        data.append("name", name);
        data.append("about", about);
        data.append("latitude", String(latitude));
        data.append("longitude", String(longitude));
        data.append("instructions", instructions);
        data.append("opening_hours", openingHours);
        data.append("open_on_weekends", String(openOnWeekends));
        
        images.forEach(img => data.append("images", img));

        await api.post("orphanages", data);

        alert("Cadastrado com sucesso");
        history.push("/app");
    }
    
    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const selectedImages = Array.from(event.target.files);
        setImages(selectedImages);
         
        const selectedImagesPrewiew = selectedImages.map(img => {
            return URL.createObjectURL(img);
        });

        setPreviewImages(selectedImagesPrewiew);
    }

	return (
		<div id="page-create-orphanage">
			<Sidebar />
			<main>
				<form className="create-orphanage-form" onSubmit={handleSubmit}>
					<fieldset>
						<legend>Dados</legend>

						<MapContainer
							center={[-27.2092052, -49.6401092]}
							style={{ width: "100%", height: 280 }}
							zoom={15}
						>
                            <TileLayer
                                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {
                                position.latitude !== 0 &&
                                    <Marker
                                        interactive={false}
                                        icon={mapIcon}
                                        position={[position.latitude, position.longitude]}
                                    />
                            }
							
                            <HackToGetMapPosition />
						</MapContainer>

						<div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
						</div>

						<div className="input-block">
							<label htmlFor="about">
								Sobre <span>Máximo de 300 caracteres</span>
							</label>
                            <textarea
                                id="name"
                                maxLength={300}
                                value={about}
                                onChange={(event) => setAbout(event.target.value)}
                            />
						</div>

						<div className="input-block">
							<label htmlFor="images">Fotos</label>

                            <div className="images-container">
                                {
                                    previewImages.map(img => {
                                        return (
                                            <img key={img} src={img} alt={name} />
                                        );
                                    })
                                }
                                <label
                                    htmlFor="image[]" className="new-image"
                                >
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                            </div>
                            <input
                                onChange={handleSelectImages}
                                multiple
                                type="file"
                                name="image"
                                id="image[]"
                            />
						</div>
					</fieldset>

					<fieldset>
						<legend>Visitação</legend>

						<div className="input-block">
							<label htmlFor="instructions">Instruções</label>
                            <textarea
                                id="instructions"
                                value={instructions}
                                onChange={(event) => setInstructions(event.target.value)}
                            />
						</div>

						<div className="input-block">
							<label htmlFor="opening_hours">Horário de funcionamento</label>
                            <input
                                id="opening_hours"
                                value={openingHours}
                                onChange={(event) => setOpeningHours(event.target.value)}
                            />
						</div>

						<div className="input-block">
							<label htmlFor="open_on_weekends">
								Atende fim de semana
							</label>

							<div className="button-select">
                                <button
                                    type="button"
                                    className={openOnWeekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(true)}
                                >
									Sim
								</button>
                                <button
                                    type="button"
                                    className={!openOnWeekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(false)}
                                >
                                    Não
                                </button>
							</div>
						</div>
					</fieldset>

					<button className="confirm-button" type="submit">
						Confirmar
					</button>
				</form>
			</main>
		</div>
	);
}
