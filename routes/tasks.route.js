const express = require("express");

const tasksRouter = express.Router();

const {taskExist} = require('../middlewares/task.middleware')

const {
  createTask,
  deleteTask,
  getAllTask,
  getStatusTask,
  updateTask,
} = require("../controllers/task.controller");

tasksRouter.get("/", getAllTask);

tasksRouter.get("/:status", getStatusTask);

tasksRouter.post("/", createTask);

tasksRouter.patch("/:id", taskExist, updateTask);

tasksRouter.delete("/:id", taskExist, deleteTask);

module.exports = { tasksRouter };
