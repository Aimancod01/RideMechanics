// App.js
import React, { useEffect, useState } from 'react';
import DriverCard from './DriverCard';
import { CartProvider } from '../components/CartContext';

const DriverCardApp = () => {
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
    <CartProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Drivers and Cars</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drivers.map(driver => (
            <DriverCard key={driver._id} driver={driver} />
          ))}
        </div>
      </div>
    </CartProvider>
  );
};

export default DriverCardApp;
