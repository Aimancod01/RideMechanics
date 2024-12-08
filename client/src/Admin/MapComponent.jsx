// TrackingPage.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import axios from 'axios';
const socket = io.connect('http://localhost:5000', {
  withCredentials: true,
});
//{ carId }Tracking.js
const MapComponent = ({ carId }) => {//const { carId } = useParams();
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(true);
  const [locationHistory, setLocationHistory] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!carId) {
      console.error('carId is undefined');
      return;
    }
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/car-location/${carId}`);
         const { latitude, longitude } = response.data;
        if (latitude && longitude) {
          setLocation({ lat: latitude, lng: longitude });
        }else {
          setError('Invalid location data');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching location:', error); setError('Failed to fetch location data');
        setLoading(false);
      }
    };
    const fetchLocationHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/car-location-history/${carId}`); 
        const history = response.data.locationHistory || [];
        setLocationHistory(history);
      } catch (error) {
        console.error('Error fetching location history:', error);
      }
    };

    fetchLocation();
    fetchLocationHistory();


    // Listen for real-time location updates
    socket.on('location-updated', (data) => {
      if (data.carId === carId) {
        setLocation({ lat: data.latitude, lng: data.longitude });
        setLocationHistory((prevHistory) => [...prevHistory, { lat: data.latitude, lng: data.longitude, timestamp: new Date() }]);

      }
    });
    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.off('location-updated');
    };
  }, [carId]);

  
  const updateCarLocation = async (carId, latitude, longitude) => {
    try {
      await axios.post(`http://localhost:5000/api/update-location/${carId}`, {
        latitude,
        longitude,
      });
      console.log('Location updated successfully');
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };
 
  // Optional: Set up real-time updates with WebSocket or polling
  // const interval = setInterval(fetchLocation, 10000); // Fetch location every 10 seconds

  // return () => clearInterval(interval); // Clean up interval on component unmount
  // }, [carId]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <PulseLoader color="#F97316" size={15} />
    </div>
  );; if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full h-96 sm:h-128 lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
        <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup>
              Car is here.
            </Popup>
          </Marker> <Polyline
            positions={locationHistory.map(loc => [loc.lat, loc.lng])}
            color="blue"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;