import  { useEffect, useState, useContext } from "react";
import axios from "axios";

import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import "flowbite";
import DatePicker from 'react-datepicker';
import { FormDataContext } from '../components/FormDataContext';
import 'react-datepicker/dist/react-datepicker.css';
import {toast} from 'react-toastify';
import { Users, } from "lucide-react";
import { MapPin, Calendar, Clock, AlertCircle, Search  } from 'lucide-react';

import {
  FaDoorOpen,
  FaCouch,
  FaBolt,
  FaCar,
  FaSnowflake,
} from "react-icons/fa";

const CarList = () => {
  const { setFormData } = useContext(FormDataContext);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { addToCart } = useContext(CartContext);
  
  //const [bookings, setBookings] = useState([]);
  const [city, setCity] = useState('');
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState(null);
  const [dropoffTime, setDropoffTime] = useState('');
  const [days, setDays] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cars", {
          params: { available: true },
        });
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const navigate = useNavigate();

  const handleCustomerForm = () => {
    if (selectedCar) {
      navigate(`/api/car/${selectedCar._id}`, { state: { car: selectedCar } });
    }
  };
  const openModal = (car) => {
    setSelectedCar(car);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setModalIsOpen(false);
  };
 
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleViewBookings = () => {
    navigate("/getBookingByEmail");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city || !pickupDate || !pickupTime || !dropoffDate || !dropoffTime) {
      setError('All fields are required');
      toast.error("All fields are required")
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/pickdrop', {
        city,
        pickupDate,
        pickupTime,
        dropoffDate,
        dropoffTime,
      });

      console.log('Response:', response.data);
      const startDate = new Date(pickupDate);
      const endDate = new Date(dropoffDate);
      const timeDifference = endDate.getTime() - startDate.getTime();
      const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      if (dayDifference <= 0) {
        setError('Dropoff date must be after pickup date');
        return;
      }

      setDays(dayDifference);
      setFormData(response.data);

      const carResponse = await axios.post('http://localhost:5000/api/cars', {
        days: dayDifference,
        city,
      });
      setCars(carResponse.data);toast.success('Cars data fetching successfully')
    } catch (error) {
      console.error('Error submitting pick and drop details:', error);
      setError('Error submitting pick and drop details. Please try again.');
      toast.error('Car data not found')
    }
  };
  const cities = [
    'Lahore',
    'Islamabad',
    'Multan',
    'Faisalabad',
    'Karachi',
    'Sargodha',
    'Sialkot',
    'Sahiwal',
    'Gujranwala',
    'Rahim Yar Khan',
    'Peshawar',
    'Jhelum',
    'Abbottabad',
    'Gujrat',
    'Sadiqabad',
    'Swat',
    'Mardan',
    'Mansehra',
    'Muzaffarabad',
    'Hyderabad',
    'Quetta',
    'Sukkur',
  ];

  const times = [
    '06:00 AM',
    '07:00 AM',
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    'Noon',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM',
    '10:00 PM',
    '11:00 PM',
  ];

  
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-gradient-to-r from-orange-100 to-orange-200  rounded-xl  flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-600 mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-center">
            Find Your Perfect Ride
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center">
            Discover the best and most affordable cars for your journey
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6"
          >
            {/* City Selector */}{" "}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 sm:py-2.5 md:py-3 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                >
                  <option value="">Select City</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pickup Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5" />
                <DatePicker
                  selected={pickupDate}
                  onChange={(date) => setPickupDate(date)}
                  className="w-full pl-10 pr-3 py-2 sm:py-2.5 md:py-3 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                  placeholderText="Pickup Date"
                />
              </div>

              {/* Pickup Time */}
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5" />
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 sm:py-2.5 md:py-3 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                >
                  <option value="">Pick-up Time</option>
                  {times.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropoff Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5" />
                <DatePicker
                  selected={dropoffDate}
                  onChange={(date) => setDropoffDate(date)}
                  className="w-full pl-10 pr-3 py-2 sm:py-2.5 md:py-3 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                  placeholderText="Dropoff Date"
                />
              </div>

              {/* Dropoff Time */}
              <div className="relative md:col-span-2">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5" />
                <select
                  value={dropoffTime}
                  onChange={(e) => setDropoffTime(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 sm:py-2.5 md:py-3 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                >
                  <option value="">Drop-off Time</option>
                  {times.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 rounded-lg text-xs sm:text-sm md:text-base transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              <Search className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              Search Available Cars
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md flex items-start">
              <AlertCircle className="flex-shrink-0 mr-2 h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>


  
    <div className="max-w-7xl mx-auto p-4">
      
      <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {" "}
          <button
            onClick={handleViewBookings}
            className=" bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 rounded-lg text-xs sm:text-sm md:text-base transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center"
          >
            View Bookings
          </button>
          <h2 className="text-3xl font-bold text-orange-600 mb-8 mt-4">Car Rentals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div key={car._id} className="bg-white shadow-lg rounded-lg overflow-hidden relative group transition transform hover:scale-105 hover:shadow-2xl">
                <img src={`http://localhost:5000/${car.image}`} alt={car.carName} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-orange-600">
                    {car.carName}
                  </h3>
                  <p className="text-gray-600 ">{car.carModel}</p>
                  <p className="text-gray-600">{car.carNumber}</p>
                  <div className="flex flex-wrap items-center mt-2 gap-3">
                    <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                      <FaDoorOpen className="mr-1" />
                      {car.doors} doors
                    </span>

                    <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                      {" "}
                      <FaCouch className="mr-1" /> {car.seats} seats
                    </span>
                    <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                      {car.transmission === "Manual" ? <FaCar /> : <FaBolt />} {car.transmission}
                    </span>
                    <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                      <FaSnowflake className="mr-1" /> {car.ac ? "AC" : "Non-AC"}
                    </span>
                  </div>
                  {/* <div className="flex justify-between items-center mb-4"> <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Gauge className="w-4 h-4" />
                    {car.transmission === 'Manual' ? 'Manual' : 'Automatic'}
                  </div> <div className="flex items-center space-x-2 text-sm text-gray-500">  
                      <span >
                        {car.ac ? 'AC' : 'Non-AC'}
                      </span>
                    </div> </div> */}
                  <div className="mt-4 space-x-2">
                    <span className="bg-purple-100 text-purple-500 text-xs font-semibold px-2 py-1 rounded-lg">{car.category}</span>

                    <span className="bg-green-100 text-green-500 text-xs font-semibold px-2 py-1 rounded-lg ml-2">Clean Interior/Exterior</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className=" font-bold text-xl">
                      Rs {car.price}/{car.days} day(s)
                    </span>
                    <button onClick={() => openModal(car)} className={`btn ${car.availabilityEndDate && new Date(car.availabilityEndDate) > new Date() ? "btn-disabled" : "btn-primary"}w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 `}  disabled={car.availabilityEndDate && new Date(car.availabilityEndDate) > new Date()}>
                    {car.availabilityEndDate && new Date(car.availabilityEndDate) > new Date()
    ? "Unavailable"
    : "Book Now"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {selectedCar && (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Car Preview" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" overlayClassName="bg-gray-800 bg-opacity-75">
              <div className="sm:max-w-[700px] bg-white">
                <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-orange-600">
                        Car Preview
                      </h2>
                      <p>Review the details of your selected car</p>

                      <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="flex">
                      <div className="grid gap-6 py-4">
                        {" "}
                        <div className="flex flex-col md:flex-row gap-6">
                          <img src={`http://localhost:5000/${selectedCar.image}`} alt={selectedCar.carName} className="w-full md:w-1/3 h-48 object-cover rounded-lg" />
                          <div className="w-2/3 pl-4">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedCar.carName}</h3>
                            <p className="text-gray-600">{selectedCar.carModel}</p>
                            <p className="text-gray-600">{selectedCar.carNumber}</p>
                            <p className="text-gray-600">{selectedCar.city}</p>
                            <div className="grid grid-cols-2 gap-4 my-4">
                              <div className="flex items-center gap-2 text-gray-600">
                                <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                                  <FaDoorOpen className="w-4 h-4 " />
                                  {selectedCar.doors}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                                  {" "}
                                  <Users className=" " />
                                  {selectedCar.seats}
                                </span>{" "}
                              </div>{" "}
                              <div className="flex items-center space-x-2 text-gray-600">
                                <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                                  {selectedCar.transmission === "Manual" ? <FaCar /> : <FaBolt />}
                                  {selectedCar.transmission}
                                </span>
                              </div>{" "}
                              <div className="flex items-center space-x-2 text-gray-600">
                                <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-sm font-semibold">
                                  <FaSnowflake className="mr-1" /> {selectedCar.ac ? "AC" : "Non-AC"}
                                </span>
                              </div>{" "}
                            </div>
                            <div className="mt-4 space-x-2">
                              <span className="bg-blue-100 text-blue-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{selectedCar.category}</span>

                              <span className="bg-purple-100 text-purple-500 text-xs font-semibold px-2.5 py-0.5 rounded">Clean Interior/Exterior</span>
                            </div>
                            {/* <p className="mt-4 text-gray-600">
                        Days: {selectedCar.days} 
                      </p> */}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                          <span className="text-2xl font-bold text-orange-600">Total Rs {selectedCar.price}</span>{" "}
                          <div className="flex gap-4">
                            <button onClick={handleCustomerForm} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
                              continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default CarList;
