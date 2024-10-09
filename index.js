require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const logger = require("morgan");
const { dbConnect } = require("./config/db.config");
dbConnect();

app.use(
  express.json({
    extended: false,
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 50000,
  })
);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

let server = require("http").createServer(app);

app.use(logger("dev"));

require("./routes/index.routes")(app);


server.listen(process.env.PORT || 3001, () => {
  console.log("Node Server Started Successfully ✅ 💯");
});
