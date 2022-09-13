const express = require("express");
const { usersRouter } = require("./routes/users.route");
const { tasksRouter } = require("./routes/tasks.route");

const app = express();

app.use(express.json());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/tasks", tasksRouter);

app.all("*", (req, res) => {
  const { method, url } = req;

  res.status(404),
    json({
      status: "error",
      data: {
        message: `${method} or ${url} does not exist on our server`,
      },
    });
});

module.exports = { app };
