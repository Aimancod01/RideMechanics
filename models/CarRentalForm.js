
import mongoose from "mongoose";
  const CarSchema = new mongoose.Schema({
    carName: { type: String, required: true },
    carModel: { type: String, required: true },
    doors: { type: Number, required: true },
    seats: { type: Number, required: true },
    transmission: { type: String, enum: ['Auto', 'Manual', 'Electric'], required: true },
    ac: { type: Boolean, required: true },
    category: { type: String, enum: ['Economy', 'Luxury', 'Standard', 'Commercial'], required: true },
    price: { type: Number, required: true },
    days: { type: Number, required: true },
    theftProtection: { type: Boolean, required: true },
    clean: { type: Boolean, required: true },
    image: { type: String, required: true },
  });
  
  const DriverSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    cnic: { type: String, required: true },
    driverPrice: { type: Number, required: true },
    car: { type: CarSchema, required: true },
    image: { type: String, required: true },
  });
  
  export const Driver = mongoose.model('Driver', DriverSchema);  