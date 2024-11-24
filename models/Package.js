
import mongoose from'mongoose';
const packageSchema = new mongoose.Schema({
  packageName: { type: String, required: true },
  description:{type:String,required:true},
  departureDate:{type: Date,required:true},
  departureTime:{type:String,required:true},
  arrivalDate:{type: Date,required:true},
  arrivalTime:{type:String,required:true},
  price: { type: Number, required: true },
 location:{type: String, required: false},
 picture: { type: String, required: false }, // File name of the uploaded picture
});

export default  mongoose.model('Package', packageSchema);