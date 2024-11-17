import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const CarCart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Car Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map(car => (
            <div key={car._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={`http://localhost:5000/${car.image}`} alt={car.carName} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="text-2xl font-bold">{car.carName}</h3>
                <p className="text-gray-600">{car.carModel}</p>
                <div className="flex items-center mt-2">
                  <span className="text-blue-500 font-semibold mr-2">
                    <i className="fas fa-door-closed"></i> {car.doors}
                  </span>
                  <span className="text-blue-500 font-semibold mr-2">
                    <i className="fas fa-chair"></i> {car.seats}
                  </span>
                  <span className="text-blue-500 font-semibold mr-2">
                    {car.transmission === 'Manual' ? 'Manual' : 'Automatic'}
                  </span>
                  <span className="text-blue-500 font-semibold">
                    {car.ac ? 'AC' : 'Non-AC'}
                  </span>
                </div>
                <div className="mt-4">
                  <span className="bg-blue-100 text-blue-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{car.category}</span>
                  <span className="bg-green-100 text-green-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Theft Protection</span>
                  <span className="bg-purple-100 text-purple-500 text-xs font-semibold px-2.5 py-0.5 rounded">Clean Interior/Exterior</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-900 font-bold text-xl">Rs {car.price}/{car.days} day(s)</span>
                  <button
                    onClick={() => removeFromCart(car._id)}
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarCart;
