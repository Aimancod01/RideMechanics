// TrackingPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import MapComponent from '../Admin/MapComponent';

const TrackingPage = () => {
  const { carId } = useParams();

  return (
    <div>
      <MapComponent carId={carId} />
    </div>
  );
};

export default TrackingPage;