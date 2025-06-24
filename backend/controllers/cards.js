const Card = require("../models/card");

// Obtener todas las tarjetas
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).json({ message: "Error del servidor" }));
};

// Crear nueva tarjeta
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Datos inválidos" });
      }
      res.status(500).json({ message: "Error del servidor" });
    });
};

// Eliminar tarjeta por ID
const deleteCard = (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => new Error("NotFound"))
    .then((card) => {
      if (card.owner.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "No tienes permiso para eliminar esta tarjeta" });
      }

      return Card.findByIdAndDelete(cardId).then(() =>
        res.send({ message: "Tarjeta eliminada correctamente" })
      );
    })
    .catch((err) => {
      if (err.message === "NotFound") {
        return res.status(404).json({ message: "Tarjeta no encontrada" });
      }
      if (err.name === "CastError") {
        return res.status(400).json({ message: "ID de tarjeta inválido" });
      }
      res.status(500).json({ message: "Error del servidor" });
    });
};

// Dar like a una tarjeta
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // agrega like si no está
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: "Tarjeta no encontrada" });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "ID de tarjeta inválido" });
      }
      res.status(500).json({ message: "Error del servidor" });
    });
};

// Quitar like a una tarjeta
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // quita el like
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: "Tarjeta no encontrada" });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "ID de tarjeta inválido" });
      }
      res.status(500).json({ message: "Error del servidor" });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
