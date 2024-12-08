import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Hero from "../components/Hero";
import MechanicCards from "../components/MechanicCards";
import MechanicProfile from "../components/MechanicProfile";
import axios from "axios";

// Leaflet icon settings
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom Icons
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // Example user icon
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const mechanicIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64572.png", // Example mechanic icon
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// Mechanics Data

const RecenterMap = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView(location, 13); // Update map view to new location
    }
  }, [location, map]);
  return null;
};

const RoadMap = () => {
  const [mechanics, setMechanics] = useState([]);
  const [userLocation, setUserLocation] = useState([31.5204, 74.3587]); // Default to Lahore
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [activeTab, setActiveTab] = useState("list"); // Manage tabs

  const [userRequests, setUserRequests] = useState([]);
  const [messages, setMessages] = useState({
    conversation: [],
    newMessage: "",
  });

  const userInfo = JSON.parse(localStorage.getItem("userinfo")); // Get user info from local storage
  const { userType } = userInfo || {};
  async function fetchMechanics() {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/getUsers");
      setMechanics(response.data.users);
    } catch (error) {
      console.error("Error fetching mechanics:", error);
    }
  }

  useEffect(() => {
    fetchMechanics();
  }, []);
  // Extract userType

  const sendMessage = (e) => {
    e.preventDefault();
    if (!messages.newMessage.trim()) return;

    setMessages((prev) => ({
      conversation: [...prev.conversation, { text: prev.newMessage, sender: "user" }],
      newMessage: "",
    }));

    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        conversation: [...prev.conversation, { text: `Mechanic ${selectedMechanic?.name} is typing...`, sender: "mechanic" }],
      }));
    }, 1000);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => setUserLocation([position.coords.latitude, position.coords.longitude]),
      () => console.error("Error fetching user location"),
    );
  }, []);

  useEffect(() => {
    if (selectedMechanic) {
      // Simulate receiving a user request with a random user location
      const userRequest = {
        id: 1,
        name: "Alice",
        location: [31.53, 74.358],
      };
      setUserRequests([userRequest]); // Add user request for mechanic
    }
  }, [selectedMechanic]);
  console.log(
    "Filtered Mechanics:",
    mechanics.filter((mechanic) => mechanic.userType === "mechanic"),
  );

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 my-8">
        {/* Mechanics List and Details */}
        <div className="flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-4/4 flex flex-col min-h-[400px]">
            {/* Tabs */}
            <div className="flex border-b mb-4">
              <button className={`px-4 py-2 ${activeTab === "list" ? "text-orange-600 font-bold border-b-2 border-orange-600" : "text-gray-500"}`} onClick={() => setActiveTab("list")}>
                All Mechanics
              </button>
              <button className={`px-4 py-2 ${activeTab === "detail" ? "text-orange-600 font-bold border-b-2 border-orange-600" : "text-gray-500"}`} onClick={() => setActiveTab("detail")}>
                Mechanic Details
              </button>
            </div>

            {activeTab === "list" ? (
              <div className="flex flex-wrap gap-4 justify-center">
                <MechanicCards mechanics={mechanics} selectMechanic={setSelectedMechanic} />
              </div>
            ) : selectedMechanic ? (
              <MechanicProfile mechanic={selectedMechanic} messages={messages.conversation} setMessages={setMessages} sendMessage={sendMessage} />
            ) : (
              <div className="text-center text-orange-600 font-semibold">
                <p>No mechanic selected.</p>
                <p>Select a mechanic from the list or map to view their details.</p>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <MapContainer center={userLocation} zoom={13} scrollWheelZoom={false} className="h-[500px] w-full lg:w-4/4 lg:h-full min-h-[400px]">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

          {/* Automatically Recenter Map */}
          <RecenterMap location={userLocation} />

          {/* User Location Marker */}
          <Marker position={userLocation} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>
          <Circle
            center={userLocation}
            radius={500}
            pathOptions={{
              color: "orange",
              fillColor: "orange",
              fillOpacity: 0.3,
            }}
          />

          {/* Mechanics Markers */}
          {mechanics
            .filter((mechanic) => mechanic?.userType === "mechanic")
            .map((mechanic) => (
              <Marker
                key={mechanic.id}
                position={[mechanic.lat, mechanic.lng]}
                icon={mechanicIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedMechanic(mechanic); // Set the selected mechanic when the marker is clicked
                    setActiveTab("detail"); // Switch to the detail tab
                  },
                }}
              >
                <Popup>
                  <div>
                    <strong>{mechanic.name}</strong>
                  </div>
                </Popup>
              </Marker>
            ))}
          {selectedMechanic && <Polyline positions={[userLocation, [selectedMechanic.lat, selectedMechanic.lng]]} pathOptions={{ color: "orange", weight: 4 }} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default RoadMap;
