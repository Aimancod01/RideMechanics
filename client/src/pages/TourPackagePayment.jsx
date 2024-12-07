import React, { useState,useEffect } from "react";
import { PulseLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShoppingBag, User } from "lucide-react";
function TourPackagePayment({ packageId, customerId }) {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {  setIsLoading(true)
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
            } finally {
                setIsLoading(false);
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
       

        try { setIsPaymentProcessing(true);
            const response = await fetch("http://localhost:5000/api/tour-package-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: totalPrice*100 , customerName: `${customer.firstName} ${customer.lastName}`,
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
                });navigate('/getPackageList')
            }
        } catch (error) {
            console.error("Error during payment:", error);
            toast.error("An error occurred during payment. Please try again.");
        }finally {
            setIsPaymentProcessing(false);
          }
    };
    if (isLoading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <PulseLoader color="#f97316" size={15} />
          </div>
        );
      }
      

    return (<div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-orange-200">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center"> <ShoppingBag className="inline-block mr-2" />Payment Page</h2>
            <div className="mb-6 bg-orange-50 p-4 rounded-lg shadow-inner">
                <h3 className="text-lg font-bold text-orange-600">Package Details:</h3>
                <p className="text-gray-700"><strong>Package Name:</strong> {selectedPackage.packageName}</p>
                <p className="text-gray-700"><strong>Price:</strong> ${selectedPackage.price}</p>
            </div>
            <div className="mb-6 bg-orange-50 p-4 rounded-lg shadow-inner">
                <h3 className="text-lg font-bold text-orange-600"> <User className="inline-block mr-2" />Customer Details:</h3>
                <p className="text-gray-700"><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
                <p className="text-gray-700"><strong>Email:</strong> {customer.email}</p>
                <p className="text-gray-700"><strong>CNIC:</strong> {customer.cnic}</p>
            </div>
            <form onSubmit={handlePayment}>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-orange-600">Quantity</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}  placeholder="Enter quantity"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <p className="text-lg font-bold text-orange-600">Total Price Rs: {totalPrice}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-orange-600">Card Details</label>
                    <CardElement className="p-2 border rounded" />
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center"
                    disabled={!stripe || isPaymentProcessing}
                > {isPaymentProcessing ? (
                    <PulseLoader color="#fff" size={8} />
                  ) : (
                    `Pay Rs:${totalPrice}` )}
                </button>
            </form>
        </div></div>
    );
}

export default TourPackagePayment;
