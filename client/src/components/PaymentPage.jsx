// PaymentPage.js
import React,{ useContext} from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLocation, useNavigate } from 'react-router-dom'; import { FormDataContext } from './FormDataContext';
const stripePromise = loadStripe('pk_test_51Oh1XhAQEV6haT2dXzi4DvGFvFIesr2qkUXy0K33uFqEe1mqwiz77oz6exboVbh8SLyXDC27ngzVs6un8EZwIvHJ00vTTS67Da');

const PaymentPage = () => {
  const location = useLocation(); const navigate = useNavigate();
  const { car, formDataCustomer } = location.state || {};
  if (!car || !formDataCustomer) {
    console.error('Car or customer data is missing');
    navigate('/');
    return null; 
  }  
  return (<> <div className=" px-4 py-8 flex items-center justify-center bg-gradient-to-br from-orange-100 to-white  sm:px-6 md:px-8 lg:px-12">
  <div className="w-full max-w-4xl">
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={`http://localhost:5000/${car.image}`} alt={car.carName} className="w-full h-48 object-cover" />
            <div className="px-6 py-4">
              <h2 className="text-2xl font-bold text-orange-600 mb-2">Car Rental</h2>
              <h2 className="text-xl font-semibold mb-2">{car.carName} - {car.carModel}</h2>
              <p className="text-gray-600 mb-4">{car.CarNumber}</p>
              <p className="text-gray-600 mb-4">{car.city}</p>
              <div className="border-t pt-4">
                <h4 className="font-semibold text-lg mb-2">Rental Duration</h4>
                <p className="text-gray-700">Day(s): {car.days}</p>
              </div>
              <div className="border-t mt-4 pt-4">
                <h3 className="font-semibold text-lg mb-2">Total Price</h3>
                <p className="text-3xl font-bold text-orange-600">Rs {car.price}</p>
              </div>
            </div> </div>
          </div> </div>
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-white p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
          <div className="bg-orange-500 py-6 px-8 sm:px-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">Complete Your Booking</h1>
            </div>
            <div className="p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="bg-orange-50 rounded-2xl p-6 mb-8 transition-all duration-300 ease-in-out hover:shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold text-orange-800 mb-4">Booking Summary</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-orange-700">
                {/* <div>
                  <p className="font-medium">Car: {JSON.parse(car ).name}</p>
                  <p>Model: {JSON.parse(car ).model}</p>
                </div>
                <div>
                  <p className="font-medium">Customer: {JSON.parse(formDataCustomer).name}</p>
                  <p>Email: {JSON.parse(formDataCustomer ).email}</p>
                </div> */}
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-200 to-orange-100 rounded-2xl p-6 transition-all duration-300 ease-in-out hover:shadow-lg">
              <CheckoutForm car={car} customer={formDataCustomer} />
              </div>
          </div>
        </div>
      </div>
    </Elements></>
  );
};

export default PaymentPage;
