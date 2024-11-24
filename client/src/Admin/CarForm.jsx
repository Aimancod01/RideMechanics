import React, { useState } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

const CarForm = () => {
  const [formData, setFormData] = useState({
    carName: '',
    carModel: '',
    doors: '',
    seats: '',
    transmission: 'Manual',
    ac: false,
    category: '',
    theftProtection: false,
    clean: false,
    image: null,
    price: '',
    days: '',
    latitude: '',
    longitude: '',
    carNumber: '',
    city: '',
  });
  // Function to handle location selection from the map
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setFormData({
          ...formData,
          latitude: lat.toFixed(6), // Limit to 6 decimal places
          longitude: lng.toFixed(6),
        });
      },
    });

    return formData.latitude && formData.longitude ? (
      <Marker position={[formData.latitude, formData.longitude]} />
    ) : null;
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSliderChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      priceRange: [0, parseInt(value, 10)]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'image' && formData[key]) {
        formDataToSend.append('image', formData[key]);
      }  else {
        formDataToSend.append(key, formData[key]);
      }
    }
    try {
      const response = await axios.post('http://localhost:5000/api/cars', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      },);
      console.log('Car added successfully:', response.data);
      setFormData({
        carName: '',
        carModel: '',
        doors: '',
        seats: '',
        transmission: 'Manual',
        ac: false,
        category: '',
        theftProtection: false,
        clean: false,
        image: null,
        price: '',
        days: '',
        latitude: '',
        longitude: '',
        carNumber: '',
        city: '',
      });
    } catch (error) {
      console.error('Failed to add car:', error);
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg mb-12">
      <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">Add New Car</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Car Name */}
        <div className="w-full">
          <label htmlFor="carName" className="block text-sm font-medium text-gray-700">Car Name</label>
          <input
            type="text"
            id="carName"
            name="carName"
            value={formData.carName}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
            required
          />
        </div>

        {/* Car Model */}
        <div className="w-full">
          <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">Car Model</label>
          <input
            type="text"
            id="carModel"
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
            required
          />
        </div>
        {/* Map for selecting location */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Car Location</label>
          <MapContainer
            center={[31.5204, 74.3587]} // Default location
            zoom={13}
            style={{ height: '200px', width: '100%', marginTop: '1rem', borderRadius: '8px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
            />
            <LocationMarker />
          </MapContainer>
        </div>

        {/* Number of Doors */}
        <div className="w-full">
          <label htmlFor="doors" className="block text-sm font-medium text-gray-700">Number of Doors</label>
          <input
            type="number"
            id="doors"
            name="doors"
            value={formData.doors}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
            required
          />
        </div>

        {/* Number of Seats */}
        <div className="w-full">
          <label htmlFor="seats" className="block text-sm font-medium text-gray-700">Number of Seats</label>
          <input
            type="number"
            id="seats"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
            required
          />
        </div>

        {/* Transmission Type */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Transmission Type</label>
          <select
            id="transmission"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option> <option value="Electric">Electric</option>
          </select>
        </div>

        {/* AC */}
        <div className="flex items-center space-x-2">
          <label htmlFor="ac" className="block text-sm font-medium text-gray-700">Air Conditioning</label>
          <input
            type="checkbox"
            id="ac"
            name="ac"
            checked={formData.ac}
            onChange={handleChange}
            className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
          />
        </div>

        {/* Category */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="flex  flex-wrap gap-4">
            <input
              type="radio"
              name="category"
              value="Economy"
              checked={formData.category === 'Economy'}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
              required
            />
            <span className="text-gray-700 ml-2 text-sm ">Economy</span>
            <input
              type="radio"
              name="category"
              value="Luxury"
              checked={formData.category === 'Luxury'}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
              required
            />
            <span className="text-gray-700 ml-2 text-sm ">Luxury</span>
            <input
              type="radio"
              name="category"
              value="Standard"
              checked={formData.category === 'Standard'}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
              required
            />
            <span className="text-gray-700  ml-2 text-sm ">Standard</span>
            <input
              type="radio"
              name="category"
              value="Commercial"
              checked={formData.category === 'Commercial'}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
              required
            />
            <span className="text-gray-700 ml-2 text-sm ">Commercial</span>
          </div>
        </div>

        {/* Price */}  <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="w-full">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>

          {/* Number of Days */}
          <div className="w-full">
            <label htmlFor="days" className="block text-sm font-medium text-gray-700">Number of Days</label>
            <input
              type="number"
              id="days"
              name="days"
              value={formData.days}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
        </div>
        {/* Latitude */} <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="w-full">
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="number"
              step="any"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 cursor-not-allowed"
              required
            />
          </div>

          {/* Longitude */}
          <div className="w-full">
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
            <input
              type="number"
              step="any"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 cursor-not-allowed"
              required
            />
          </div>
        </div>
        {/* Car Number */}
        <div className="w-full">
          <label htmlFor="carNumber" className="block text-sm font-medium text-gray-700">Car Number</label>
          <input
            type="text"
            id="carNumber"
            name="carNumber"
            value={formData.carNumber}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
            required
          />
        </div>

       

       

        {/* Clean Interior/Exterior */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 text-sm font-bold ">Clean Interior/Exterior</label>
          <input
            type="checkbox"
            name="clean"
            checked={formData.clean}
            onChange={handleChange}
            className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
          />
        </div>

        {/* Upload Image */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* City */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default CarForm;
