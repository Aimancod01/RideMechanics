import React, { useState, useContext } from 'react'; import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { FormDataContext } from './FormDataContext';
import 'react-datepicker/dist/react-datepicker.css'; import {  MapPin, Calendar, Clock, AlertCircle, Search } from 'lucide-react'
import axios from 'axios'; import CarResults from './CarResults';
const SearchForm = () => {
  const { setFormData } = useContext(FormDataContext);
  const [city, setCity] = useState('');
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState(null);
  const [dropoffTime, setDropoffTime] = useState('');
  const [days, setDays] = useState(0);
  const [error, setError] = useState(''); const [cars, setCars] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city || !pickupDate || !pickupTime || !dropoffDate || !dropoffTime) {
      setError('All fields are required');
      return;
    } try {
      const response = await axios.post('http://localhost:5000/api/pickdrop', { city, pickupDate, pickupTime, dropoffDate, dropoffTime });
      console.log('Response:', response.data); const startDate = new Date(pickupDate);
      const endDate = new Date(dropoffDate);
      const timeDifference = endDate.getTime() - startDate.getTime();
      const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); setFormData(response.data);
      // Ensure days is a positive integer
      if (dayDifference <= 0) {
        setError('Dropoff date must be after pickup date');
        return;
      }

      setDays(dayDifference);
      setDays(dayDifference);
      const carResponse = await axios.post('http://localhost:5000/api/cars', {
        days: dayDifference,
        city: city
      });
      setCars(carResponse.data);
    } catch (error) {
      console.error('Error submitting pick and drop details:', error);
      setError('Error submitting pick and drop details. Please try again.');
    }
  }; const cities = [
    "Lahore", "Islamabad", "Multan", "Faisalabad", "Karachi", "Sargodha", "Sialkot", "Sahiwal",
    "Gujranwala", "Rahim Yar Khan", "Peshawar", "Jhelum", "Abbottabad", "Gujrat", "Sadiqabad",
    "Swat", "Mardan", "Mansehra", "Muzaffarabad", "Hyderabad", "Quetta", "Sukkur"
  ]; const times = [
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "Noon",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM",
    "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
  ]
  const navigate = useNavigate();
  const handleSearchForm = () => {
    navigate("/search");
  };

  return (
    <div className="bg-gradient-to-r from-orange-100 to-orange-200 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-600 mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-center">Find Your Perfect Ride</h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center">Discover the best and most affordable cars for your journey</p>



        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            <div className="relative"> <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5" />
              <select
                value={city} 
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-10 pr-3 py-2 sm:py-2.5 md:py-3 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
              > <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select> 
            </div>
            <div className="relative"> <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5" />
            <DatePicker
              selected={pickupDate}
              onChange={(date) => setPickupDate(date)}
              className="w-full pl-10 pr-3 py-2 sm:py-2.5 md:py-3 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
              placeholderText="Pickup Date"
            />  </div>
             <div className="relative">  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5" />
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full pl-10 pr-3 py-2 sm:py-2.5 md:py-3 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
              >
                <option value="">Pick-up Time</option>
                {times.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
             
            </div>
           
            <div className="relative"> <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5" />
              <DatePicker
                selected={dropoffDate}
                onChange={(date) => setDropoffDate(date)}
                className="w-full pl-10 pr-3 py-2 sm:py-2.5 md:py-3 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                placeholderText="Dropoff Date"
              />
            
            </div>
            <div className="relative md:col-span-2">    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5" />
              <select
                value={dropoffTime}
                onChange={(e) => setDropoffTime(e.target.value)}
                className="w-full pl-10 pr-3 py-2 sm:py-2.5 md:py-3 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
              >
                <option value="">Drop-off Time</option>
                {times.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
             
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 rounded-lg text-xs sm:text-sm md:text-base transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center"
          >   <Search className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
            Search Available Cars
          </button>  

        </form>  {error && (
          <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 sm:p-3 md:p-4 rounded-md flex items-start">
            <AlertCircle className="flex-shrink-0 mr-2 h-4 sm:h-5 w-4 sm:w-5" />
            <p className="text-xs sm:text-sm md:text-base">{error}</p>
          </div>
        )} {days > 0 && (
          <p className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 text-gray-600 text-center text-xs sm:text-sm md:text-base">
            Rental duration: <span className="font-bold text-orange-600">{days} days</span>
          </p>
        )} </div>
    </div>   
  
  );
};

export default SearchForm;
