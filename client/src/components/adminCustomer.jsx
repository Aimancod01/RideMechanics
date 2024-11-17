import React, { useState, useEffect } from 'react';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://localhost:5173/api/customers');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <div className="customer-list">
            {customers.map(customer => (
                <div key={customer._id} className="customer-card">
                    <h2>{customer.fullName}</h2>
                    <p>Phone: {customer.phone}</p>
                    <p>Email: {customer.email}</p>
                    {/* Add more fields as needed */}
                </div>
            ))}
        </div>
    );
};

export default CustomerList;
