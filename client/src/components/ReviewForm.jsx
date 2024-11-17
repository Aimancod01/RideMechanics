import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';import MapComponent from './MapComponent';
const ReviewForm = () => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]); 
   // You can set this dynamically as needed
   const [carId, setCarId] = useState(''); // You can set this dynamically as needed
   const [customerId, setCustomerId] = useState('');
   useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${carId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (carId) {
      fetchReviews();
    }
  }, [carId]);
// Handle form submission
   const handleSubmit = async (event) => {
    event.preventDefault();
    if (!carId || !customerId) {
        console.error('Car ID or Customer ID is missing');
        return;
      }
    try {
      const response = await axios.post('http://localhost:5000/api/submit-review', {
        carId,
        customerId,
        rating: Number(rating),
        comment,
      });

      if (response.data.success) {
        console.log('Review submitted successfully');
        // Handle successful review submission here (e.g., redirect or show a success message)
        const fetchReviews = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/api/reviews/${carId}`);
              setReviews(response.data);
            } catch (error) {
              console.error('Error fetching reviews:', error);
            }
          };
          fetchReviews();
          setRating('');
        setComment('');
          } else {
        console.error('Review submission failed');
      }
    } catch (error) {
      console.error('Error submitting review:', error.response ? error.response.data : error.message);
    }
  };

  return (<div>
      <h1 className="text-2xl font-bold">Submit Your Review</h1>
    <form onSubmit={handleSubmit}>
      
        <label >Rating (1-5):
        <input
          type="number"
          
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </label>
      
        <label >Comment:
        <textarea
         
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit Review</button>
    </form><h2 className="text-xl font-bold mt-6">Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review._id} className="border p-2 mb-2">
            <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Comment:</strong> {review.comment}</p>
          </li>
        ))}
      </ul> </div>
  );
};

export default ReviewForm;
