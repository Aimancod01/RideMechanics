import React, { useState, useEffect } from 'react';

import axios from 'axios'; import { FaTrashAlt } from 'react-icons/fa'; // Import delete icon from react-icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { PulseLoader } from 'react-spinners';
import { Loader2, MapPin, Trash2 } from 'lucide-react'
const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
        setError('Error fetching bookings');
      }
    }


    fetchBookings();
  }, []);
  const handleTrackLocation = (carId) => {
    // Redirect to the tracking page with carId
    navigate(`/track-location/${carId}`);
  }; const handleDeleteBooking = async (bookingId) => {
    // Ask for confirmation before deleting
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      } catch (error) {
        console.error('Error deleting booking:', error);
        setError('Error deleting booking');
      }
    }

  };
  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <PulseLoader color="#F97316" size={15} />
    </div>
  );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
  <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-orange-100 to-white ">
   
      <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-8">Booking List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300  transform hover:scale-105 relative">
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold text-orange-600 mb-2">{booking.car?.carName} - {booking.car?.carModel}</h2>
                <p className="text-gray-700"><span className="font-semibold">Customer:</span> {booking.customer?.fullName || 'N/A'}</p>
                <p className="text-gray-700"><span className="font-semibold">Contact Number:</span> {booking.customer?.contactNumber || 'N/A'}</p>
                <p className="text-gray-700"><span className="font-semibold">Total Price:</span> Rs {booking.car?.price || 'N/A'}</p>
                <p className="text-gray-700"><span className="font-semibold">Pickup Date:</span> {booking.searchData?.pickupDate ? new Date(booking.searchData.pickupDate).toLocaleDateString() : 'N/A'}</p>
                <p className="text-gray-700"><span className="font-semibold">Dropoff Date:</span> {booking.searchData?.dropoffDate ? new Date(booking.searchData.dropoffDate).toLocaleDateString() : 'N/A'}</p>
                <p className="text-gray-700"><span className="font-semibold">Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
                <p className="text-gray-700"><span className="font-semibold">Availability:</span> {booking.car?.available ? 'Available' : 'Not Available'}</p>
                <p className="text-gray-700"><span className="font-semibold">Payment Status:</span> {booking.car?.paymentStatus || 'Pending'}</p>

                <p className="text-gray-700">availabilityEndDate {booking.availabilityEndDate ? new Date(booking.availabilityEndDate).toLocaleDateString() : 'N/A'}</p>
                </div>
              {/* Add a button to track location */}
              <div className="p-5 flex justify-between items-center border-t">  <button
                onClick={() => handleTrackLocation(booking.car._id)}
                className="flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition duration-200 ease-in-out transform hover:scale-105 text-sm"
              > <MapPin className="mr-2 h-4 w-4" /> 
                Track
              </button> <button
                onClick={() => handleDeleteBooking(booking._id)}
                className="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition duration-200 ease-in-out transform hover:scale-105 text-sm"
              >  <Trash2 className="mr-2 h-4 w-4" /> Delete</button></div></div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">No bookings found.</p>
        )}
      </div>
    </div> 
    // </div>
  );
};

export default BookingList;
