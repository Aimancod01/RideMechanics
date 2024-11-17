import React, { createContext, useState  } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  const addToCart = (car) => {
    setCart((prevCart) => [...prevCart, car]);
  };

  const removeFromCart = (carId) => {
    setCart((prevCart) => prevCart.filter(car => car._id !== carId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart  }}>
      {children}
    </CartContext.Provider>
  );
};
