import car from "../assets/images/car.jpg";
import tour from "../assets/images/tour.jpg";
import roadside from "../assets/images/roadside.jpg";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="px-10 py-16 bg-gradient-to-r from-orange-100 to-orange-300">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-8">Explore Our Services</h2>
        <p className="text-lg text-gray-700 mb-12">We offer a range of services designed to cater to your travel and transportation needs. Explore the options below to find the perfect fit for you.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {/* Car Rental Service */}
        <Link className="group" to="/carList">
          <div className="relative shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={car} alt="Car Rental" className="h-96 rounded-lg w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center group-hover:bg-opacity-60 transition-all duration-300">
              <h1 className="text-white font-bold text-2xl sm:text-3xl">Car Rental Service</h1>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">Enjoy hassle-free car rental services with a wide selection of vehicles to suit your needs. From daily rentals to long-term options, we ensure your journey is smooth and comfortable.</p>
          </div>
        </Link>

        {/* Tourism Service */}
        <Link className="group" to="/getpackageList">
          <div className="relative shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={tour} alt="Tourism Service" className="h-96 rounded-lg w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center group-hover:bg-opacity-60 transition-all duration-300">
              <h1 className="text-white font-bold text-2xl sm:text-3xl">Tourism Service</h1>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">Explore breathtaking destinations with our expertly curated travel packages. Whether it’s a relaxing getaway or an adventure-filled trip, we’ve got you covered.</p>
          </div>
        </Link>

        {/* Roadside Assistance */}
        <Link className="group" to="/roadside">
          <div className="relative shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={roadside} alt="Roadside Assistance" className="h-96 rounded-lg w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center group-hover:bg-opacity-60 transition-all duration-300">
              <h1 className="text-white font-bold text-2xl sm:text-3xl">Roadside Assistance</h1>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">Stuck on the road? Our 24/7 roadside assistance is here to help you with quick and reliable solutions, including towing, battery jump-starts, and more.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Main;
