import car from "../assets/images/car.jpg";
import tour from "../assets/images/tour.jpg";
import roadside from "../assets/images/roadside.jpg";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="px-10 py-12 bg-gradient-to-r from-orange-100 to-orange-300">
      <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-gray-800 mb-10">Explore Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Car Rental Service */}
        <Link className="relative group" to="/carList">
          <div className="relative">
            <img src={car} alt="Car Rental" className="h-96 rounded-lg w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-white font-bold text-2xl sm:text-2xl p-6 bg-black bg-opacity-60 rounded-lg w-full text-center shadow-lg group-hover:bg-opacity-80 transition-all">Car Rental Service</h1>
          </div>
        </Link>

        {/* Tourism Service */}
        <Link className="relative group" to="/getpackageList">
          <div className="relative">
            <img src={tour} alt="Tourism Service" className="h-96 rounded-lg w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-white font-bold text-2xl sm:text-2xl p-6 bg-black bg-opacity-60 rounded-lg w-full text-center shadow-lg group-hover:bg-opacity-80 transition-all">Tourism Service</h1>
          </div>
        </Link>

        {/* Roadside Assistance */}
        <Link className="relative group" to="/roadside">
          <div className="relative">
            <img src={roadside} alt="Roadside Assistance" className="h-96 rounded-lg w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-white font-bold text-2xl sm:text-2xl p-6 bg-black bg-opacity-60 rounded-lg w-full text-center shadow-lg group-hover:bg-opacity-80 transition-all">Roadside Assistance</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Main;
