import React, { useState, useEffect } from 'react';
import axios from 'axios';
const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

        
    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };
       

    return (
        <div className="customer-list">
            {customers.map(customer => (
                <div key={customer._id} className="customer-card">
                    <h2>{customer.fullName}</h2>
                    <p>Phone: {customer. contactNumber}</p>
                    <p>Email: {customer.email}</p><p>cnic: {customer.cnic}</p><p>Email: {customer.address}</p>
                    {/* Add more fields as needed */}
                </div>
            ))}
        </div>
    );
};

export default CustomerList;
