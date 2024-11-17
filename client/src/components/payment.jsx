
// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';

// const stripePromise = loadStripe('pk_test_51Oh1XhAQEV6haT2dXzi4DvGFvFIesr2qkUXy0K33uFqEe1mqwiz77oz6exboVbh8SLyXDC27ngzVs6un8EZwIvHJ00vTTS67Da');

// const CheckoutForm = ({ amount, email }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const { data: clientSecret } = await axios.post('http://localhost:5000/api/create-payment-intent', {
//       amount,
//       email,
//     });

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           email,
//         },
//       },
//     });

//     if (result.error) {
//       setError(result.error.message);
//     } else {
//       if (result.paymentIntent.status === 'succeeded') {
//         setSuccess(true);
//         // Optionally, you can redirect to a success page or show a success message
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}className="">
//       <CardElement />
//       <button type="submit" >
//         Pay 
//       </button>
//       {error && <div>{error}</div>}
//       {success && <div>Payment Successful!</div>}
//     </form>
//   );
// };

// const StripePayment = ({ amount, email }) => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm amount={amount} email={email}    />
//     </Elements>
//   );
// };

// //export default StripePayment;


// const  Payment= ({ fullName, email, amount }) => {
  
//   return (
//     <div>
//       <h1>Car Rental Payment</h1>
//       <StripePayment amount={amount} email={email}  fullName={fullName} />
//     </div>
//   );
// };

// export default Payment;
