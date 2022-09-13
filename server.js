const { db } = require("./utils/database.util");
const { app } = require("./app");
const { initModels } = require("./models/initModels");

const startServer = async () => {
  try {
    await db.authenticate();

    initModels();

    await db.sync();

    const PORT = 4000;

    app.listen(PORT, () => {
      console.log("Express server onlinde");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
