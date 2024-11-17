// src/components/Map.js
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Hero from "../components/Hero";
import MechanicCards from "../components/MechanicCards";
import MechanicProfile from "../components/MechanicProfile";

// Fix leaflet marker icons for React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const mechanics = [
  {
    id: 1,
    name: "John’s Garage",
    lat: 51.505,
    lng: -0.09,
    specialty: "Engine Repair",
    rating: 4.5,
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Quick Fix Auto",
    lat: 51.515,
    lng: -0.1,
    specialty: "Tire Change",
    rating: 4.7,
    phone: "987-654-3210",
  },
  {
    id: 3,
    name: "24/7 Auto Repair",
    lat: 51.525,
    lng: -0.08,
    specialty: "Battery Replacement",
    rating: 4.3,
    phone: "555-555-5555",
  },
];

const RoadMap = () => {
  const [userLocation, setUserLocation] = useState([51.505, -0.09]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [carDetails, setCarDetails] = useState({ model: "", make: "", issue: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        console.error("Error fetching user location");
      },
    );
  }, []);

  const handleRequest = (e) => {
    e.preventDefault();
    if (!carDetails.model || !carDetails.make || !carDetails.issue) {
      setMessage("Please fill out all car details.");
      return;
    }
    setLoading(true);
    setMessage("");
    setTimeout(() => {
      setLoading(false);
      setMessage(`Request sent to ${selectedMechanic.name} successfully!`);
      setCarDetails({ model: "", make: "", issue: "" });
    }, 2000);
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Mechanic Cards at the Top */}
      <MechanicCards mechanics={mechanics} selectMechanic={setSelectedMechanic} />

      {/* Map and Mechanic Profile Side-by-Side */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="flex justify-center items-center">
          <MapContainer center={userLocation} zoom={13} scrollWheelZoom={false} className="h-96 w-full lg:h-full lg:w-3/4 min-h-[400px]">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            <Marker position={userLocation}>
              <Popup>Your Location</Popup>
            </Marker>
            {mechanics.map((mechanic) => (
              <Marker
                key={mechanic.id}
                position={[mechanic.lat, mechanic.lng]}
                eventHandlers={{
                  click: () => setSelectedMechanic(mechanic),
                }}
              >
                <Popup>{mechanic.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-3/4 flex justify-center items-center min-h-[400px]">
          {selectedMechanic ? (
            <MechanicProfile mechanic={selectedMechanic} carDetails={carDetails} setCarDetails={setCarDetails} handleRequest={handleRequest} />
          ) : (
            <div className="text-center text-orange-600 font-semibold">
              <p>No mechanic selected.</p>
              <p>Select a mechanic from the list or map to view their details.</p>
            </div>
          )}
        </div>
      </div>

      {/* Loading and Message Feedback */}
      {loading && <div className="mt-4 p-4 bg-orange-200 text-orange-800 rounded-md text-center">Sending request...</div>}
      {message && <div className="mt-4 p-4 bg-green-200 text-green-800 rounded-md text-center">{message}</div>}
    </div>
  );
};

export default RoadMap;
