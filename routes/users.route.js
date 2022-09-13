const express = require("express");

const usersRouter = express.Router();

const {userExist} = require('../middlewares/user.middleware')

const {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} = require("../controllers/user.controller");

const {createUserValidators} = require('../middlewares/validators.middlewares')

usersRouter.get("/", getUser);

usersRouter.post("/", createUserValidators, createUser);

usersRouter.patch("/:id", userExist, updateUser);

usersRouter.delete("/:id", userExist, deleteUser);

module.exports = { usersRouter };
