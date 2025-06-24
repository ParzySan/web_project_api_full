const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    maxlength: [30, "El nombre debe tener como máximo 30 caracteres"],
  },
  link: {
    type: String,
    required: [true, "El enlace es obligatorio"],
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www\.)?[\w\-~:/?#[\]@!$&'()*+,;=.%]+#?$/.test(v);
      },
      message: "El enlace no es válido",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
