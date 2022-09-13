const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");

const getAllTask = async (req, res) => {
  try {
    const task = await Task.findAll({
      attributes: [
        "id",
        "userId",
        "title",
        "limitDate",
        "startDate",
        "finishDate",
        "status",
      ],
      include: [{ model: User, attributes: ["id", "name", "email"] }],
    });

    res.status(200).json({
      status: "Success",
      data: {
        task,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const getStatusTask = async (req, res) => {
  try {
    const { status } = req.params;
    const statusOption = ["active", "completed", "late", "cancelled"];

    if (!statusOption.includes(status)) {
      res.status(404).json({
        status: "Error",
        data: {
          message:
            "This params is no correct it has to be one of this [ active, completed, late or cancelled ]",
        },
      });
    }
    const taskStatus = await Task.findAll({ where: { status: status } });

    res.status(200).json({
      status: "Success",
      data: {
        taskStatus,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const createTask = async (req, res) => {
  try {
    const { userId, title, limitDate, startDate } = req.body;

    const newTask = await Task.create({ userId, title, limitDate, startDate });

    res.status(201).json({
      status: "Success",
      data: {
        newTask,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const updateTask = async (req, res) => {
  try {
    const { finishDate } = req.body;
    const { task } = req;

    const dateFinish = new Date(finishDate);

    if (dateFinish > task.limitDate) {
      await task.update({ finishDate, status: "late" });
      res.status(200).json({
        status: "success",
        data: {
          task,
        },
      });
    } else {
      await task.update({ finishDate, status: "completed" });

      res.status(200).json({
        status: "sucess",
        data: {
          task,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteTask = async (req, res) => {
  try {
    const { task } = req;

    await task.update({ status: "cancelled" });

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTask,
  getAllTask,
  getStatusTask,
  updateTask,
  deleteTask,
};
