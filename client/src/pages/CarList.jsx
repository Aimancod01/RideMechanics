import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import SearchForm from "../components/Search";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import "flowbite";

import { Users, Car, Gauge } from "lucide-react";
import { Sparkles, FileText, AlertTriangle } from "lucide-react";
import { FaDoorOpen, FaCouch, FaBolt, FaCar, FaSnowflake } from "react-icons/fa";
const CarList = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);
  const navigate = useNavigate();

  const handleCustomerForm = () => {
    if (selectedCar) {
      navigate(`/api/car/${selectedCar._id}`, { state: { car: selectedCar } });
    }
  };
  const openModal = (car) => {
    setSelectedCar(car);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setModalIsOpen(false);
  };
  const handleAddToCart = (car) => {
    addToCart(car);
    closeModal();
    navigate("/carCart");
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleViewBookings = () => {
    navigate("/getBookingByEmail");
  };
  return (
    <div className="max-w-7xl mx-auto p-4">
      <SearchForm />
      <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {" "}
          <button
            onClick={handleViewBookings}
            className=" bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 rounded-lg text-xs sm:text-sm md:text-base transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center"
          >
            View Bookings
          </button>
          <h2 className="text-3xl font-bold text-orange-600 mb-8 mt-4">Car Rentals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div key={car._id} className="bg-white shadow-lg rounded-lg overflow-hidden relative group transition transform hover:scale-105 hover:shadow-2xl">
                <img src={`http://localhost:5000/${car.image}`} alt={car.carName} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-orange-600">{car.carName}</h3>
                  <p className="text-gray-600 ">{car.carModel}</p>
                  <p className="text-gray-600">{car.carNumber}</p>
                  <div className="flex flex-wrap items-center mt-2 gap-3">
                    <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                      <FaDoorOpen className="mr-1" />
                      {car.doors} doors
                    </span>

                    <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                      {" "}
                      <FaCouch className="mr-1" /> {car.seats} seats
                    </span>
                    <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                      {car.transmission === "Manual" ? <FaCar /> : <FaBolt />} {car.transmission}
                    </span>
                    <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                      <FaSnowflake className="mr-1" /> {car.ac ? "AC" : "Non-AC"}
                    </span>
                  </div>
                  {/* <div className="flex justify-between items-center mb-4"> <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Gauge className="w-4 h-4" />
                    {car.transmission === 'Manual' ? 'Manual' : 'Automatic'}
                  </div> <div className="flex items-center space-x-2 text-sm text-gray-500">  
                      <span >
                        {car.ac ? 'AC' : 'Non-AC'}
                      </span>
                    </div> </div> */}
                  <div className="mt-4 space-x-2">
                    <span className="bg-purple-100 text-purple-500 text-xs font-semibold px-2 py-1 rounded-lg">{car.category}</span>

                    <span className="bg-green-100 text-green-500 text-xs font-semibold px-2 py-1 rounded-lg ml-2">Clean Interior/Exterior</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className=" font-bold text-xl">
                      Rs {car.price}/{car.days} day(s)
                    </span>
                    <button onClick={() => openModal(car)} className="bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600">
                      Book me
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {selectedCar && (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Car Preview" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" overlayClassName="bg-gray-800 bg-opacity-75">
              <div className="sm:max-w-[700px] bg-white">
                <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-orange-600">Car Preview</h2>
                      <p>Review the details of your selected car</p>

                      <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="flex">
                      <div className="grid gap-6 py-4">
                        {" "}
                        <div className="flex flex-col md:flex-row gap-6">
                          <img src={`http://localhost:5000/${selectedCar.image}`} alt={selectedCar.carName} className="w-full md:w-1/3 h-48 object-cover rounded-lg" />
                          <div className="w-2/3 pl-4">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedCar.carName}</h3>
                            <p className="text-gray-600">{selectedCar.carModel}</p>
                            <p className="text-gray-600">{selectedCar.carNumber}</p>
                            <p className="text-gray-600">{selectedCar.city}</p>
                            <div className="grid grid-cols-2 gap-4 my-4">
                              <div className="flex items-center gap-2 text-gray-600">
                                <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                                  <FaDoorOpen className="w-4 h-4 " />
                                  {selectedCar.doors}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                                  {" "}
                                  <Users className=" " />
                                  {selectedCar.seats}
                                </span>{" "}
                              </div>{" "}
                              <div className="flex items-center space-x-2 text-gray-600">
                                <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                                  {selectedCar.transmission === "Manual" ? <FaCar /> : <FaBolt />}
                                  {selectedCar.transmission}
                                </span>
                              </div>{" "}
                              <div className="flex items-center space-x-2 text-gray-600">
                                <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                                  <FaSnowflake className="mr-1" /> {selectedCar.ac ? "AC" : "Non-AC"}
                                </span>
                              </div>{" "}
                            </div>
                            <div className="mt-4 space-x-2">
                              <span className="bg-blue-100 text-blue-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{selectedCar.category}</span>

                              <span className="bg-purple-100 text-purple-500 text-xs font-semibold px-2.5 py-0.5 rounded">Clean Interior/Exterior</span>
                            </div>
                            {/* <p className="mt-4 text-gray-600">
                        Days: {selectedCar.days} 
                      </p> */}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                          <span className="text-2xl font-bold text-orange-600">Total Rs {selectedCar.price}</span>{" "}
                          <div className="flex gap-4">
                            <button onClick={handleCustomerForm} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
                              continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarList;
