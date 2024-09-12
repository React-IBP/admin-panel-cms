import mongoose from "mongoose";
const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  active: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// Create or retrieve the model from the existing connection or create a new one if it doesn't exist.
const subscriptionModel =
  mongoose.models.subscription || mongoose.model("subscription", Schema);
export default subscriptionModel;
