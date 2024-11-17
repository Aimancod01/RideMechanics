import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TourPackageForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: '',
    price: '',
    arrivalTime: new Date(),
    departureTime: new Date(),
    picture: null,
  });

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
    const data = new FormData();
    data.append('picture', formData.picture);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('features', formData.features);
    data.append('price', formData.price);
    data.append('arrivalTime', formData.arrivalTime);
    data.append('departureTime', formData.departureTime);

    try {
      await axios.post('/api/tour-packages', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Package created successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to create package');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Picture</label>
        <input type="file" name="picture" onChange={handleFileChange} className="w-full px-3 py-2 border" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Features</label>
        <textarea
          name="features"
          value={formData.features}
          onChange={handleChange}
          className="w-full px-3 py-2 border"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Arrival Time</label>
        <DatePicker
          selected={formData.arrivalTime}
          onChange={(date) => handleDateChange('arrivalTime', date)}
          showTimeSelect
          dateFormat="Pp"
          className="w-full px-3 py-2 border"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Departure Time</label>
        <DatePicker
          selected={formData.departureTime}
          onChange={(date) => handleDateChange('departureTime', date)}
          showTimeSelect
          dateFormat="Pp"
          className="w-full px-3 py-2 border"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Package
      </button>
    </form>
  );
};

export default TourPackageForm;
