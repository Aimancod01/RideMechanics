import React, { useState, useContext} from 'react';

import DatePicker from 'react-datepicker';import CarDetails from './CarDetail';
import 'react-datepicker/dist/react-datepicker.css';import axios from 'axios';
const PickDropForm = () => {
    const [pickupDate, setPickupDate] = useState(null);
    const [pickupTime, setPickupTime] = useState('');
    const [dropoffDate,setDropoffDate ] = useState(null);
    const [dropoffTime, setDropoffTime ] = useState('');
    const [city, setCity] = useState('');const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to backend)
        try {
            const response = await axios.post('http://localhost:5000/api/pickdrop', {
              city,
              pickupDate,
              pickupTime,
              dropoffDate,
              dropoffTime,
            });
            console.log('Search data sent:', response.data);
            // Handle success or navigate to results page
          } catch (error) {
            console.error('Error sending search data:', error);
            // Handle error (show message, etc.)
          }
    }; 
    return (
        <div className="flex flex-col items-center bg-blue-600 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Search for Cars</h2>
      <p className="text-white mb-4">Find the best and most affordable cars</p>
      
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded" required  
        >
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
          <option value="Multan">Multan</option>
          <option value="Faislabad" >Faislabad</option>
          <option value="Lahore">Karachi</option>
          <option value="Sargodha">Sargodha</option><option value="Sialkot" >Sialkot</option>
          <option value="Sahiwal">Sahiwal</option>
          <option value="Gujranwala">Gujranwala</option><option value="Rahim Yar Khan" >Rahim Yar Khan</option>
          <option value="Peshawar">Peshawar</option>
          <option value="Jhelum">Jhelum</option><option value="Abbottabad" >Abbottabad</option>
          <option value="Gujrat">Gujrat</option>
          <option value="Sadiqabad">Sadiqabad</option><option value="Sawat" >Sawat</option>
          <option value="Mardan">Mardan</option> <option value="Mansehra">Mansehra</option>
          <option value="Muzaffarabad">Muzaffarabad</option> <option value="Hyderabad">Hyderabad</option>
          <option value="Quetta">Quetta</option><option value="Sukkur">Sukkur</option>
        </select>
        <DatePicker
          selected={pickupDate}
          onChange={(date) => setPickupDate(date)}
          className="px-4 py-2 rounded"
          placeholderText="Pickup Date"
        />
        <input
          type="time"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          className="px-4 py-2 rounded"
        />
        <DatePicker
          selected={dropoffDate}
          onChange={(date) => setDropoffDate(date)}
          className="px-4 py-2 rounded"
          placeholderText="Dropoff Date"
        />
        <input
          type="time"
          value={dropoffTime}
          onChange={(e) => setDropoffTime(e.target.value)}
          className="px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
    );
};

export default PickDropForm;
