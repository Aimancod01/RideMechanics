import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";

function TourCustomerForm() {
    const { state } = useLocation();
    const selectedPackage = state?.selectedPackage;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        cnic: "",
        address: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit =async  (e) => {
        e.preventDefault();
        const customerData = { ...formData, packageId: selectedPackage._id };
        try {
            const response = await fetch("http://localhost:5000/api/tourCustomer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(customerData),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Customer saved successfully:", data);
                navigate("/tourPackagePayment", { state: { customer: data.customer, package: selectedPackage } });
            } else {
                const errorData = await response.json();
                console.error("Error saving customer:", errorData);
               
            }
        } catch (error) {
            console.error("Network error:", error);
           
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-orange-600 text-center">Tour Customer Information</h2>
            {selectedPackage && (
                <div className="mb-6">
                    <h3 className="text-lg font-bold">Selected Package:</h3>
                    <p>{selectedPackage.packageName}</p>
                    <p><strong>Price:</strong> {selectedPackage.price}</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold">CNIC</label>
                    <input
                        type="text"
                        name="cnic"
                        value={formData.cnic}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default TourCustomerForm;
