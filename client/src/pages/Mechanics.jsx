import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Mechanics() {
  const [mechanics, setMechanics] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

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

  const handleAddMechanic = async (data) => {
    try {
      const params = {
        name: data.name,
        email: data.email,
        password: "Qwerty@12",
        title: data.title,
        speciality: data.speciality,
        userType: "mechanic",
      };
      await axios.post("http://localhost:5000/api/v1/register", params);
      fetchMechanics();
      reset(); // Clear the form
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error adding mechanic:", error);
    }
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
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Mechanic</h2>
            <form onSubmit={handleSubmit(handleAddMechanic)}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Name</label>
                <input {...register("name", { required: true })} type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter mechanic name" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Email</label>
                <input {...register("email", { required: true })} type="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter mechanic email" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Title</label>
                <input {...register("title")} type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter mechanic title" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Speciality</label>
                <input {...register("speciality")} type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter mechanic speciality" />
              </div>
              <div className="flex justify-end">
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
