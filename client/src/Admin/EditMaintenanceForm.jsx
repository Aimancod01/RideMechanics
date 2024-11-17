import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditMaintenanceForm = ({ scheduleId, onClose }) => {
  const [schedule, setSchedule] = useState({
    maintenanceDate: '',
    description: '',
    carId: '',
    userId: '',
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/maintenance/${scheduleId}`);
        setSchedule(response.data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };
    
    fetchSchedule();
  }, [scheduleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule(prev => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/maintenance/${scheduleId}`, schedule);
      alert('Maintenance schedule updated successfully!');
      onClose(); // Close the form after updating
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 space-y-4 transition-all transform duration-200 hover:scale-105">
        <h3 className="text-lg font-semibold text-center text-orange-600 mb-4">Edit Maintenance Schedule</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1" htmlFor="maintenanceDate">Maintenance Date</label>
            <input
              type="date"
              id="maintenanceDate"
              name="maintenanceDate"
              value={schedule.maintenanceDate}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg text-gray-800 border-gray-300 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={schedule.description}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg text-gray-800 border-gray-300 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              rows="2"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200"
            >
              Save 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMaintenanceForm;