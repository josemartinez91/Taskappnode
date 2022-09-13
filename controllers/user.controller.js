const { User } = require("../models/user.model");
const { Task } = require("../models/task.model");

const getUser = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: "active" },
      attributes: ["id", "name", "email"],
      include: [
        {
          model: Task,
          attributes: [
            "id",
            "userId",
            "title",
            "limitDate",
            "startDate",
            "finishDate",
            "status",
          ],
        },
      ],
    });

    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      status: "Success",
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { user } = req;

    await user.update({ name, email });

    res.status(200).json({
      status: "Success",
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await user.update({ status: "Delete" });

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser, getUser, updateUser, deleteUser };
