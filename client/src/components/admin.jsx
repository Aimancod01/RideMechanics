import React, { useState } from 'react';
import axios from 'axios';
import CarList from "../pages/CarList";
const CarRentalForm = () => {
  const [formData, setFormData] = useState({
    carName: '',
    carModel: '',
    doors: '',
    seats: '',
    transmission: '',
    ac: false,
    category: '',
    price: '',
    days: '',
    theftProtection: false,
    clean: false,
    image: null, city: '', currentLocation: {
      lat: '',
      lng: ''
    }
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'lat' || name === 'lng') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        currentLocation: {
          ...prevFormData.currentLocation,
          [name]: parseFloat(value), // Ensure lat and lng are treated as numbersI have a car Rental and customer chat with car  owner Rental real time communication
        }
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
    //   setFormData({
    //   ...formData,
    //   [name]: type === 'checkbox' ? checked : value,
    //  }); 

  };
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithFile = new FormData();
    for (let key in formData) {
      formDataWithFile.append(key, formData[key]);
    }


    try {
      const response = await axios.post('http://localhost:5000/api/cars', formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setMessage('Car saved successfully!');
      setFormData({
        carName: '',
        carModel: '',
        doors: '',
        seats: '',
        transmission: '',
        ac: false,
        category: '',
        price: '',
        days: '',
        theftProtection: false,
        clean: false,
        image: null, city: '', currentLocation: {
          lat: '',
          lng: ''
        }
      });
    } catch (error) {
      setMessage('Error saving car: ' + (error.response ? error.response.data : error.message));
    }
  }

  return (<div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
    <div>
      {message && (<div className={`mb-4 p-3 rounded alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
        {message}
      </div>)}
    </div>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Car Name */}
        <div>
          <label className="block text-orange-600 text-sm font-bold mb-2">Car Name</label>
          <input
            type="text"
            name="carName"
            value={formData.carName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>  {/* Car Model */}
        <div>
          <label className="block text-orange-600 text-sm font-bold mb-2">Car Model</label>
          <input
            type="text"
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
      </div>  {/* Doors and Seats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-orange-600 text-sm font-bold mb-2">Doors</label>
          <input
            type="number"
            name="doors"
            value={formData.doors}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div >
          <label className="block text-orange-600 text-sm font-bold mb-2">Seats</label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
      </div> {/* Transmission */}
      <div >
        <label className="block text-orange-600 text-sm font-bold mb-2">Transmission</label>
        <div className="flex space-x-4"> <label className="flex items-center">
          <input
            type="radio"
            name="transmission"
            value="Auto"
            checked={formData.transmission === 'Auto'}
            onChange={handleChange}
            className="mr-2 "
            required
          /><span className="text-gray-700">Auto</span></label>
          <label className="flex items-center">
            <input
              type="radio"
              name="transmission"
              value="Manual"
              checked={formData.transmission === 'Manual'}
              onChange={handleChange}
              className="mr-2 "
              required
            />  <span>Manual</span></label>
          <label className="flex items-center">
            <input
              type="radio"
              name="transmission"
              value="Electric"
              checked={formData.transmission === 'Electric'}
              onChange={handleChange}
              className="mr-2 "
              required
            />
            <span >Electric</span></label>
        </div>
      </div> {/* AC */}
      <div >
        <label className="block text-orange-600 text-sm font-bold mb-2">AC</label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="ac"
            checked={formData.ac}
            onChange={handleChange}
            className="mr-2 "
          /><span >AC</span> </label>
        <label className="block text-orange-600 text-sm font-bold mb-2">AC</label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="ac"
            checked={!formData.ac}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
          <span className="text-gray-700">Non AC</span>
          <span >Non AC</span> </label></div>
      {/* Category */}
      < div  >
        <label className="block text-orange-600 text-sm font-bold mb-2">Category</label>
        <div className="flex space-x-4">  <label className="flex items-center">
          <input
            type="radio"
            name="category"
            value="Economy"
            checked={formData.category === 'Economy'}
            onChange={handleChange}
            className="mr-2 "
            required
          /> <span>Economy</span>
        </label> <label className="flex items-center">
            <span className="text-gray-700">Economy</span>
            <input
              type="radio"
              name="category"
              value="Luxury"
              checked={formData.category === 'Luxury'}
              onChange={handleChange}
              className="mr-2 "
              required
            /><span>Luxury</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="Standard"
              checked={formData.category === 'Standard'}
              onChange={handleChange}
              className="mr-2 "
              required
            /> <span>Standard</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="Commercial"
              checked={formData.category === 'Commercial'}
              onChange={handleChange}
              className="mr-2 "
              required
            />
            <span>Commercial</span>
          </label>
        </div>
      </div >{/* Price */}
      <div >
        <label className="block text-orange-600 text-sm font-bold mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">No of Days</label>
        <input
          type="number"
          name="days"
          value={formData.days}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Theft Protection</label>
        <input
          type="checkbox"
          name="theftProtection"
          checked={formData.theftProtection}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Clean Interior/Exterior</label>
        <input
          type="checkbox"
          name="clean"
          checked={formData.clean}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div> <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div><div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2"></label>
        <input
          type=""
          name="theftProtection"
          checked={formData.currentLocation}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
        >
          Save
        </button>
      </div>
    </form > <CarList /></div >
  );
};

export default CarRentalForm;
