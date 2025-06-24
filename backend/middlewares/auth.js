const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET = "dev-secret" } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(403)
      .send({ message: "Acceso denegado: token requerido" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    return res.status(403).send({ message: "Token inválido o expirado" });
  }

  req.user = payload;
  next();
};
