const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// GET /users
exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

// POST /users
exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10) // nivel de sal = 10
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
      } else if (err.code === 11000) {
        err.statusCode = 409;
        err.message = "El correo ya está registrado";
      }
      next(err);
    });
};

// POST /users
// exports.createUser = (req, res) => {
//   const { name, about, avatar, email, password } = req.body;

//   User.create({ name, about, avatar, email, password })
//     .then((user) => {
//       const userWithoutPassword = user.toObject();
//       delete userWithoutPassword.password;
//       res.status(201).send(userWithoutPassword);
//     })
//     .catch((err) => {
//       if (err.name === "ValidationError") {
//         res
//           .status(400)
//           .send({ message: "Datos inválidos", error: err.message });
//       } else if (err.code === 11000) {
//         res.status(409).send({ message: "El correo ya está registrado" });
//       } else {
//         res
//           .status(500)
//           .send({ message: "Error del servidor", error: err.message });
//       }
//     });
// };

// PATCH /users/me — actualizar perfil (name, about)
exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
      }
      next(err);
    });
};

// PATCH /users/me/avatar — actualizar avatar
exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "URL de avatar inválida";
      }
      next(err);
    });
};

const { NODE_ENV, JWT_SECRET = "dev-secret" } = process.env;

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const err = new Error("Usuario o contraseña incorrectos");
        err.statusCode = 401;
        throw err;
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const err = new Error("Usuario o contraseña incorrectos");
          err.statusCode = 401;
          throw err;
        }

        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          { expiresIn: "7d" }
        );

        res.send({ token });
      });
    })
    .catch(next);
};
exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const err = new Error("Usuario no encontrado");
        err.statusCode = 404;
        return next(err);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID de usuario no válido";
      }
      next(err);
    });
};
