import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { PulseLoader } from "react-spinners";

Modal.setAppElement("#root"); // Set the root element for accessibility

function GetPackageList() {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/packages")
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
        setLoading(false);
      });
  }, []);

  const handleUploadClick = () => {
    navigate("/upload/package");
  };

  const fetchPackages = () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (search) query.append("search", search);

    fetch(`http://localhost:5000/api/search?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
        setLoading(false);
      });
  };

  const handleCardClick = (pkg) => {
    setSelectedPackage(pkg); // Set the selected package for the modal
  };

  const handleModalClose = () => {
    setSelectedPackage(null); // Close the modal
  };

  const handleBuy = (pkg) => {
    navigate(`/tourCustomerForm?packageId=${pkg._id}`);
  };

  return (
    <div className="py-8 px-4 min-h-screen flex flex-col items-center">
      <div className="mb-6 text-center">
        <h1 className="text-orange-500 text-4xl font-bold tracking-wide">Package List</h1>
      </div>
      <div className="mb-8 w-full max-w-4xl flex justify-center items-center space-x-4">
        <input
          type="text"
          placeholder="Search by package name or price"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-2/3 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600 text-lg"
        />
        <button
          onClick={fetchPackages}
          className="w-1/3 p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
        >
          Search
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center w-full h-64">
          <PulseLoader color="#F97316" size={15} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <div
                key={pkg._id}
                onClick={() => handleCardClick(pkg)}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                {pkg.picture && (
                  <img
                    src={`http://localhost:5000/uploads/${pkg.picture}`}
                    alt={pkg.packageName}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{pkg.packageName}</h3>
                  <p className="text-gray-600">
                    <strong>Price:</strong> {pkg.price} PKR
                  </p>
                  <p className="text-gray-600">
                    <strong>Location:</strong> {pkg.location}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <span className="text-center text-gray-500">No packages uploaded yet.</span>
          )}
        </div>
      )}

      {/* React Modal */}
      {selectedPackage && (
        <Modal
          isOpen={!!selectedPackage}
          onRequestClose={handleModalClose}
          contentLabel="Package Details"
          className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              &times;
            </button>
            {selectedPackage.picture && (
              <img
                src={`http://localhost:5000/uploads/${selectedPackage.picture}`}
                alt={selectedPackage.packageName}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedPackage.packageName}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> {selectedPackage.description}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Price:</strong>${selectedPackage.price}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Departure Date:</strong> {new Date(selectedPackage.departureDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Departure Time:</strong> {selectedPackage.departureTime}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Arrival Date:</strong> {new Date(selectedPackage.arrivalDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Arrival Time:</strong> {selectedPackage.arrivalTime}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Location:</strong> {selectedPackage.location}
            </p>
            <button
              onClick={() => handleBuy(selectedPackage)}
              className="w-full p-3 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition duration-200 ease-in-out"
            >
              Buy
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default GetPackageList;
