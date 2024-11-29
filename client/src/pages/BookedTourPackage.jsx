import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PulseLoader } from "react-spinners";
function BookedTourPackageList() {
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        // Fetch payment data when component mounts
        const fetchData = async () => {
            const data = await fetchPaymentDataById(paymentId);
            setPaymentData(data);
        };
        fetchData();
    }, [paymentId]);

    if (!paymentData) {
        return <div>Loading...</div>;
    }
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img
            className="w-full h-48 object-cover"
            src={`http://localhost:5000/uploads/${paymentData.packageId.picture}`} // Assuming the package has an image
            alt={paymentData.packageId.packageName}
        />
        <div className="px-6 py-4">
            <h2 className="font-semibold text-xl text-gray-800 mb-2">{paymentData.packageId.packageName}</h2>
            <p className="text-gray-700"><strong>Customer:</strong> {paymentData.customerId.name}</p>
            <p className="text-gray-600"><strong>Price:</strong> ${paymentData.totalPrice}</p>
            <p className="text-gray-600"><strong>Quantity:</strong> {paymentData.quantity}</p>
            <p className="text-gray-600"><strong>Payment ID:</strong> {paymentData.paymentId}</p>
            <p className="text-gray-600"><strong>Date:</strong> {new Date(paymentData.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="px-6 py-4">
            <button className="w-full p-3 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition duration-200 ease-in-out">
                View Details
            </button>
        </div>
    </div>
    );
}

export default BookedTourPackageList;
