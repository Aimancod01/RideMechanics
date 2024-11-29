import React, { useState,useEffect } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TourPackagePayment({ packageId, customerId }) {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const packageResponse = await fetch(`http://localhost:5000/api/packages/${packageId}`);
                const packageData = await packageResponse.json();
                setSelectedPackage(packageData);
                setTotalPrice(packageData.price);

                // Fetch customer data
                const customerResponse = await fetch(`http://localhost:5000/api/tourCustomer/${customerId}`);
                const customerData = await customerResponse.json();
                setCustomer(customerData);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load data. Please try again.");
            }
        }; fetchData();
    }, [packageId, customerId])

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
        console.log('ont', customer.firstName)

        try {
            const response = await fetch("http://localhost:5000/api/tour-package-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: totalPrice * 100, customerName: `${customer.firstName} ${customer.lastName}`,
                    customerEmail: customer.email,
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
                toast.error("Payment failed. Please try again.");
            } else if (paymentIntent.status === "succeeded") {
                toast.success("Payment successful!");
                console.log("Payment successful:", paymentIntent);

                // Save payment ID to the database
                await fetch("http://localhost:5000/api/save-payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        customerId: customer._id,
                        paymentId: paymentIntent.id,
                        packageId: selectedPackage._id,
                        quantity,
                        totalPrice,
                    }),
                });
            }
        } catch (error) {
            console.error("Error during payment:", error);
            toast.error("An error occurred during payment. Please try again.");
        }
    };
    if (!selectedPackage || !customer) {
        return <div>Loading...</div>;
    }
    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4 text-orange-600 text-center">Payment Page</h2>
            <div className="mb-6">
                <h3 className="text-lg font-bold">Package Details:</h3>
                <p><strong>Package Name:</strong> {selectedPackage.packageName}</p>
                <p><strong>Price:</strong> ${selectedPackage.price}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-lg font-bold">Customer Details:</h3>
                <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>CNIC:</strong> {customer.cnic}</p>
            </div>
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
