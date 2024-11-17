import React from 'react';
import { useLocation } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import {  CheckCircle, Car, User, CreditCard, Info, Calendar, MapPin, Mail, Phone,IdCard,CarFront, } from 'lucide-react'

const Confirmation = () => {
  const location = useLocation();
  const { car, customer } = location.state || {};

  if (!car || !customer) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader color="#F97316" size={15} />
      </div>
    );;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-white p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
        <div className="bg-orange-500 py-6 px-8 sm:px-12 flex items-center justify-center">
          <CheckCircle size={36} className="text-white mr-2" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">Booking Confirmation</h1>

        </div>
        <div className="p-6 sm:p-8 md:p-10 lg:p-12 space-y-8"
        > <div className="bg-orange-50 rounded-2xl p-6 transition-all duration-300 ease-in-out hover:shadow-lg">
            <div className="flex items-center mb-4">
              <Car size={24} className="text-orange-800 mr-2" />
              <h2 className="text-xl sm:text-2xl font-semibold text-orange-800 ">Car Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-orange-700">
              <p><Car size={18} className="inline text-orange-700 mr-2" /><span className="font-medium"> </span>{car.carName}</p>
              <p><CarFront  size={18} className="inline text-orange-700 mr-2"/> <span className="font-medium"></span> {car.carModel}</p>
              <p> <CreditCard size={18} className="inline text-orange-700 mr-2"/><span className="font-medium"></span> {car.paymentStatus}</p>
              {/* //<p><MapPin size={18} className="inline text-orange-700 mr-2" /><span className="font-medium">Car Model:</span> {car.category}</p> */}


              {/* // <p><span className="font-medium">Pickup Date:</span> {car.pickupDate}</p>
              <p><span className="font-medium">Drop-off Date:</span> {car.dropoffDate}</p> */}
            </div>
          </div>
          <div className="bg-orange-50 rounded-2xl p-6 transition-all duration-300 ease-in-out hover:shadow-lg">
            <div className="flex items-center mb-4">
              <User size={24} className="text-orange-800 mr-2" />
              <h2 className="text-xl sm:text-2xl font-semibold text-orange-800 ">Customer Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-orange-700">
              <p><User size={18} className="inline text-orange-700 mr-2" /> <span className="font-medium"></span> {customer.fullName}</p>
              <p> <IdCard  size={22} className="inline text-orange-700 mr-2" /><span className="font-medium"></span> {customer.cnic}</p>
              <p><Mail size={18} className="inline text-orange-700 mr-2" /><span className="font-medium"></span> {customer.email}</p>
              <p><Phone size={18} className="inline text-orange-700 mr-2" /><span className="font-medium"></span> {customer.contactNumber}</p>
              <p className='sm:col-span-2'><MapPin size={18} className="inline text-orange-700 mr-2" /> <span className="font-medium"></span>{customer.address}</p>
            </div>
          </div>
          <div className="bg-orange-50 rounded-2xl p-6 transition-all duration-300 ease-in-out hover:shadow-lg">
            <div className="flex items-center mb-4">
              <CreditCard size={24} className="text-orange-800 mr-2" />
              <h2 className="text-xl sm:text-2xl font-semibold text-orange-800 ">Payment Details</h2>
            </div>
            <p className="text-orange-700"><span className="font-medium">Total Amount:</span> Rs {car.price.toLocaleString()}</p>
          </div>
        </div>

      </div> </div>
  );
};

export default Confirmation;
