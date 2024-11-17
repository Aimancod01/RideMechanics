// models/Package.js
import mongoose from'mongoose';

const carInfoSchema = new mongoose.Schema({
  carName: { type: String, required: false },
  model: { type: String, required: false },
  color: { type: String, required: false },
  seater: { type: Number, required: false },
});

const packageSchema = new mongoose.Schema({
  packageName: { type: String, required: false },
  price: { type: Number, required: false },
  date: { type: Date, required: false },
  timing: { type: String, required: false },
  carInfo: carInfoSchema,
  picture: { type: String, required: false }, // File name of the uploaded picture
});

export default  mongoose.model('Package', packageSchema);