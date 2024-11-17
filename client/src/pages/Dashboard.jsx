// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../pages/Sidebar'; import CarForm from "../Admin/CarForm";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-white">

      <Sidebar />

      <CarForm />

    </div>
  );
};

export default Dashboard;
