// FormDataContext.js
import React, { createContext, useState, useEffect  } from 'react';

export const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
// Load initial state from localStorage if available
const savedData = localStorage.getItem('formData');
return savedData ? JSON.parse(savedData) : {}; });useEffect(() => {
  // Save formData to localStorage whenever it changes
  localStorage.setItem('formData', JSON.stringify(formData));
}, [formData]);
  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
