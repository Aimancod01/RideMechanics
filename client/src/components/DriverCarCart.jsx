// CarCart.js
import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';

const DriverCarCart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cart.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-xl font-bold text-center mt-4">{item.driver.fullName}</h2>
            <p className="text-gray-600 text-center">{item.driver.phoneNumber}</p>
            <p className="text-gray-600 text-center">{item.driver.address}</p>
            <p className="text-gray-600 text-center">{item.driver.cnic}</p>
            <p className="text-gray-600 text-center">Driver Price: ${item.driver.driverPrice}</p>
            <h3 className="text-lg font-semibold mt-4">Car Information:</h3>
            <img src={`/${item.driver.car.image}`} alt={item.driver.car.carName} className="w-32 h-32 rounded-full mx-auto" />
            <p className="text-gray-600">Name: {item.driver.car.carName}</p>
            <p className="text-gray-600">Model: {item.driver.car.carModel}</p>
            <p className="text-gray-600">Doors: {item.driver.car.doors}</p>
            <p className="text-gray-600">Seats: {item.driver.car.seats}</p>
            <p className="text-gray-600">Transmission: {item.driver.car.transmission}</p>
            <p className="text-gray-600">AC: {item.driver.car.ac ? 'Yes' : 'No'}</p>
            <p className="text-gray-600">Category: {item.driver.car.category}</p>
            <p className="text-gray-600">Price: ${item.driver.car.price}</p>
            <p className="text-gray-600">Days: {item.driver.car.days}</p>
            <p className="text-gray-600">Theft Protection: {item.driver.car.theftProtection ? 'Yes' : 'No'}</p>
            <p className="text-gray-600">Clean: {item.driver.car.clean}</p>
            <p className="text-gray-600">Total Price: ${item.totalPrice.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverCarCart;
