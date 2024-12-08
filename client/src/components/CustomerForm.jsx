import React, { useState, useEffect, } from 'react';
import CarDetails from './CarDetail';
import { useParams } from 'react-router-dom';
import { User, Mail, CreditCard, Phone, MapPin, Car } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; 
import { useCar } from './CarsContext';
import { PulseLoader } from 'react-spinners';
const CustomerForm = ({ carId }) => {
    const [formDataCustomer, setFormDataCustomer] = useState({
        fullName: '',
        cnic: '',
        email: '',
        contactNumber: '', address: '', carId: carId
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataCustomer({ ...formDataCustomer, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform validation before submitting
        // Example: validateForm(formData);

        // If form is valid, submit data to backend



        try {
            const response = await fetch('http://localhost:5000/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataCustomer),
            });
            if (response.ok) {
                console.log('Customer data saved successfully');

                // Reset form fields after successful submission if needed
                navigate('/booking', { state: { formDataCustomer, car: setSelectedCar(car) } });
            } else {
                console.error('Failed to save customer data');
            }
        } catch (error) {
            console.error('Error saving customer data:', error);
        }
    };
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        async function fetchCarDetails() {
            try {
                const response = await axios.get(`http://localhost:5000/api/car/${id}`);

                setCar(response.data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };
        if (id) {
            fetchCarDetails();
        }
    }, [id]);

     if (!car) {
         return (
            <div className="flex justify-center items-center h-screen">
                <PulseLoader color="#F97316" size={15} />
            </div>
        );;
     }
     const { setSelectedCar } = useCar();
    return (<div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-orange-600">Customer Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4"><div className="space-y-1 sm:space-y-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>   <div className="relative"><User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formDataCustomer.fullName}
                            onChange={handleChange}
                            required placeholder="John Doe"
                            className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                        /></div>
                </div><div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label> <div className="relative"> <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={formDataCustomer.email}
                                onChange={handleChange}
                                required placeholder="john@example.com"
                                className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                            /> </div>
                    </div><div className="space-y-2">
                        <label htmlFor="cnic" className="block text-sm font-medium text-gray-700">CNIC</label> <div className="relative"> <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                id="cnic"
                                name="cnic"
                                value={formDataCustomer.cnic}
                                onChange={handleChange}
                                required placeholder="XXXXX-XXXXXXX-X"
                                className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                            /> </div>
                    </div><div className="space-y-2">
                        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label> <div className="relative">  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                id="contactNumber"
                                name="contactNumber"
                                value={formDataCustomer.contactNumber}
                                onChange={handleChange}
                                required placeholder="+1 234 567 8900"
                                className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                            /> </div>
                    </div><div className="space-y-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label> <div className="relative"> <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formDataCustomer.address}
                                onChange={handleChange}
                                required placeholder="123 Main St, City, Country"
                                className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                            />
                        </div> </div>
                    {/* Repeat similar markup for CNIC, email, and contactNumber<CarDetails/> */}
                    <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center"> Save and Continue</button>
                </form>
            </div>
            <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                    <h1 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4">Car Rental Details</h1>
                    <div className="flex items-center space-x-2 mb-4"> <Car className="text-orange-500" />
                        <h2 className="text-lg sm:text-xl font-semibold">{car.carName} - {car.carModel}</h2>
                    </div>
                    <p className="text-gray-600 mb-4">{car.city}</p>
                    <p className="text-gray-600 mb-4">{car.carNumber}</p>
                    <div className="border-t pt-4 mb-4">
                        <h4 className="font-semibold text-base sm:text-lg mb-2">Rental Duration</h4>
                        <p className="text-gray-700">Day(s): {car.days}</p>
                    </div>
                    <div className="border-t pt-4">
                        <h4 className="font-semibold text-base sm:text-lg mb-2">Total Price</h4>
                        <p className="text-2xl sm:text-3xl font-bold text-orange-600">Rs {car.price}</p>
                    </div>
                </div>

            </div>
        </div >
    </div>
    );
};

export default CustomerForm;
