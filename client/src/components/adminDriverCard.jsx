// components/DriverCard.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
const DriverCard = ({ driver }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <img src={`/${driver.image}`} alt={driver.fullName} className="w-32 h-32 rounded-full mx-auto" />
      <h2 className="text-xl font-bold text-center mt-4">{driver.fullName}</h2>
      <p className="text-gray-600 text-center">{driver.phoneNumber}</p>
      <p className="text-gray-600 text-center">{driver.address}</p>
      <p className="text-gray-600 text-center">{driver.cnic}</p>
      <p className="text-gray-600 text-center">Driver Price: ${driver.driverPrice}</p>
      <h3 className="text-lg font-semibold mt-4">Car Information:</h3>
      <img src={`/${driver.car.image}`} alt={driver.car.carName} className="w-32 h-32 rounded-full mx-auto" />
      <p className="text-gray-600">Name: {driver.car.carName}</p>
      <p className="text-gray-600">Model: {driver.car.carModel}</p>
      <p className="text-gray-600">Doors: {driver.car.doors}</p>
      <p className="text-gray-600">Seats: {driver.car.seats}</p>
      <p className="text-gray-600">Transmission: {driver.car.transmission}</p>
      <p className="text-gray-600">AC: {driver.car.ac ? 'Yes' : 'No'}</p>
      <p className="text-gray-600">Category: {driver.car.category}</p>
      <p className="text-gray-600">Price: ${driver.car.price}</p>
      <p className="text-gray-600">Days: {driver.car.days}</p>
      <p className="text-gray-600">Theft Protection: {driver.car.theftProtection ? 'Yes' : 'No'}</p>
      <p className="text-gray-600">Clean: {driver.car.clean }</p>
    </div>
  );
};

// App.js



const adminDriverCard = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/drivers');
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Drivers and Cars</h1><button onClick={() => onEdit(car._id)}> <FontAwesomeIcon icon={faEdit} /> Edit
      </button><button onClick={() => onDelete(car._id)}>
                <FontAwesomeIcon icon={faTrashAlt} /> Delete
            </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map(driver => (
          <DriverCard key={driver._id} driver={driver} />
        ))}
      </div>
    </div>
  );
};

export default adminDriverCard;

