import React from 'react';

const Slider = ({ value, onChange }) => {
  return (
    <div className="mt-4">
      <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">Price Range</label>
      <input
        type="range"
        id="priceRange"
        min="0"
        max="100000"
        value={value[1]}
        onChange={onChange}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>0</span>
        <span>{value[1]}</span>
      </div>
    </div>
  );
};

export default Slider;
