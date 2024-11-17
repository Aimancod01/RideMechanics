import React, { useState } from 'react';
import axios from 'axios';

const MaintenanceForm = ({ carId, onClose }) => {
  const [maintenanceDate, setMaintenanceDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/maintenance', {
        carId,
        maintenanceDate,
        description
      });
      alert('Maintenance scheduled successfully');
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error('Failed to schedule maintenance:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h3 className="text-xl font-bold mb-4">Schedule Maintenance</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Maintenance Date</label>
            <input
              type="date"
              value={maintenanceDate}
              onChange={(e) => setMaintenanceDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceForm;