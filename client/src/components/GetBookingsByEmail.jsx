import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PulseLoader } from 'react-spinners';
const GetBookingsByEmail = () => {
  const [customerEmail, setCustomerEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // Simulate a page load delay
    const timer = setTimeout(() => setIsPageLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const fetchCustomerBookings = async () => {
    if (!customerEmail || !/\S+@\S+\.\S+/.test(customerEmail)) {
      toast.error('Please enter a valid customer email.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/bookings/customer/${customerEmail}`
      );
      setBookings(response.data);
      setModalIsOpen(true);
      toast.success('Bookings retrieved successfully!');
    } catch (error) {
      toast.error('No bookings found for this customer.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setBookings([]);
  };

  if (isPageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
      <PulseLoader color="#F97316" size={15} />
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {/* Toast Container */}
      {/* <ToastContainer /> */}

      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-orange-500">
            Customer Booking Finder
          </h1>
          <p className="text-gray-500">
            Enter the customer email to retrieve their booking details.
          </p>
        </div>

        {/* Input and Button */}
        <div className="mt-6 flex flex-col items-center space-y-4">
          <input
            type="email"
            placeholder="Enter customer email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={fetchCustomerBookings}
            disabled={isLoading}
            className={`w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg transition-all ${
              isLoading
                ? 'cursor-not-allowed opacity-70'
                : 'hover:bg-orange-600 hover:scale-105'
            } flex items-center justify-center`}
          >
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              'View Bookings'
            )}
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Customer Bookings"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        overlayClassName="fixed inset-0"
      >
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-700">
            Bookings for {customerEmail}
          </h2>
          <div className="max-h-96 overflow-y-auto space-y-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="p-4 bg-gray-50 border rounded-lg shadow-sm space-y-2"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    Customer: {booking.customer.fullName}
                  </h3>
                  <p className="text-gray-600">
                    <strong>CNIC:</strong> {booking.customer.cnic}
                  </p>
                  <p className="text-gray-600">
                    <strong>Email:</strong> {booking.customer.email}
                  </p>
                  <p className="text-gray-600">
                    <strong>Contact:</strong> {booking.customer.contactNumber}
                  </p>
                  {booking.car ? (
                    <>
                      <p className="text-gray-600">
                        <strong>Car:</strong> {booking.car.carName} -{' '}
                        {booking.car.carModel}
                      </p>
                      <p className="text-gray-600">
                        <strong>Total Price:</strong> Rs {booking.car.price}
                      </p>
                    </>
                  ) : (
                    <p className="text-red-500">
                      <strong>Car details not available</strong>
                    </p>
                  )}
                  <p className="text-gray-600">
                    <strong>Date:</strong>{' '}
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No bookings found for this customer.</p>
            )}
          </div>
          <button
            onClick={closeModal}
            className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default GetBookingsByEmail;
