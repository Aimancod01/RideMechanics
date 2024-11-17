import React, { useState } from 'react';
import axios from 'axios';

const DriverInformationForm = () => {
    const [formData, setFormData] = useState({carName:'',
  carModel:'',
  doors:'',
  seats:'',
  transmission:'',
  ac:false,
  category:'',
  price:'',
  days:'',
  theftProtection:false,
  clean:false,
  
  fullName:'',
  phoneNumber:'',
  address:'',
  cnic:'',
  driverPrice:'',
});const [driverImage, setDriverImage] = useState(null);
const [errorMessage, setErrorMessage] = useState('');const [carImage, setCarImage] = useState(null);
const [successMessage, setSuccessMessage] = useState('');
const handleFileChange = (e) => {
  const { name, files } = e.target;
  if (name === 'carImage') {
    setCarImage(files[0]);
  } else if (name === 'driverImage') {
    setDriverImage(files[0]);
  }
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev)=> ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
 const handleSubmit = async (e) => {
    e.preventDefault();const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (carImage) data.append('carImage', carImage);
    if (driverImage) data.append('driverImage', driverImage);

    
  
     try {
    const response = await axios.post('http://localhost:5000/api/drivers',data , {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 201) {
    // Clear form fields or show success message
   setSuccessMessage('Driver information saved successfully!');
setFormData({
    carName: '',
    carModel: '',
    doors: '',
    seats: '',
    transmission: '',
    ac: false,
    category: '',
    price: '',
    days: '',
    theftProtection: false,
    clean: false,
     fullName:'',
    phoneNumber:'',
    address:'',
    cnic:'',
    driverPrice:'',
  });setCarImage(null);
  setDriverImage(null); } } catch (error) {console.error('Error saving driver information:', error);
  setErrorMessage('Error saving  driver information.' );
}
}

  return (<div >
    <div className="max-w-2xl mx-auto">{errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <div className="mb-4">    <label className="block text-gray-700 text-sm font-bold mb-2">
          Car Name:</label>

          <input
            type="text"name="carName"
            value={formData.carName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required />
         </div> <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Car Model: </label>
          <input
            type="text"name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required   />
       
        </div> <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Doors:</label>
          <input
            type="number"name="doors"
            value={formData.doors}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required   />
        
        </div> <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Seats:</label>
          <input
            type="number"name="seats"
            value={formData.seats}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required    />
        
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Transmission</label>
        <div className="flex items-center">
          <input
            type="radio"
            name="transmission"
            value="Auto"
            checked={formData.transmission === 'Auto'}
            onChange={handleChange}
            className="mr-2 leading-tight"
            required
          />
          <span className="text-gray-700">Auto</span>
          <input
            type="radio"
            name="transmission"
            value="Manual"
            checked={formData.transmission === 'Manual'}
            onChange={handleChange}
            className="mr-2 leading-tight"
            required
          />
          <span className="text-gray-700">Manual</span>
          <input
            type="radio"
            name="transmission"
            value="Electric"
            checked={formData.transmission === 'Electric'}
            onChange={handleChange}
            className="mr-2 leading-tight"
            required
          />
          <span className="text-gray-700">Electric</span>
        </div>
      </div>   

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">AC</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="ac"
            checked={formData.ac}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
          <span className="text-gray-700">AC</span>
          <input
            type="checkbox"
            name="ac"
            checked={!formData.ac}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
          <span className="text-gray-700">Non AC</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
        <div className="flex items-center">
          <input
            type="radio"
            name="category"
            value="Economy"
            checked={formData.category === 'Economy'}
            onChange={handleChange}
            className="mr-2 leading-tight"
            required
          />
          <span className="text-gray-700">Economy</span>
          <input
            type="radio"
            name="category"
            value="Luxury"
            checked={formData.category === 'Luxury'}
            onChange={handleChange}
            className="mr-2 leading-tight"
            required
          />
          <span className="text-gray-700">Luxury</span>
          <input
            type="radio"
            name="category"
            value="Standard"
            checked={formData.category === 'Standard'}
            onChange={handleChange}
            className="mr-2 leading-tight"
            required
          />
          <span className="text-gray-700">Standard</span>
          <input
            type="radio"
            name="category"
            value="Commercial"
            checked={formData.category === 'Commercial'}
            onChange={handleChange}
            className="mr-2 leading-tight"
            required
          />
          <span className="text-gray-700">Commercial</span>
        </div>
      </div> 
       
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">No of Days</label>
        <input
          type="number"
          name="days"
          value={formData.days}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Theft Protection</label>
        <input
          type="checkbox"
          name="theftProtection"
          checked={formData.theftProtection}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Clean Interior/Exterior</label>
        <input
          type="checkbox"
          name="clean"
          checked={formData.clean}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
        <input
          type="file"
          name="carImage"
          onChange={handleFileChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div><div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div> <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">CNIC</label>
        <input
          type="text"
          name="cnic"
          value={formData.cnic}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div> 
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Driver Image</label>
        <input
          type="file"
          name="driverImage"
          
          onChange={handleFileChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Driver Price</label>
        <input
          type="number"
          name="driverPrice"
          value={formData.driverPrice}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </div>   

        

        
      </form>
    </div></div>
  );
};

export default DriverInformationForm;
