// TrackingPage.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import io from  'socket.io-client';
import { useLocation, useParams} from 'react-router-dom';
import axios from 'axios';
const socket = io.connect('http://localhost:5000', {
  withCredentials: true,
  });

const MapComponent = () => {
  const { carId } = useParams();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchLocation = async () => {
      try {if (!carId || carId.length !== 24) {
        throw new Error('Invalid carId');
      }
        const response = await axios.get(`http://localhost:5000/api/cars/${carId}`); if (response.status === 200) {
        setLocation(response.data.currentLocation);
      }else {
        throw new Error('Failed to fetch location');
      } } catch (error) {
        console.error('Error fetching car location:', error);setError('Failed to fetch car location');
      }
    };

    fetchLocation();
  }, [carId]);
  return (
    <div>
      <h1 className="text-2xl font-bold">Tracking</h1>
      {error ? (
        <p>{error}</p>
      ) : location ? (
        <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup>
              Car is here
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default MapComponent;
