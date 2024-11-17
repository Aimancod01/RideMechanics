// //CarResults.jsx

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'; import { Link } from 'react-router-dom';import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'; import { useLocation } from 'react-router-dom';
 import { CartContext } from '../components/CartContext';
const CarResults = ({ cars }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const openModal = (car) => {
    setSelectedCar(car);
    setModalIsOpen(true);
  };
  const navigate = useNavigate();
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
  };const handleCustomerForm = () => {if (selectedCar) {
    navigate(`/api/car/${selectedCar._id}`);}
  };
  return (<div className="max-w-7xl mx-auto p-4">
   
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      { cars.map(car => (
        <div key={car._id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={`http://localhost:5000/${car.image}`} alt={car.carName} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-2xl font-bold">{car.carName}</h3>
            <p className="text-gray-600">{car.carModel}</p>
            <div className="flex items-center mt-2">
              <span className="text-blue-500 font-semibold mr-2">
                <i className="fas fa-door-closed"></i> {car.doors}
              </span>
              <span className="text-blue-500 font-semibold mr-2">
                <i className="fas fa-chair"></i> {car.seats}
              </span>
              <span className="text-blue-500 font-semibold mr-2">
                {car.transmission === 'Manual' ? 'Manual' : 'Automatic'}
              </span>
              <span className="text-blue-500 font-semibold">
                {car.ac ? 'AC' : 'Non-AC'}
              </span>
            </div>
            <div className="mt-4">
              <span className="bg-blue-100 text-blue-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{car.category}</span>
              <span className="bg-green-100 text-green-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Theft Protection</span>
              <span className="bg-purple-100 text-purple-500 text-xs font-semibold px-2.5 py-0.5 rounded">Clean Interior/Exterior</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-900 font-bold text-xl">Rs {car.price}/{car.days} day(s)</span>
              <button
                onClick={() => openModal(car)}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
              >
                Book me
              </button>
            </div>
          </div>
        </div>
        )) }
    </div>{selectedCar && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Car Preview"
          className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Car Preview</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="flex">
                <img src={`http://localhost:5000/${selectedCar.image}`} alt={selectedCar.carName} className="w-1/3 h-48 object-cover" />
                <div className="w-2/3 pl-4">
                  <h3 className="text-xl font-bold">{selectedCar.carName}</h3>
                  <p className="text-gray-600">{selectedCar.carModel}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-blue-500 font-semibold mr-2">
                      <i className="fas fa-door-closed"></i> {selectedCar.doors}
                    </span>
                    <span className="text-blue-500 font-semibold mr-2">
                      <i className="fas fa-chair"></i> {selectedCar.seats}
                    </span>
                    <span className="text-blue-500 font-semibold mr-2">
                      {selectedCar.transmission === 'Manual' ? 'Manual' : 'Automatic'}
                    </span>
                    <span className="text-blue-500 font-semibold">
                      {selectedCar.ac ? 'AC' : 'Non-AC'}
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="bg-blue-100 text-blue-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{selectedCar.category}</span>
                    <span className="bg-green-100 text-green-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Theft Protection</span>
                    <span className="bg-purple-100 text-purple-500 text-xs font-semibold px-2.5 py-0.5 rounded">Clean Interior/Exterior</span>
                  </div>
                  <p className="mt-4 text-gray-600">
                    Days: {selectedCar.days} | Pickup Date: 11 Jul, 2024 10:00 pm | Dropoff Date: 12 Jul, 2024 11:00 pm
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-bold">Features</h4>
                <ul className="list-disc pl-5 mt-2">
                  <li>Theft Protection</li>
                  <li>Clean Interior/Exterior</li>
                  <li>Cancellation Policies</li>
                  <li>Terms & Conditions</li>
                </ul>
              </div>
              <div className="flex justify-between items-center mt-6">
                <span className="text-gray-900 font-bold text-xl">Total Rs {selectedCar.price}</span>
                <button onClick={handleCustomerForm} className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600" >
                  continue
                </button>
                <button onClick={() => handleAddToCart(selectedCar)}
                  className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
                >
                  Add to Cart
                </button> </div>
            </div>
          </div>
        </Modal>
      )}<div className="flex justify-center mt-6">
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
    </div>
  );
};

export default CarResults;
