const winston = require("winston");
const expressWinston = require("express-winston");
const path = require("path");

// Formato JSON y timestamps
const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

// Middleware para registrar solicitudes (request.log)
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join("logs", "request.log"),
    }),
  ],
  format: jsonFormat,
});

// Middleware para registrar errores (error.log)
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join("logs", "error.log"),
    }),
  ],
  format: jsonFormat,
});

module.exports = {
  requestLogger,
  errorLogger,
};
