import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCar } from './CarsContext';
import { useLocation } from 'react-router-dom';
import { FormDataContext } from './FormDataContext';
import { User, CreditCard, Mail, Phone, Home, MapPin, Calendar, Clock } from 'lucide-react';

const Booking = () => {

  const { formData } = useContext(FormDataContext);
  const [displayData, setDisplayData] = useState({});
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setDisplayData(JSON.parse(savedData));
    } else {
      setDisplayData(formData);
    }
  }, [formData]);

  const location = useLocation();
  const { formDataCustomer } = location.state || {};

  const navigate = useNavigate();

  const { selectedCar } = useCar();

  if (!selectedCar) {
    return <div>No car selected</div>;
  }
  const handleCompleteBooking = () => {
    if (selectedCar && formDataCustomer) {
      navigate(
        '/payment',
        {
          state: { car: selectedCar, formDataCustomer },
        });
    } else {
      console.error('Car or customer data is missing');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <h3 className="text-xl font-semibold text-orange-600 mb-2">Search Details</h3>
              <h2 className="text-gray-800 text-2xl font-bold mb-2 flex items-center">
                <MapPin className="h-6 w-6 text-orange-500 mr-2" />
                {displayData.city}</h2>
              <div className="space-y-1">
                <p className="  flex items-cente">
                <Calendar className="h-5 w-5 text-orange-500 mr-2" />
                  Pickup: {displayData.pickupDate} at   <Clock className="h-5 w-5 text-orange-500 mx-2" />{displayData.pickupTime}</p>
                <p className="  flex items-cente">  
                <Calendar className="h-5 w-5 text-orange-500 mr-2" />
                  Drop-off: {displayData.dropoffDate} at    <Clock className="h-5 w-5 text-orange-500 mx-2" />{displayData.dropoffTime}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold text-orange-600 mb-4">Customer Details</h2>
              <div className="space-y-2">
                {formDataCustomer ? (
                  <>
                    <h2 className="text-lg font-medium flex items-center">
                    <User className="h-5 w-5 text-orange-500 mr-2" />
                      {formDataCustomer.fullName}</h2>
                   
                    <p className="text-gray-600 flex items-center"><CreditCard className="h-5 w-5 text-orange-500 mr-2" />
                      CNIC: {formDataCustomer.cnic}</p>
                    <p className="text-gray-600 flex items-center"> <Mail className="h-5 w-5 text-orange-500 mr-2" /> Email: {formDataCustomer.email}</p>
                    <p className="text-gray-600 flex items-center"> <Phone className="h-5 w-5 text-orange-500 mr-2" />Contact Number: {formDataCustomer.contactNumber}</p>
                    <p className="text-gray-600 flex items-center"><Home className="h-5 w-5 text-orange-500 mr-2" />Address: {formDataCustomer.address}</p>
                  </>
                ) : (<div className="bg-white shadow-lg rounded-lg p-6">
                  <p className="text-gray-500">No customer data available.</p>  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">


          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={`http://localhost:5000/${selectedCar.image}`} alt={selectedCar.carName} className="w-full h-48 object-cover" />
            <div className="px-6 py-4">
              <h2 className="text-2xl font-bold text-orange-600 mb-2">Car Rental</h2>
              <h2 className="text-xl font-semibold mb-2">{selectedCar.carName} - {selectedCar.carModel}</h2>
              <p className="text-gray-600 mb-4">{selectedCar.city}</p>
              <div className="border-t pt-4">
                <h4 className="font-semibold text-lg mb-2">Rental Duration</h4>
                <p className="text-gray-700">Day(s): {selectedCar.days}</p>
              </div>
              <div className="border-t mt-4 pt-4">
                <h3 className="font-semibold text-lg mb-2">Total Price</h3>
                <p className="text-3xl font-bold text-orange-600">Rs {selectedCar.price}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">  <button
            onClick={handleCompleteBooking}
            className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Complete Booking
          </button>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Booking;
