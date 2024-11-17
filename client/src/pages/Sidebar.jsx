
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 {/*import { faFileChartColumn, faWrench } from '@fortawesome/free-solid-svg-icons';*/}

import { Link } from 'react-router-dom';
import { Home, Car, Calendar, User,Construction, } from 'lucide-react';

const Sidebar = () => {
  return (
   
      <div className="p-4 sm:p-6 md:p-8 lg:p-12">
        <h1 className="text-2xl md:text-4xl font-bold text-orange-700 mb-8 text-center">Dashboard</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-8">
          {/* Home Page Badge */}
          <Link to="/" className="bg-white rounded-3xl shadow-lg p-4 transition duration-300 ease-in-out hover:scale-105 hover:bg-orange-100 flex flex-col items-center justify-center">
            <Home size={32} className="text-orange-700 mb-2" />
            <span className="text-lg font-semibold text-orange-800 text-center">Home Page</span>
          </Link>

          {/* Manage Cars Badge */}
          <Link to="/cars" className="bg-white rounded-3xl shadow-lg p-4 transition duration-300 ease-in-out hover:scale-105 hover:bg-orange-100 flex flex-col items-center justify-center">
            <Car size={32} className="text-orange-700 mb-2" />
            <span className="text-lg font-semibold text-orange-800 text-center">Manage Cars</span>
          </Link>
          {/* View Bookings Badge */}
          <Link to="/bookings" className="bg-white rounded-3xl shadow-lg p-4 transition duration-300 ease-in-out hover:scale-105 hover:bg-orange-100 flex flex-col items-center justify-center">
            <Calendar size={32} className="text-orange-700 mb-2" />
            <span className="text-lg font-semibold text-orange-800 text-center">View Bookings</span>
          </Link>
          {/* Profile Badge */}
          <Link to="/profile" className="bg-white rounded-3xl shadow-lg p-4 transition duration-300 ease-in-out hover:scale-105 hover:bg-orange-100 flex flex-col items-center justify-center">
            <User size={32} className="text-orange-700 mb-2" />
            <span className="text-lg font-semibold text-orange-800 text-center">Profile</span>
          </Link>
          <Link to="/reports" className="bg-white rounded-3xl shadow-lg p-4 transition duration-300 ease-in-out hover:scale-105 hover:bg-orange-100 flex flex-col items-center justify-center">
         {/*  <FontAwesomeIcon icon={faFileChartColumn} size="2x" className="text-orange-700 mb-2" />*/}
          <span className="text-lg font-semibold text-orange-800 text-center">Reports</span> 
        </Link>
        <Link to="/Maintenance" className="bg-white rounded-3xl shadow-lg p-4 transition duration-300 ease-in-out hover:scale-105 hover:bg-orange-100 flex flex-col items-center justify-center">
        {/* <FontAwesomeIcon  icon={faWrench} size="2x" className="text-orange-700 mb-2" />*/}
          <span className="text-lg font-semibold text-orange-800 text-center"> Maintenance Schedule</span>
        </Link>
        </div>
     

    </div>
  );
};

export default Sidebar;
