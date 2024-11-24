import mongoose from 'mongoose';

const TourCustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  cnic: { type: String, required: true }, // CNIC or unique identifier
  address: { type: String, required: true },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package', // Reference to the Package model
    required: true,
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

export default mongoose.model('TourCustomer', TourCustomerSchema);
