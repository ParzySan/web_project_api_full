const mongoose = require("mongoose");
const validator = require("validator");

const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Explorador",
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://images.pexels.com/photos/2816903/pexels-photo-2816903.jpeg",
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: (props) =>
        `${props.value} no es un enlace válido para un avatar.`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Correo electrónico no válido",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model("User", userSchema);
