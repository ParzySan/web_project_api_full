const express = require("express");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const mongoose = require("mongoose");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const { celebrate, Joi, errors } = require("celebrate");
const { validateURL } = require("./utils/validators.js");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const path = require("path");
var cors = require("cors");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const { NODE_ENV, JWT_SECRET } = process.env;

const secret = NODE_ENV === "production" ? JWT_SECRET : "dev-secret";
// app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conectado a MongoDB exitosamente");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
  });

app.use(express.json());
app.use(requestLogger);
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
//teste crash quitar despues de pasar el sprint
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

// Validar /signup
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
    }),
  }),
  createUser
);

// Validar /signin
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

// Rutas orotegidas
app.use(auth);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Ruta para recursos no encontrados
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

// app.use(express.static(path.join(__dirname, "../frontend/dist")));

// // Después de tus rutas API
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
