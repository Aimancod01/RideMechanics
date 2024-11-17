import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCar = () => {
  const { id } = useParams(); // Get the car ID from the route parameters
  const navigate = useNavigate();

  const [car, setCar] = useState({
    carName: '',
    carModel: '',
    doors: '',
    seats: '',
    transmission: '',
    ac: false,
    category: '',
    price: '',
    days: '',
    image: null,
    theftProtection: false,
    clean: false,
    latitude: '',
    longitude: '',
    carNumber: '',
    priceRange: [0, 100000],
    city: '',
  });
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    // Fetch the car details when the component mounts
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
        const fetchedCar = response.data;
        if (!fetchedCar.priceRange) {
          fetchedCar.priceRange = [0, 100000]; // Ensure priceRange is initialized
        }
        setCar(fetchedCar);
      } catch (error) {
        console.error('Failed to fetch car details:', error); setNotification({ type: 'error', message: 'Failed to fetch car details!' });
      }
    };

    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCar(prevCar => ({
      ...prevCar,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); Object.keys(car).forEach(key => {
       if (car[key] !== null && car[key] !== undefined) {
        formData.append(key, car[key]);
      }})
      await axios.put(`http://localhost:5000/api/cars/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });setNotification({ type: 'success', message: 'Car updated successfully!' });
      navigate('/cars'); // Redirect to the car list page after successful update
         } catch (error) {
      console.error('Failed to update car:', error); setNotification({ type: 'error', message: 'Failed to update car!' });
    }
  };

  const handleSliderChange = (e) => {
    const { value } = e.target;
    setCar(prevCar => ({
      ...prevCar,
      priceRange: [0, parseInt(value, 10)],
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCar(prevCar => ({
      ...prevCar,
      image: file,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full overflow-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Car</h2> {notification && (
        <div className={`p-4 mb-4 rounded-md text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {notification.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Car Name */}
        <div>
          <label htmlFor="carName" className="block text-sm font-medium text-gray-700">Car Name</label>
          <input
            type="text"
            id="carName"
            name="carName"
            value={car.carName}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Car Model */}
        <div>
          <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">Car Model</label>
          <input
            type="text"
            id="carModel"
            name="carModel"
            value={car.carModel}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Number of Doors */}
        <div>
          <label htmlFor="doors" className="block text-sm font-medium text-gray-700">Number of Doors</label>
          <input
            type="number"
            id="doors"
            name="doors"
            value={car.doors}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Number of Seats */}
        <div>
          <label htmlFor="seats" className="block text-sm font-medium text-gray-700">Number of Seats</label>
          <input
            type="number"
            id="seats"
            name="seats"
            value={car.seats}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Transmission Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Transmission Type</label>
          <select
            id="transmission"
            name="transmission"
            value={car.transmission}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        {/* AC */}
        <div>
          <label htmlFor="ac" className="block text-sm font-medium text-gray-700">Air Conditioning</label>
          <input
            type="checkbox"
            id="ac"
            name="ac"
            checked={car.ac}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <div className="flex items-center">
            <input
              type="radio"
              name="category"
              value="Economy"
              checked={car.category === 'Economy'}
              onChange={handleChange}
              className="mr-2 leading-tight"
              required
            />
            <span className="text-gray-700">Economy</span>
            <input
              type="radio"
              name="category"
              value="Luxury"
              checked={car.category === 'Luxury'}
              onChange={handleChange}
              className="mr-2 leading-tight"
              required
            />
            <span className="text-gray-700">Luxury</span>
            <input
              type="radio"
              name="category"
              value="Standard"
              checked={car.category === 'Standard'}
              onChange={handleChange}
              className="mr-2 leading-tight"
              required
            />
            <span className="text-gray-700">Standard</span>
            <input
              type="radio"
              name="category"
              value="Commercial"
              checked={car.category === 'Commercial'}
              onChange={handleChange}
              className="mr-2 leading-tight"
              required
            />
            <span className="text-gray-700">Commercial</span>
          </div>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={car.price}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Number of Days */}
        <div>
          <label htmlFor="days" className="block text-sm font-medium text-gray-700">Number of Days</label>
          <input
            type="number"
            id="days"
            name="days"
            value={car.days}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Car Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="mt-1"
          />
        </div>

        {/* Theft Protection */}
        <div>
          <label htmlFor="theftProtection" className="block text-sm font-medium text-gray-700">Theft Protection</label>
          <input
            type="checkbox"
            id="theftProtection"
            name="theftProtection"
            checked={car.theftProtection}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        {/* Clean Interior/Exterior */}
        <div>
          <label htmlFor="clean" className="block text-sm font-medium text-gray-700">Clean Interior/Exterior</label>
          <input
            type="checkbox"
            id="clean"
            name="clean"
            checked={car.clean}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        {/* Latitude */}
        <div>
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={car.latitude}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Longitude */}
        <div>
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={car.longitude}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Car Number */}
        <div>
          <label htmlFor="carNumber" className="block text-sm font-medium text-gray-700">Car Number</label>
          <input
            type="text"
            id="carNumber"
            name="carNumber"
            value={car.carNumber}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Price Range Slider */}
        <div>
          <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">Price Range</label>
          <input
            type="range"
            id="priceRange"
            name="priceRange"
            min="0"
            max="100000"
            value={car.priceRange[1]}
            onChange={handleSliderChange}
            className="mt-1 block w-full"
          />
          <p className="text-gray-500">Up to ${car.priceRange[1]}</p>
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={car.city}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update Car
        </button>
      </form>
    </div>
  );
};

export default EditCar;
