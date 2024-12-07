import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Calendar, DollarSign, FileText, ImageIcon, MapPin, Clock, HandCoins, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function UploadPackage() {
  const [formData, setFormData] = useState({
    packageName: '',
    description: '',
    price: '',
    departureDate: new Date(),
    departureTime: '',
    arrivalDate: new Date(),
    arrivalTime: '',
    location: '',
    picture: null,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };
  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('packageName', formData.packageName);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('departureDate', formData.departureDate);
    formDataToSend.append('departureTime', formData.departureTime);
    formDataToSend.append('arrivalDate', formData.arrivalDate);
    formDataToSend.append('arrivalTime', formData.arrivalTime);
    formDataToSend.append('location', formData.location);
    if (formData.picture) {
      formDataToSend.append('picture', formData.picture);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/packages', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data)
      toast.success( 'Package uploaded successfully!' ); navigate('/packageList');
    } catch (error) {
      console.error('Error uploading package:', error);
      toast.error('Failed to upload package. Please try again.');  // Show error 
    }
  };

  return (<div className="container mx-auto px-4 py-8">
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200 ">
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-600 text-center">Upload Tour Package</h1>
      
      <form className="space-y-6" onSubmit={handleSubmit} >
      <div className="space-y-1 sm:space-y-2">
        <div className="form-group">
          <label htmlFor="packageName" className="block text-sm font-medium text-gray-700">Package Name:</label> <div className="relative">  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"  />
          <input
            type="text"
            id="packageName"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
            placeholder="Enter package name"
            required
          />
        </div>
        </div> </div>
        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label> <div className="relative">   <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"  />
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
            placeholder="Enter description"
            required
          />
        </div> </div>
        <div className="form-group">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label> <div className="relative">  < HandCoins className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
            placeholder="Enter price"
            required
          />
        </div> </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Departure Date</label> <div className="relative">  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"  />
          <DatePicker
            selected={formData.departureDate}
            onChange={(date) => handleDateChange('departureDate', date)}
            className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
          />
        </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Departure Time</label><div className="relative"><Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="departureTime" placeholder="Departure Time"
            value={formData.departureTime}
            onChange={handleChange}
            className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
            required
          />
        </div> </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Arrival Date</label><div className="relative">  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"  />
          <DatePicker
            selected={formData.arrivalDate}
            onChange={(date) => handleDateChange('arrivalDate', date)}
            className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
          />
        </div> </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Arrival Time</label><div className="relative"><Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"  />
          <input
            type="text"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange} placeholder="Arrival Time"
            className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
            required
          />
        </div> </div>
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Location </label><div className="relative"> <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange} placeholder="123 Main St, City, Country"
          className="pl-10 w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
        />
      </div> </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Picture</label><div className="relative">  
        <input type="file" name="picture" onChange={handleFileChange} className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:ring-2 focus:ring-orange-500" />
      </div>
      </div>
        <div className="form-group">
          <button
            type="submit"
            className="w-full p-3 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition duration-200 ease-in-out"
          >
            Create Package
          </button>
        </div>
      </form>
    </div> <ToastContainer position="top-right" autoClose={3000} /></div>
  );
}

export default UploadPackage;
