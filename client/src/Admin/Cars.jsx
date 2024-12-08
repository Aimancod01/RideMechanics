// src/components/CarList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios'; import { toast } from "react-toastify";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { FaDoorOpen, FaCouch, FaBolt, FaCar, FaSnowflake, FaPlus } from 'react-icons/fa';
const CarListDashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch the list of cars from the backend
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Failed to fetch cars:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false); // Hide loader after data is fetched
      }
    };

    fetchCars();
  }, [location.pathname]);// Refetch data when URL path changes
  const handleEdit = async (carId) => {
    const response = await axios.get('http://localhost:5000/api/cars');
    setCars(response.data);
    // Handle edit functionalitycreate complete edit delete functionality in frontend backend
    navigate(`/edit-car/${carId}`); console.log('Edit car:', carId);
  };

  const handleDelete = async (carId) => {

    try {
      await axios.delete(`http://localhost:5000/api/cars/${carId}`);
      setCars(cars.filter(car => car._id !== carId));// Remove the car from the state or refetch the car list after deletion
      setNotification({ type: 'success', message: 'Car deleted successfully!' });
      toast.success('Car Deleted Successfully')
    } catch (error) {
      console.error('Failed to delete car:', error.response ? error.response.data : error.message); setNotification({ type: 'error', message: 'Failed to delete car!' });
      toast.error('Car Deleted Failed')

    };
  }; useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleViewBookings = () => {

    navigate('/addCar');
  };
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-500 mb-6">Car List</h2>
        <button
          onClick={handleViewBookings}
          className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Car
        </button> </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <PulseLoader color="#F97316" size={15} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <div
              key={car._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden relative group transition transform hover:scale-105 hover:shadow-2xl"
            ><div className="flex justify-between p-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white">
                <button
                  className="bg-transparent border-2 border-white rounded-full p-2 hover:bg-orange-700"
                  onClick={() => handleEdit(car._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-transparent border-2 border-white text-white py-1 px-3 rounded-lg hover:bg-red-600"
                  onClick={() => handleDelete(car._id)}
                >
                  Delete
                </button>
              </div>
              <img src={`http://localhost:5000/${car.image}`} alt={car.carName} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-orange-600">{car.carName}</h3>
                <p className="text-gray-600">{car.carModel}</p>
                <p className="text-gray-600">{car.carNumber}</p>
                <div className="flex flex-wrap items-center mt-2 gap-3">
                  <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                    <FaDoorOpen className="mr-1" /> {car.doors} Doors
                  </span>
                  <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                    <FaCouch className="mr-1" /> {car.seats} Seats
                  </span>
                  <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                    {car.transmission === 'Manual' ? <FaCar /> : <FaBolt />} {car.transmission}
                  </span>
                  <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                    <FaSnowflake className="mr-1" /> {car.ac ? 'AC' : 'Non-AC'}
                  </span>
                </div>

                <div className="mt-4 space-x-2">
                  <span className="bg-purple-100 text-purple-500 text-xs font-semibold px-2 py-1 rounded-lg">{car.category}</span>

                  <span className="bg-green-100 text-green-500 text-xs font-semibold px-2 py-1 rounded-lg ml-2">Clean Interior/Exterior</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-900 font-bold text-xl"> <span className="text-orange-600">Rs {car.price}</span> / {car.days} day(s) </span>

                </div>
              </div>

            </div>
          ))}
        </div>)}
    </div>
  );
};

export default CarListDashboard;
