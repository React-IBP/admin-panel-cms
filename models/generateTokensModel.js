import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },

  tokenRevovery: {
    type: String,
    required: true, 
  },

  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

 

const generateTokensModel = mongoose?.models?.tokens || mongoose.model("tokens", Schema);

export default generateTokensModel;
