import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditMaintenanceForm from './EditMaintenanceForm'; // Import the EditMaintenanceForm component
import { PulseLoader } from 'react-spinners'; // Import the spinner
import { Edit, Trash2 } from 'lucide-react'; // Import icons
const MaintenanceSchedule = ({ onClose }) => {
  const [schedules, setSchedules] = useState([]);
  const [editScheduleId, setEditScheduleId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/maintenance');
        setSchedules(response.data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
   
    fetchSchedules();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        await axios.delete(`http://localhost:5000/api/maintenance/${id}`);
        setSchedules(schedules.filter(schedule => schedule._id !== id)); // Remove schedule from state
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
    }
  };

  const handleEditClick = (id) => {
    setEditScheduleId(id);
  };

  const handleCloseEditForm = () => {
    setEditScheduleId(null); // Close the edit form
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gradient-to-br from-orange-100 to-white min-h-screen">
      
        <h3 className="text-3xl font-semibold mb-8 text-center text-orange-600  tracking-wide">Maintenance Schedules</h3>
        {loading ? (
        <div className="flex justify-center items-center h-64">
        <PulseLoader color="#FFA500" loading={loading} size={15} />
      </div>
      ) :  (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {schedules.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No maintenance schedules found.</p>
          ) : (  
            schedules.map(schedule => (
              <div key={schedule._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex flex-col">
                <h4 className="text-lg font-semibold text-orange-700 mb-2">Scheduled Date: {new Date(schedule.maintenanceDate).toLocaleDateString()}</h4>
                <p className="text-gray-700 mb-2"><strong>Description:</strong> {schedule.description}</p>
                <p className="text-gray-700 mb-2"><strong>Car Name:</strong> {schedule.carId?.carName || 'N/A'}</p>
                <p className="text-gray-700 mb-2"><strong>Car Model:</strong> {schedule.carId?.carModel || 'N/A'}</p>
                <p className="text-gray-700 mb-2"><strong>Car Number:</strong> {schedule.carId?.carNumber || 'N/A'}</p>
                <div className="flex justify-between mt-auto space-x-2">
                <button
                  onClick={() => handleDelete(schedule._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
                >
                   <Trash2 size={16} /> Delete
                </button>
                <button
                  onClick={() => handleEditClick(schedule._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
                >
                    <Edit size={16} /> Edit
                </button>  </div>{editScheduleId === schedule._id  && (
          <EditMaintenanceForm
            scheduleId={editScheduleId}
            onClose={handleCloseEditForm}
          />
        )}
              </div>
            ))
          )}
        </div>
         )}
      </div>
   
  );
};

export default MaintenanceSchedule;