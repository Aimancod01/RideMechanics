import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import BookingImage from '../assets/images/ezgif-6-739ce7a672.jpg'; // Adjust path as needed
const GetBookingsByEmail = () => {
  const [customerEmail, setCustomerEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fetchCustomerBookings = async () => {
    if (!customerEmail || !/\S+@\S+\.\S+/.test(customerEmail)) {
      setErrorMessage('Please enter a customer email');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get(`http://localhost:5000/api/bookings/customer/${customerEmail}`);
      setBookings(response.data);
      setErrorMessage('');
      setModalIsOpen(true);
      console.log('response',response.data)
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setErrorMessage('No bookings found for this customer.');
    }finally {
        setIsLoading(false);
      }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setBookings([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center space-y-4 mb-8">
            <h2 className="text-4xl font-extrabold text-orange-600">Find Customer Bookings</h2>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
              <input
                type="email"
                placeholder="Enter customer email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="border border-orange-500 rounded-lg px-4 py-2 w-full sm:w-auto"
              />
              <button
                onClick={fetchCustomerBookings} disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 rounded-lg text-xs sm:text-sm md:text-base transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center"
              >
                {isLoading ? 'Loading...' : 'View Bookings'}
              </button>
            </div> {/* dd image below the input and button */}
            <img
              src={BookingImage} // Replace this with your image URL
              alt="Customer Bookings Illustration"
              className="mt-6 rounded-lg shadow-md"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          {/* Modal for Customer Bookings */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Customer Bookings"
            className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
              <h2 className="text-2xl font-bold text-orange-600 mb-4">Bookings for {customerEmail}</h2>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="border p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold">Customer: {booking.customer.fullName}</h3>
                    <p><strong>CNIC:</strong> {booking.customer.cnic}</p>
                    <p><strong>Email:</strong> {booking.customer.email}</p>
                    <p><strong>Contact:</strong> {booking.customer.contactNumber}</p>
                    {booking.car ? (
                      <>
                        <p><strong>Car:</strong> {booking.car.carName} - {booking.car.carModel}</p>
                        <p><strong>Total Price:</strong> Rs {booking.car.price}</p>
                      </>
                    ) : (
                      <p className="text-red-500"><strong>Car details not available</strong></p>
                    )}
                    <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No bookings found for this customer.</p>
              )}
              <button
                onClick={closeModal}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 rounded-lg text-xs sm:text-sm md:text-base transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center"
              >
                Close
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default GetBookingsByEmail;