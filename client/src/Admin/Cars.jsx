// src/components/CarList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import {  FaEllipsisH, FaDoorOpen, FaCouch, FaBolt, FaCar, FaSnowflake, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
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
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await axios.delete(`http://localhost:5000/api/cars/${carId}`);
        setCars(cars.filter(car => car._id !== carId));// Remove the car from the state or refetch the car list after deletion
        setNotification({ type: 'success', message: 'Car deleted successfully!' });

      } catch (error) {
        console.error('Failed to delete car:', error.response ? error.response.data : error.message); setNotification({ type: 'error', message: 'Failed to delete car!' });
      }

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
    <div className="max-w-7xl mx-auto p-4">  <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">Car List</h2>
      <button
        onClick={handleViewBookings}
        className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 flex items-center"
      >
        <FaPlus className="mr-2" /> Add Car
      </button> </div>
      {notification && (
        <div
          className={`p-4 mb-4 rounded-md text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {notification.message}
        </div>
      )}
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
            >
              <img src={`http://localhost:5000/${car.image}`} alt={car.carName} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-2xl font-bold text-orange-600">{car.carName}</h3>
                <p className="text-gray-600">{car.carModel}</p>
                <div className="flex items-center mt-2 space-x-3">
                  <span className="text-orange-500 font-semibold flex items-center">
                    <FaDoorOpen className="mr-1" /> {car.doors} Doors
                  </span>
                  <span className="text-orange-500 font-semibold flex items-center">
                    <FaCouch className="mr-1" /> {car.seats} Seats
                  </span>
                  <span className="text-orange-500 font-semibold flex items-center">
                    {car.transmission === 'Manual' ? <FaCar /> : <FaBolt />} {car.transmission}
                  </span>
                  <span className="text-orange-500 font-semibold flex items-center">
                    <FaSnowflake className="mr-1" /> {car.ac ? 'AC' : 'Non-AC'}
                  </span>
                </div>

                <div className="mt-4 space-x-2">
                  <span className="bg-blue-100 text-blue-500 text-xs font-semibold  px-2.5 py-0.5 rounded">{car.category}</span>

                  <span className="bg-purple-100 text-purple-500 text-xs font-semibold px-2.5 py-0.5 rounded">Clean Interior/Exterior</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-900 font-bold text-xl"> <span className="text-orange-600">Rs {car.price}</span> / {car.days} day(s) </span>
                  <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600">
                    Book me
                  </button>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <FaEllipsisH
                  className="h-6 w-6 text-gray-600 cursor-pointer hover:text-orange-500"
                  onClick={() => setSelectedCar(selectedCar === car._id ? null : car._id)}
                />
                {selectedCar === car._id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={() => handleEdit(car._id)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-500 w-full text-left flex items-center"
                      >
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(car._id)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-500 w-full text-left flex items-center"
                      >
                        <FaTrash className="mr-2" />  Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>)}
    </div>
  );
};

export default CarListDashboard;
