import React, { useState } from 'react';
import axios from 'axios';

function UploadPackage() {
  const [formData, setFormData] = useState({
    packageName: '',
    price: '',
    date: '',
    timing: '',
    carName: '',
    carModel: '',
    carColor: '',
    carSeater: '',
    picture: null,
  });
  const [message, setMessage] = useState(null);  // Added state for message
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('packageName', formData.packageName);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('timing', formData.timing);
    formDataToSend.append('carName', formData.carName);
    formDataToSend.append('model', formData.carModel);
    formDataToSend.append('color', formData.carColor);
    formDataToSend.append('seater', formData.carSeater);
    formDataToSend.append('picture', formData.picture);

    try {
      const response = await axios.post('http://localhost:5000/api/packages', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage({ type: 'success', text: 'Package uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading package:', error);
      setMessage({ type: 'error', text: 'Failed to upload package. Please try again.' });  // Show error 
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg ">
      <h1 className="text-2xl font-bold text-center text-orange-600 mb-4">Upload Car Rental Package</h1>
      {message && (
        <div
          className={`p-4 mb-4 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}
      <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="picture" className="block text-gray-700 font-medium">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="form-group">
          <label htmlFor="packageName" className="block text-gray-700 font-medium">Package Name:</label>
          <input
            type="text"
            id="packageName"
            name="packageName"
            value={formData.packageName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter package name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="block text-gray-700 font-medium">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date" className="block text-gray-700 font-medium">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="timing" className="block text-gray-700 font-medium">Timing:</label>
          <input
            type="text"
            id="timing"
            name="timing"
            value={formData.timing}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter timing"
            required
          />
        </div>

        <h2 className="text-xl font-semibold text-orange-600 mt-6">Car Information</h2>

        <div className="form-group">
          <label htmlFor="carName" className="block text-gray-700 font-medium">Car Name:</label>
          <input
            type="text"
            id="carName"
            name="carName"
            value={formData.carName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter car name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="carModel" className="block text-gray-700 font-medium">Car Model:</label>
          <input
            type="text"
            id="carModel"
            name="carModel"
            value={formData.carModel}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter car model"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="carColor" className="block text-gray-700 font-medium">Car Color:</label>
          <input
            type="text"
            id="carColor"
            name="carColor"
            value={formData.carColor}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter car color"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="carSeater" className="block text-gray-700 font-medium">Seater (No. of Seats):</label>
          <input
            type="number"
            id="carSeater"
            name="carSeater"
            value={formData.carSeater}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter number of seats"
            required
          />
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="w-full p-3 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition duration-200 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadPackage;
