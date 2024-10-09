const botRouter = require("./bot.routes");

module.exports = (app) => {
    app.get("/", (req, res) => {
      res.status(200).send({
        message: "Welcome to  API",
      });
    });

    app.use("/bot", botRouter);

  };
  