import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2 } from "lucide-react"; // Import Lucide icons
import { PulseLoader } from "react-spinners";
function PackageList() {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedPackage, setUpdatedPackage] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all packages
    fetch("http://localhost:5000/api/packages")
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);
  const handleUploadClick = () => {
    navigate("/upload/package");
  };

  const handleEditClick = (id) => {
    // Fetch specific package data for the selected card
    fetch(`http://localhost:5000/api/packages/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedPackage(data);
        setUpdatedPackage(data); // Set the updated package to the current data
        setIsModalOpen(true);
      })
      .catch((error) => console.error("Error fetching package:", error));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPackage((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setUpdatedPackage((prev) => ({ ...prev, picture: e.target.files[0] }));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    Object.entries(updatedPackage).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(`http://localhost:5000/api/packages/${updatedPackage._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Update the packages list with the modified package
        setPackages((prev) =>
          prev.map((pkg) => (pkg._id === data._id ? data : pkg))
        );
        closeModal(); // Close modal after successful update
      } else {
        console.error("Error updating package");
      }
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/packages/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove the deleted package from the state
          // setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
          // After the deletion, reload the page to reflect the changes
          window.location.reload();
        } else {
          console.error("Error deleting package");
        }
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };


  return (
    <div className="py-8 px-4 bg-gray-50 min-h-screen flex flex-col items-center">
    <div className="mb-6 text-center">
      <button className="bg-orange-500 text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:bg-orange-600" onClick={handleUploadClick}>
        Upload
      </button>
    </div>

    {/* Show PulseLoader while data is loading */}
    {loading ? (
      <div className="flex justify-center items-center w-full h-64">
        <PulseLoader color="#F97316" size={15} />
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <div key={pkg._id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex justify-between p-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white">
                <button className="bg-transparent border-2 border-white rounded-full p-2 hover:bg-orange-700" onClick={() => handleEditClick(pkg._id)}>Edit</button>
                <button className="bg-transparent border-2 border-white text-white py-1 px-3 rounded-lg hover:bg-red-600" onClick={() => handleDelete(pkg._id)}>Delete</button>
              </div>
              {pkg.picture && (
                <img
                  src={`http://localhost:5000/uploads/${pkg.picture}`}
                  alt={pkg.packageName}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{pkg.packageName}</h3>
                <p className="text-gray-600"><strong>Price:</strong> ${pkg.price}</p>
                <p className="text-gray-600"><strong>Date:</strong> {new Date(pkg.date).toLocaleDateString()}</p>
                <p className="text-gray-600"><strong>Timing:</strong> {pkg.timing}</p>
                <p className="text-gray-600"><strong>Car:</strong> {pkg.carInfo.carName} - {pkg.carInfo.model}</p>
                <p className="text-gray-600"><strong>Color:</strong> {pkg.carInfo.color}</p>
                <p className="text-gray-600"><strong>Seater:</strong> {pkg.carInfo.seater}</p>
              </div>
            </div>
          ))
        ) : (
          <span className="text-center text-gray-500">No packages uploaded yet.</span>
        )}
      </div>
    )}

    {/* Modal */}
    {isModalOpen && selectedPackage && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <span className="absolute top-4 right-4 text-2xl text-gray-500 cursor-pointer" onClick={closeModal}>&times;</span>
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">Edit Package: {selectedPackage.packageName}</h2>

          {/* Editable Fields */}
          <label className="block mb-2">
            Package Name:
            <input
              type="text"
              name="packageName"
              value={updatedPackage.packageName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="block mb-2">
              Price:
              <input
                type="number"
                name="price"
                value={updatedPackage.price}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </label>
            <label className="block mb-2">
              Date:
              <input
                type="date"
                name="date"
                value={new Date(updatedPackage.date).toISOString().split("T")[0]}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </label>
            <label className="block mb-2">
              Timing:
              <input
                type="text"
                name="timing"
                value={updatedPackage.timing}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </label>
            <label className="block mb-2">
              Car Name:
              <input
                type="text"
                name="carName"
                value={updatedPackage.carInfo.carName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </label>
            <label className="block mb-2">
              Model:
              <input
                type="text"
                name="model"
                value={updatedPackage.carInfo.model}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </label>
            <label className="block mb-2">
              Color:
              <input
                type="text"
                name="color"
                value={updatedPackage.carInfo.color}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </label>
            <label className="block mb-2">
              Seater:
              <input
                type="number"
                name="seater"
                value={updatedPackage.carInfo.seater}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </label>
            <label className="block mb-2">
              Picture:
              <input
                type="file"
                name="picture"
                onChange={handleFileChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </label>
          {/* More form fields here */}

          <div className="mt-4 flex justify-between">
            <button
              onClick={handleUpdate}
              className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300">
              Update
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
}

export default PackageList;
