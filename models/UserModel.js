import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  userType: {
    type: String,
    enum: ["user", "mechanic"],
    default: "user",
  },
  title: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },

  speciality: {
    type: String,
    default: null,
  },
  lat: {
    type: Number,
    default: null, // Stores the latitude of the mechanic
  },
  lng: {
    type: Number,
    default: null, // Stores the longitude of the mechanic
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
