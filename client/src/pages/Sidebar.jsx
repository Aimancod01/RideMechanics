import React from "react";
import { Link } from "react-router-dom";
import { Car, Calendar, User, FileText, Wrench, Package, UserRoundCog } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="px-6 py-8 bg-white  rounded-lg mx-auto">
      <div className="grid grid-cols-1 gap-6">
        {/* Manage Cars */}
        <Link to="/cars" className="flex items-center bg-gradient-to-br from-orange-100 to-white rounded-lg shadow-md p-4 transition transform hover:scale-105 hover:shadow-lg">
          <Car size={36} className="text-orange-600 mr-4" />
          <span className="text-sm font-medium text-orange-700">Manage Cars</span>
        </Link>

        {/* View Bookings */}
        <Link to="/bookings" className="flex items-center bg-gradient-to-br from-orange-100 to-white rounded-lg shadow-md p-4 transition transform hover:scale-105 hover:shadow-lg">
          <Calendar size={36} className="text-orange-600 mr-4" />
          <span className="text-sm font-medium text-orange-700">View Bookings</span>
        </Link>

        {/* Profile */}

        {/* Reports */}
        <Link to="/reports" className="flex items-center bg-gradient-to-br from-orange-100 to-white rounded-lg shadow-md p-4 transition transform hover:scale-105 hover:shadow-lg">
          <FileText size={36} className="text-orange-600 mr-4" />
          <span className="text-sm font-medium text-orange-700">Reports</span>
        </Link>

        {/* Maintenance */}
        <Link to="/Maintenance" className="flex items-center bg-gradient-to-br from-orange-100 to-white rounded-lg shadow-md p-4 transition transform hover:scale-105 hover:shadow-lg">
          <Wrench size={36} className="text-orange-600 mr-4" />
          <span className="text-sm font-medium text-orange-700">Maintenance</span>
        </Link>

        {/* Tour Packages */}
        <Link to="/packageList" className="flex items-center bg-gradient-to-br from-orange-100 to-white rounded-lg shadow-md p-4 transition transform hover:scale-105 hover:shadow-lg">
          <Package size={36} className="text-orange-600 mr-4" />
          <span className="text-sm font-medium text-orange-700">Tour Packages</span>
        </Link>
        {/* Tour Packages */}
        <Link to="/bookingPackages" className="flex items-center bg-gradient-to-br from-orange-100 to-white rounded-lg shadow-md p-4 transition transform hover:scale-105 hover:shadow-lg">
          <Calendar size={36} className="text-orange-600 mr-4" />
          <span className="text-sm font-medium text-orange-700">View Tour Payments</span>
        </Link>

        {/* Mechanics */}
        <Link to="/mechanics" className="flex items-center bg-gradient-to-br from-orange-100 to-white rounded-lg shadow-md p-4 transition transform hover:scale-105 hover:shadow-lg">
          <UserRoundCog size={36} className="text-orange-600 mr-4" />
          <span className="text-sm font-medium text-orange-700">Mechanics</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
