import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Mechanics() {
  const [mechanics, setMechanics] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const { register, handleSubmit, reset } = useForm();

  // Fetch mechanics data
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

  // Handle adding a new mechanic
  const handleAddMechanic = async (data) => {
    try {
      const params = {
        name: data.name,
        email: data.email,
        password: "Qwerty@12",
        title: data.title,
        speciality: data.speciality,
        userType: "mechanic",
        lat: latLng.lat,
        lng: latLng.lng,
        phone: data.number,
      };
      await axios.post("http://localhost:5000/api/v1/register", params);
      fetchMechanics(); // Refresh mechanics list
      reset(); // Clear the form
      setLatLng({ lat: null, lng: null }); // Reset coordinates
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error adding mechanic:", error);
    }
  };

  // Map event handler to capture clicks
  const ClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setLatLng(e.latlng);
      },
    });
    return null;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl text-orange-500 font-bold text-center mb-6">Mechanics</h1>

      {/* Add Mechanic Button */}
      <div className="flex justify-end mb-4">
        <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Add New Mechanic
        </button>
      </div>

      {/* Mechanics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mechanics
          .filter((mechanic) => mechanic?.userType === "mechanic")
          .map((mechanic) => (
            <div key={mechanic._id} className="bg-white shadow-md border border-orange-300 rounded-lg p-4">
              <h2 className="text-xl font-bold text-gray-800">{mechanic.name}</h2>
              <p className="text-gray-600">{mechanic.email}</p>
              <p className="text-gray-700">
                <strong>Title:</strong> {mechanic.title || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Speciality:</strong> {mechanic.speciality || "N/A"}
              </p>
            </div>
          ))}
      </div>

      {/* Add Mechanic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Mechanic</h2>
            <form onSubmit={handleSubmit(handleAddMechanic)}>
              {/* Grid container for two-column layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <label className="block text-gray-700 font-medium">Name</label>
                  <input {...register("name", { required: true })} type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter mechanic name" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Phone Number</label>
                  <input {...register("number", { required: true })} type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter mechanic Number" />
                </div>
                {/* Email Field */}
                <div>
                  <label className="block text-gray-700 font-medium">Email</label>
                  <input {...register("email", { required: true })} type="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter mechanic email" />
                </div>
                {/* Title Field */}
                <div>
                  <label className="block text-gray-700 font-medium">Title</label>
                  <input {...register("title")} type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter mechanic title" />
                </div>
                {/* Speciality Field */}
                <div>
                  <label className="block text-gray-700 font-medium">Speciality</label>
                  <input {...register("speciality")} type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter mechanic speciality" />
                </div>
              </div>
              {/* Map Field */}
              <div className="mt-4">
                <label className="block text-gray-700 font-medium">Location</label>
                <div className="h-64 border rounded overflow-hidden">
                  <MapContainer center={[31.5204, 74.3587]} zoom={13} style={{ height: "100%", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <ClickHandler />
                  </MapContainer>
                </div>
                <div className="mt-2 text-sm text-gray-600">Click on the map to select the mechanic's location.</div>
                <div className="mt-2">
                  <p>
                    Latitude: <strong>{latLng.lat || "N/A"}</strong>
                  </p>
                  <p>
                    Longitude: <strong>{latLng.lng || "N/A"}</strong>
                  </p>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-end mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400">
                  Cancel
                </button>
                <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                  Add Mechanic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mechanics;
