import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { MapContainer, TileLayer } from 'react-leaflet';

import '../styles/pages/orphanages.css';
import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/logo-sem-texto.svg';

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
            </MapContainer>

            <Link to="" className="create-orphanage">
                <FiPlus color="#fff" size={32} />
            </Link>
        </div>
    );
}

export default OrphanagesMap;