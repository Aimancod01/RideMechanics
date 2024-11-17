import React from 'react';
import CarDetails from './CarDetail';
import CustomerForm from './CustomerForm';
import { useParams } from 'react-router-dom';

const CarPage = () => {
  const { id } = useParams();
//flex flex-col md:flex-row max-w-4xl mx-auto mt-10"
//md:w-1/2
  return (
    <div className="">
      <div className="">
        <CustomerForm carId={id} />
      </div>
     
    </div>
  );
};

export default CarPage;
