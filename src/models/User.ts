import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: { type: String },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
