import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  credentialGoogle: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/,
  },
  roll: {
    type: String,
    required: true,
    enum: ["admin", "editor", "reader", "writer", "file"],
    default: "reader",
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// Middleware de Mongoose para encriptar la contraseña antes de guardarla 
Schema.pre('save', async function (next) { 
  if (!this.isModified('password')) return next(); // Si la contraseña no ha sido modificada, continúa

  try {
    const salt = await bcrypt.genSalt(10); // Genera una sal con un factor de costo de 10
    this.password = await bcrypt.hash(this.password, salt); // Encripta la contraseña
    next(); // Continua con el siguiente middleware
  } catch (err) {
    next(err); // Maneja cualquier error
  }
});

const UserModel = mongoose?.models?.user || mongoose.model("user", Schema);

export default UserModel;
