//import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Oh1XhAQEV6haT2dXzi4DvGFvFIesr2qkUXy0K33uFqEe1mqwiz77oz6exboVbh8SLyXDC27ngzVs6un8EZwIvHJ00vTTS67Da"
);

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract car and customer data from location state
  const { car, formDataCustomer } = location.state || {};

  // Redirect if data is missing
  if (!car || !formDataCustomer) {
    console.error("Car or customer data is missing");
    navigate("/");
    return null;
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-white p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
          {/* Header */}
          <div className="bg-orange-500 py-6 px-8 sm:px-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
              Complete Your Booking
            </h1>
          </div>

          {/* Booking Summary */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="bg-orange-50 rounded-2xl p-6 mb-8 transition-all duration-300 ease-in-out hover:shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold text-orange-800 mb-4">
                Booking Summary
              </h2>

              {/* Cards Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-orange-700">
                {/* Car Data Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="bg-orange-100 py-4 px-6">
                    <h2 className="text-2xl font-semibold text-orange-700">
                      Car Data
                    </h2>
                  </div>
                  <img
                    src={`http://localhost:5000/${car.image}`}
                    alt={car.carName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {car.carName} - {car.carModel}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Car Number: <span className="font-medium">{car.carNumber}</span>
                    </p>
                    <p className="text-gray-600 mb-2">
                      City: <span className="font-medium">{car.city}</span>
                    </p>
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-lg mb-2">Rental Duration</h4>
                      <p className="text-gray-700">Day(s): {car.days}</p>
                    </div>
                    <div className="border-t mt-4 pt-4">
                      <h4 className="font-semibold text-lg mb-2">Total Price</h4>
                      <p className="text-3xl font-bold text-orange-600">
                        Rs {car.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer Data Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="bg-orange-100 py-4 px-6">
                    <h2 className="text-2xl font-semibold text-orange-700">
                      Customer Data
                    </h2>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{formDataCustomer.fullName}</h3>
                    <p className="text-gray-600 mb-2 font-bold">
                      Email: <span className="font-medium">{formDataCustomer.email}</span>
                    </p>
                    <p className="text-gray-600 mb-2 font-bold">
                      Phone: <span className="font-medium">{formDataCustomer.contactNumber}</span>
                    </p>
                    <p className="text-gray-600 mb-2 font-bold">
                      CNIC: <span className="font-medium">{formDataCustomer.cnic}</span>
                    </p>
                    <p className="text-gray-600 mb-2 font-bold">
                      Address: <span className="font-medium">{formDataCustomer.address}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-gradient-to-r from-orange-200 to-orange-100 rounded-2xl p-6 transition-all duration-300 ease-in-out hover:shadow-lg">
              <CheckoutForm car={car} customer={formDataCustomer} />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default PaymentPage;
