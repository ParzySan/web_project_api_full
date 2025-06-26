const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

const { celebrate, Joi } = require("celebrate");
const { validateURL } = require("../utils/validators.js");

// GET /users
router.get("/", getAllUsers);

router.get("/me", getCurrentUser);

// GET /users/:userId
// router.get("/:userId", getUserById);
// router.get(
//   "/:userId",
//   celebrate({
//     params: Joi.object().keys({
//       userId: Joi.string().length(24).hex().required(),
//     }),
//   }),
//   getUserById
// );

// POST /users
// router.post("/", createUser);
// Patch /profile
router.patch(
  "/user/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateProfile
);
// Patch /avatar
router.patch(
  "/user/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar
);

module.exports = router;
