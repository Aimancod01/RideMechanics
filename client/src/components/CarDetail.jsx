import React, { useEffect, useState } from 'react';
import { useCar } from './CarsContext';
import { useParams } from 'react-router-dom';import { useNavigate } from 'react-router-dom';
import axios from 'axios';import CustomerForm from './CustomerForm';import { useLocation } from 'react-router-dom';
const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCarDetails  ()  {
      try {
        const response = await  axios.get(`http://localhost:5000/api/car/${id}`);
        
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    if (id) {
    fetchCarDetails(); }
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }
// const location = useLocation();
 // const { cars } = location.state || {};
  
  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto mt-10">
    <div className="car-details p-4 border rounded md:w-1/2">
      <h1 className="text-2xl font-bold">Car Rental</h1>
      <h2 className="text-xl">{car.carName} - {car.carModel}</h2>
      <p className="text-gray-500">{car.city}</p>
      <div className="subtotal mt-4">
        <h3 className="font-semibold">Subtotal</h3>
        <p>Day(s): {car.days}</p>
      </div>
      <div className="total mt-4">
        <h3 className="font-semibold">Total</h3>
        <p className="text-blue-500">Rs {car.price}</p>
      </div>
    </div>
    <div className="md:w-1/2 mt-6 md:mt-0 md:ml-4">
     
    </div>
  </div>
  );
};

export default CarDetails;
