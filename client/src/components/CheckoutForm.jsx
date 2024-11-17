// CheckoutForm.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios'; import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ car, customer, }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !car || !customer) {
      console.error('Stripe.js has not loaded or car data is missing.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error('Error creating payment method:', error);
        return;
      } const payload = {
        amount: car.price * 100, // Convert to cents
        paymentMethodId: paymentMethod.id,
        car, // Ensure car is included
        customer, // Ensure customer is included
      };


      const response = await axios.post('http://localhost:5000/api/payment', payload);

      if (response.data.success) {
        console.error('Payment ', response.data.message);
//123 
        // Handle successful payment here31.5497 (e.g.,74.3436 re05 / 26 direct to confirmation page)12345  4242 4242 4242 4242
        const bookingPayload = {
          car,
          customer,
          paymentId: response.data.paymentIntent.id, // Ensure this is included in the response
        }; console.log('bookingPayload',bookingPayload);
        await axios.post('http://localhost:5000/api/bookings', bookingPayload);
        console.log('bookingpayload')
        navigate("/confirmation", { state: { car, customer } });
      } else {
        console.error('Payment failed:', response.data.error);
      }
    } catch (err) {
      console.error('Error processing payment:', err);
    }
    //  /  if (bookingResponse.data.success) {
    //  console.log('Booking successful');
    //   navigate("/confirmation", { state: { car, customer } });
    // } else {
    // console.error('Booking failed:', bookingResponse.data.message);
    //  } }catch (err) {
    //    console.error('Payment error', err);
    //  }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 ease-in-out hover:shadow-lg">
        <h3 className="text-lg font-semibold text-orange-800 mb-4">Enter Payment Details</h3>
        <div className="bg-orange-50 rounded-lg p-4 mb-4">
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
            className="w-full" />
          <button type="submit" className='w-full py-2 px-4 rounded-lg text-white bg-orange-600 font-semibold transition-all duration-300 ease-in-out' >
            Pay Rs {car ? car.price : '0'}
          </button> </div> </div>
    </form >
  );
};

export default CheckoutForm;
//: {
        //    // _id: customer._id, // Ensure this is included if you only pass the ID
        //    fullName: customer.fullName, // Include other necessary customer fields if needed
        //    email: customer.email,
        //    cnic: customer.cnic,
        //    contactNumber: customer.contactNumber,
        //    address: customer.address// Add other fields if necessary
        //  },