import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';
import '../styles/pages/orphanages.css';

import mapMarkerImg from '../images/logo-sem-texto.svg';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58,68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});

function OrphanagesMap() {

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

                <Marker
                    icon={mapIcon}
                    position={[-23.691795, -46.5829888]}
                >
                    <Popup
                        closeButton={false}
                        minWidth={240 }
                        maxWidth={240}
                        className="map-popup"
                    >
                        Lar das meninas
                        <Link to="#">
                            <FiArrowRight
                                size={20}
                                color="#fff"
                            />
                        </Link>
                    </Popup>
                </Marker>
            </MapContainer>

            <Link to="" className="create-orphanage">
                <FiPlus color="#fff" size={32} />
            </Link>
        </div>
    );
}

export default OrphanagesMap;