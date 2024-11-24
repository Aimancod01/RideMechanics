import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function TourPackagePayment() {
    const { state } = useLocation();
    const customer = state?.customer;
    const selectedPackage = state?.package;
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(selectedPackage?.price || 0);

    const stripe = useStripe();
    const elements = useElements();

    const handleQuantityChange = (e) => {
        const qty = parseInt(e.target.value, 10) || 1;
        setQuantity(qty);
        setTotalPrice(qty * selectedPackage.price);
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            alert("Stripe is not loaded yet!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/tour-package-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: totalPrice * 100,
                }),
            });

            const { clientSecret } = await response.json();

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: `${customer.firstName} ${customer.lastName}`,
                        email: customer.email,
                    },
                },
            });

            if (error) {
                console.error("Payment failed:", error.message);
                alert("Payment failed. Please try again.");
            } else if (paymentIntent.status === "succeeded") {
                alert("Payment successful!");
                console.log("Payment successful:", paymentIntent);
            }
        } catch (error) {
            console.error("Error during payment:", error);
            alert("An error occurred during payment. Please try again.");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-orange-600 text-center">Payment Page</h2>
            {selectedPackage && (
                <div className="mb-6">
                    <h3 className="text-lg font-bold">Package Details:</h3>
                    <p><strong>Package Name:</strong> {selectedPackage.packageName}</p>
                    <p><strong>Price:</strong> ${selectedPackage.price}</p>
                </div>
            )}
            {customer && (
                <div className="mb-6">
                    <h3 className="text-lg font-bold">Customer Details:</h3>
                    <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>CNIC:</strong> {customer.cnic}</p>
                </div>
            )}
            <form onSubmit={handlePayment}>
                <div className="mb-4">
                    <label className="block text-sm font-bold">Quantity</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <p className="text-lg font-bold">Total Price: ${totalPrice}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold">Card Details</label>
                    <CardElement className="p-2 border rounded" />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    disabled={!stripe}
                >
                    Pay ${totalPrice}
                </button>
            </form>
        </div>
    );
}

export default TourPackagePayment;
