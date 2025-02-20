import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [100, 'Title can not exceed 100 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true, // Asegura que el slug sea único
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description can not exceed 500 characters'],
  },
  section: {
    type: String,
    minlength: [2, 'Section is required'],
    required: [true, 'Section is required'],
  },
  authors: {
    type: String,
    required: [true, 'Author is required'],
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  date: {
    type: Date,
    default: Date.now, // Pasa la función sin paréntesis
  },
  status: {
    type: String,
    required: true,
    enum: [
      "draft",
      "published",
      "unpublished",
      "archived",
      "pending",
      "scheduled",
      "deleted"
    ],
    default: "draft", // Cambié el valor por defecto a "draft" para mayor coherencia
  },
  
});

// Verifica si el modelo ya está definido para evitar duplicados
const ArticleModel = mongoose.models.article || mongoose.model("article", ArticleSchema);

export default ArticleModel;
