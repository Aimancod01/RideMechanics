import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal'; import SearchForm from '../components/Search';
import { useNavigate } from 'react-router-dom'; import { CartContext } from '../components/CartContext';
import { ChevronLeft, ChevronRight, Users, Car, Gauge, Wind } from 'lucide-react'
import { X, DoorClosed, Shield, Sparkles, FileText, AlertTriangle } from 'lucide-react'

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
        const response = await axios.get('http://localhost:5000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
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
    closeModal(); navigate('/carCart');
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleViewBookings = () => {
   
    navigate('/getBookingByEmail');
  };
  return (
    <div className="max-w-7xl mx-auto p-4"><SearchForm />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">  <button
              onClick={handleViewBookings}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 rounded-lg text-xs sm:text-sm md:text-base transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              View Bookings
            </button>
          <h2 className="text-4xl font-extrabold text-orange-600 mb-8 text-center">Car Rentals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
            {cars.map(car => (
              <div key={car._id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <img src={`http://localhost:5000/${car.image}`} alt={car.carName} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-orange-600 mb-2">{car.carName}</h3>
                  <p className="text-gray-600 mb-4">{car.carModel}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Car className="w-4 h-4" />  <span >
                        {car.doors} doors
                      </span>
                    </div> <div className="flex items-center space-x-2 text-sm text-gray-500">

                      <Users className="w-4 h-4" />
                      <span>{car.seats} seats</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4"> <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Gauge className="w-4 h-4" />
                    {car.transmission === 'Manual' ? 'Manual' : 'Automatic'}
                  </div> <div className="flex items-center space-x-2 text-sm text-gray-500">   <Wind className="w-4 h-4" />
                      <span >
                        {car.ac ? 'AC' : 'Non-AC'}
                      </span>
                    </div> </div>
                  <div className="mt-4">
                    <span className="bg-blue-100 text-blue-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{car.category}</span>
                    <span className="bg-green-100 text-green-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Terms & Condition</span>
                    <span className="bg-purple-100 text-purple-500 text-xs font-semibold px-2.5 py-0.5 rounded">Clean Interior/Exterior</span>

                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className=" font-bold text-xl">Rs {car.price}/{car.days} day(s)</span>
                    <button
                      onClick={() => openModal(car)}
                      className="bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600"
                    >
                      Book me
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedCar && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Car Preview"
              className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
            ><div className="sm:max-w-[700px] bg-white">
                <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-3xl font-bold text-orange-600">Car Preview</h2>
                      <p>Review the details of your selected car</p>

                      <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="flex"><div className="grid gap-6 py-4"> <div className="flex flex-col md:flex-row gap-6">
                      <img src={`http://localhost:5000/${selectedCar.image}`} alt={selectedCar.carName} className="w-full md:w-1/3 h-48 object-cover rounded-lg" />
                      <div className="w-2/3 pl-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedCar.carName}</h3>
                        <p className="text-gray-600 mb-4">{selectedCar.carModel}</p>
                        <div className="grid grid-cols-2 gap-4"><div className="flex items-center space-x-2 text-gray-600">

                          <DoorClosed className="w-5 h-5 text-orange-500" /><span> {selectedCar.doors}
                          </span> </div> <div className="flex items-center space-x-2 text-gray-600">
                            <Users className="w-5 h-5 text-orange-500" />
                            <span >  {selectedCar.seats}
                            </span> </div> <div className="flex items-center space-x-2 text-gray-600"> <Gauge className="w-5 h-5 text-orange-500" />
                            <span >
                              {selectedCar.transmission === 'Manual' ? 'Manual' : 'Automatic'}
                            </span></div> <div className="flex items-center space-x-2 text-gray-600">  <Wind className="w-5 h-5 text-orange-500" />
                            <span >
                              {selectedCar.ac ? 'AC' : 'Non-AC'}
                            </span>
                          </div> </div>
                        <div className="mt-4 space-x-2">
                          <span className="bg-blue-100 text-blue-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{selectedCar.category}</span>
                          <span className="bg-green-100 text-green-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Theft Protection</span>
                          <span className="bg-purple-100 text-purple-500 text-xs font-semibold px-2.5 py-0.5 rounded">Clean Interior/Exterior</span>
                        </div>
                        {/* <p className="mt-4 text-gray-600">
                        Days: {selectedCar.days} 
                      </p> */}
                      </div>
                    </div>
                      <div className="mt-4">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Features</h4>
                        <ul className="grid grid-cols-2 gap-2">

                          <li className="flex items-center space-x-2 text-gray-600">  <Sparkles className="w-5 h-5 text-purple-500" />Clean Interior/Exterior</li>
                          <li className="flex items-center space-x-2 text-gray-600">  <FileText className="w-5 h-5 text-blue-500" />Cancellation Policies</li>
                          <li className="flex items-center space-x-2 text-gray-600"> <AlertTriangle className="w-5 h-5 text-yellow-500" />Terms & Conditions</li>
                        </ul>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <span className="text-2xl font-bold text-orange-600">Total Rs {selectedCar.price}</span> <div className="flex gap-4">
                          <button onClick={handleCustomerForm} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded" >
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
          )} <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-1 border ${currentPage === 1 ? 'border-gray-300 text-gray-400' : 'border-blue-500 text-blue-500'} rounded`}
            >
              Previous
            </button>
            <span className="px-4 py-2 mx-1 border border-gray-300 rounded">{currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 mx-1 border ${currentPage === totalPages ? 'border-gray-300 text-gray-400' : 'border-blue-500 text-blue-500'} rounded`}
            >
              Next
            </button>
          </div>
        </div >
      </div >
    </div >
  );
};

export default CarList;
