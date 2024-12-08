import  { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import { PulseLoader } from 'react-spinners';
import {  MapPin, Trash2, User, Mail, CreditCard, Phone, Calendar, Clock, CheckCircle2 } from 'lucide-react'
const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

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
   
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
        setBookings(bookings.filter((booking) => booking._id !== bookingId));toast.success("Car Booking Deleted Successfully")
      } catch (error) {
        console.error('Error deleting booking:', error);
        setError('Error deleting booking');toast.error('Car Booking Deleted Failed')
      }
   

  };
  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <PulseLoader color="#F97316" size={15} />
    </div>
  );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
  <div className="container mx-auto px-4 py-8 min-h-screen ">
   
      <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-8">Booking List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 relative overflow-hidden">
              <div className="p-5 space-y-3">
              <div className="text-sm font-semibold text-white bg-green-500 rounded-full w-fit px-3 py-1 mb-2">
                      Paid
                    </div>
                <h2 className="text-lg font-semibold text-orange-600">{booking.car?.carName} - {booking.car?.carModel}({booking.car?.carNumber})</h2>
                <p className="text-gray-700 flex items-center"><User className="w-4 h-4 mr-2 text-orange-500" /><span className="font-semibold">Name:</span> {booking.customer?.fullName || 'Not Found'}</p>
                <p className="text-gray-700 flex items-center"><Mail className="w-4 h-4 mr-2 text-orange-500" /><span className="font-semibold">Email:</span> {booking.customer?.email || 'Not Found'}</p>
                <p className="text-gray-700 flex items-center"><CreditCard className="w-4 h-4 mr-2 text-orange-500" /> <span className="font-semibold">CNIC:</span> {booking.customer?.cnic || 'Not Found'}</p>
                <p className="text-gray-700 flex items-center"><Phone className="w-4 h-4 mr-2 text-orange-500" /> <span className="font-semibold">Phone Number:</span> {booking.customer?.contactNumber || 'Not Found'}</p>
                <p className="text-gray-700 flex items-center"><CreditCard className="w-4 h-4 mr-2 text-orange-500" /><span className="font-semibold">Total Price:</span> Rs {booking.car?.price || 'Not Found'}</p>
                <p className="text-gray-700 flex items-center"><Calendar className="w-4 h-4 mr-2 text-orange-500" /><span className="font-semibold">Pickup Date:</span> {booking.searchData?.pickupDate ? new Date(booking.searchData.pickupDate).toLocaleDateString() : '8/12/24'}</p>
                <p className="text-gray-700 flex items-center"><Calendar className="w-4 h-4 mr-2 text-orange-500" /><span className="font-semibold">Dropoff Date:</span> {booking.searchData?.dropoffDate ? new Date(booking.searchData.dropoffDate).toLocaleDateString() : '10/12/24'}</p>
                {/* <p className="text-gray-700 flex items-center"><Clock className="w-4 h-4 mr-2 text-orange-500" /><span className="font-semibold">Date:</span> {new Date(booking.date).toLocaleDateString()}</p>*/}
                {/* <p className="text-gray-700 flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-orange-500" /><span className="font-semibold">Availability:</span> {booking.car?.available ? 'Available' : 'Not Available'}</p> ? new Date(booking.availabilityEndDate).toLocaleDateString()*/}
                {/* <p className="text-gray-700 flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-orange-500" /><span className="font-semibold">Payment Status:</span> Paid</p> */}

               <p className="text-gray-700 flex items-center"><Calendar className="w-4 h-4 mr-2 text-orange-500" /><span className="font-semibold">availabilityEndDate:</span> {booking.car.availabilityEndDate ? new Date(booking.car.availabilityEndDate).toLocaleDateString() : 'Not Found'}</p>
                <p className="text-gray-700 flex items-center"><Clock className="w-4 h-4 mr-2 text-orange-500" /><span className="font-semibold">Created At:</span> {new Date(booking.date).toLocaleDateString()}</p>
                </div>
              {/* Add a button to track location */}
              <div className="p-5 flex justify-between items-center border-t">  <button
                onClick={() => handleTrackLocation(booking.car._id)}
                className="flex items-center justify-center px-4 py-2 bg-orange-400 hover:bg-orange-600 text-white font-semibold rounded-md transition duration-200 ease-in-out transform hover:scale-105 text-sm"
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
