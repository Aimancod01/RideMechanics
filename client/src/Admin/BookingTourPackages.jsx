import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (<div className="max-w-7xl mx-auto p-4">
    <div className=" p-6 sm:p-8 lg:p-10">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">Tour Payments</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-pulse">
            <div className="w-24 h-24 bg-orange-400 rounded-full mx-auto"></div>
            <p className="mt-2 text-orange-500">Loading...</p>
          </div>
        </div>
      ) : (
        <div>
          {payments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {payments.map(payment => (
                <div key={payment._id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                  <h3 className="text-xl font-semibold text-orange-500 mb-2">Payment ID: {payment.paymentId}</h3>

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
                    <p>Price: ${payment.packageId ? payment.packageId.price : 'N/A'}</p>
                  </div>

                  <p className="font-semibold text-gray-700">Quantity: {payment.quantity}</p>
                  <p className="text-lg font-bold text-orange-600">Total Price: {payment.totalPrice}</p>
                  <p className="text-sm text-gray-500 mt-2">Created At: {new Date(payment.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No payments found</p>
          )}
        </div>
      )}
    </div></div>
  );
};

export default BookingTourPackages;
