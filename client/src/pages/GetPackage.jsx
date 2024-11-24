import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PulseLoader } from "react-spinners";
function GetPackageList() {
    const [packages, setPackages] = useState([]);
    const [search, setSearch] = useState("");
   
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


    useEffect(() => {
        fetchPackages();
    }, [search]);

    const fetchPackages = () => {
        setLoading(true);
        const query = new URLSearchParams();
        if (search) query.append('search', search);
       
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
    const handleBuy = (pkg) => {
        navigate("/tourCustomerForm", { state: { selectedPackage: pkg } });
    };
    return (
        <div className="py-8 px-4  min-h-screen flex flex-col items-center">
            <div className="mb-6 text-center ">
            <h1  className=" text-orange-500 text-4xl font-bold tracking-wide">PackageList</h1>
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
                                    <button    onClick={() => handleBuy(pkg)}
                type="submit"
                className="w-full p-3 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition duration-200 ease-in-out"
            >
                Buy
            </button> </div>

                            </div> 
                        ))
                    ) : (
                        <span className="text-center text-gray-500">No packages uploaded yet.</span>
                    )}
                </div>
            )}
           
        </div>
    );
}

export default GetPackageList;
