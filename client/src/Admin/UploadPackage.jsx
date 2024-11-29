import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
  const [message, setMessage] = useState(null);  // Added state for message
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
      setMessage( 'Package uploaded successfully!' );
    } catch (error) {
      console.error('Error uploading package:', error);
      setMessage('Failed to upload package. Please try again.');  // Show error 
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg ">
      <h1 className="text-2xl font-bold text-center text-orange-600 mb-4">Upload Car Rental Package</h1>
      {message && (
        <div
          className={`p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
        >
          {message.text}
        </div>
      )}
      <form className="space-y-6" onSubmit={handleSubmit} >
        
        <div className="form-group">
          <label htmlFor="packageName" className="block text-gray-700 font-medium">Package Name:</label>
          <input
            type="text"
            id="packageName"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter package name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="block text-gray-700 font-medium">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="block text-gray-700 font-medium">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.dprice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter price"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Departure Date</label>
          <DatePicker
            selected={formData.departureDate}
            onChange={(date) => handleDateChange('departureDate', date)}
            className="w-full px-3 py-2 border"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Departure Time</label>
          <input
            type="text"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Arrival Date</label>
          <DatePicker
            selected={formData.arrivalDate}
            onChange={(date) => handleDateChange('arrivalDate', date)}
            className="w-full px-3 py-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Arrival Time</label>
          <input
            type="text"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border"
            required
          />
        </div>
        <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Location </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Picture</label>
        <input type="file" name="picture" onChange={handleFileChange} className="w-full px-3 py-2 border" />
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
    </div>
  );
}

export default UploadPackage;
