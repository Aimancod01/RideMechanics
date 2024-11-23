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

  speciality: {
    type: String,
    default: null,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
