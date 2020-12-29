import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import mapMarkerImg from '../images/logo-sem-texto.svg';
import '../styles/pages/orphanages.css';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get("orphanages").then(res => {
            setOrphanages(res.data)
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Logo sem texto" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Cotia</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>
            
            <MapContainer
                center={[-23.691795,-46.5829888]}
                zoom={15}
                style={{width: "100%", height: "100%"}}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {
                    orphanages.map(orp => {
                        return <Marker
                            key={orp.id}
                            icon={mapIcon}
                            position={[orp.latitude, orp.longitude]}
                        >
                            <Popup
                                closeButton={false}
                                minWidth={240 }
                                maxWidth={240}
                                className="map-popup"
                            >
                                {orp.name}
                                <Link to={`/orphanages/${orp.id}`}>
                                    <FiArrowRight
                                        size={20}
                                        color="#fff"
                                    />
                                </Link>
                            </Popup>
                        </Marker>
                    })
                }
            </MapContainer>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus color="#fff" size={32} />
            </Link>
        </div>
    );
}

export default OrphanagesMap;