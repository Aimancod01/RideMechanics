import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import {toast}  from 'react-toastify'
const BookingTourPackages = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all payments when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/tour-payments')
      .then((response) => {
        setPayments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the payments!", error);
        setLoading(false);
      });
  }, []);

  // Delete a payment by ID
  const handleDelete = (id) => {
  
      axios.delete(`http://localhost:5000/api/tour-payments/${id}`)
        .then(() => {
          setPayments(payments.filter(payment => payment._id !== id));
          toast.success('Payment deleted successfully');
        })
        .catch((error) => {
          console.error("There was an error deleting the payment!", error);
          toast.error('Failed to delete payment');
        });
   
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="p-6 sm:p-8 lg:p-10">
        <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">Tour Payments</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <PulseLoader color="#FF5733" size={15} speedMultiplier={1.2} />
          </div>
        ) : (
          <div>
            {payments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {payments.map(payment => (
                  <div key={payment._id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                    
                    {/* Paid Status */}
                    <div className="text-sm font-semibold text-white bg-green-500 rounded-full w-fit px-3 py-1 mb-2">
                      Paid
                    </div>

                    {/* Payment Details */}
                    <h3 className="text-xl font-semibold text-orange-500 mb-2"></h3>

                    <div className="mb-2">
                      <h4 className="font-semibold">Customer Info:</h4>
                      <p>Name: {payment.customerId ? `${payment.customerId.firstName} ${payment.customerId.lastName}` : 'N/A'}</p>
                      <p>Email: {payment.customerId ? payment.customerId.email : 'N/A'}</p>
                      <p>Address: {payment.customerId ? payment.customerId.address : 'N/A'}</p>
                    </div>

                    <div className="mb-2">
                      <h4 className="font-semibold">Package Info:</h4>
                      <p>Package: {payment.packageId ? payment.packageId.packageName : 'N/A'}</p>
                      <p>Departure: {payment.packageId ? `${new Date(payment.packageId.departureDate).toLocaleDateString()} ${payment.packageId.departureTime}` : 'N/A'}</p>
                      <p>Arrival: {payment.packageId ? `${new Date(payment.packageId.arrivalDate).toLocaleDateString()} ${payment.packageId.arrivalTime}` : 'N/A'}</p>
                      <p>Price: Rs{payment.packageId ? payment.packageId.price : 'N/A'}</p>
                    </div>

                    <p className="font-semibold text-gray-700">Quantity: {payment.quantity}</p>
                    <p className="text-lg font-bold text-orange-600">Total Price: {payment.totalPrice}</p>
                    <p className="text-sm text-gray-500 mt-2">Created At: {new Date(payment.createdAt).toLocaleDateString()}</p>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(payment._id)}
                      className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No payments found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingTourPackages;
