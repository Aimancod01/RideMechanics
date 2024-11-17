// CarContext.js
import React, { createContext, useState, useContext } from 'react';

const CarsContext = createContext();

export const useCar = () => useContext(CarsContext);

export const CarProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <CarsContext.Provider value={{ selectedCar, setSelectedCar }}>
      {children}
    </CarsContext.Provider>
  );
};
