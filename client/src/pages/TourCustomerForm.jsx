import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { User, Mail, MapPin, IdCard } from "lucide-react"; // Importing icons from react-lucide
function TourCustomerForm() {
    const [searchParams] = useSearchParams();
    const packageId = searchParams.get("packageId");
     const [packageDetails, setPackageDetails] = useState(null); // State to store package details
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        cnic: "",
        address: "",
    });
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/packages/${packageId}`);
                if (response.ok) {
                    const data = await response.json();
                    setPackageDetails(data);
                } else {
                    console.error("failed to fetch package detail");
                }}catch (error) {
                    console.error("Network error");
                }
            
};
if(packageId){
    fetchPackageDetails();
}
    }, [packageId])
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const customerData = { ...formData, packageId };
    
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
                console.log("Response from server:", data);
    
                if (data?.newCustomer?._id) {
                    const customerId = data.newCustomer._id;
                    console.log("Customer saved successfully, navigating to payment page:", customerId);
    
                    // Navigate to the payment page
                    navigate(`/tourPackagePayment?packageId=${packageId}&customerId=${customerId}`);
                } else {
                    console.error("Customer ID not found in the response:", data);
                }
            } else {
                const errorData = await response.json();
                console.error("Error saving customer:", errorData);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };
    
    return (<div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 text-center">Tour Customer Information</h2>
            {packageDetails && (
                <div className="mb-6 bg-orange-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-lg font-bold text-orange-700">Selected Package:</h3>
                    <p className="text-gray-700">  <strong>Package Name:</strong> {packageDetails.packageName}</p>
                    <p className="text-gray-700"><strong>Price:</strong> {packageDetails.price}</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1 sm:space-y-2">  <label className="block text-sm font-medium text-gray-700">First Name</label>  <div className="relative"><User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  
                    <input
                        type="text"
                        name="firstName"id="firstName"
                        value={formData.firstName}
                        onChange={handleChange} placeholder="Enter your first name"
                        className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                        required
                    /></div>
                </div>
                <div className="space-y-2">
                    <label  htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>     <div className="relative"><User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"  />
                    <input
                        type="text"
                        name="lastName"id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}  placeholder="Enter your last name"
                        className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                        required
                    /> </div>
                </div>
                <div className="space-y-2">
                    <label   htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label><div className="relative">  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"  />
                    <input
                        type="email"
                        name="email" id="email"
                        value={formData.email}
                        onChange={handleChange}  placeholder="Enter your email"
                        className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                        required
                    /></div>
                </div>
                <div className="space-y-2">
                    <label   htmlFor="cnic" className="block text-sm font-medium text-gray-700">CNIC</label> <div className="relative"> <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"  />
                    <input
                        type="text"
                        name="cnic" id="cnic"
                        value={formData.cnic}
                        onChange={handleChange}   placeholder="Enter your CNIC"    maxLength={15} pattern="\d{5}-\d{7}-\d"
    title="Enter CNIC in format XXXXX-XXXXXXX-X"
                        className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                        required
                    />                </div>
                </div>
                <div className="space-y-2">
                    <label   htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label> <div className="relative">   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"  />
                    <input
                        name="address"id="address"
                        value={formData.address}
                        onChange={handleChange} placeholder="123 Main St, City, Country" 
                        className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                        required
                    />              </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center"
                >
                    Submit
                </button>
            </form>
        </div></div>
    );
}

export default TourCustomerForm;
