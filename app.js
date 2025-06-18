const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.disable('x-powered-by');

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/", require("./routes/index"));
app.use("/api/recipes/", require("./routes/recipes"));

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("MongoDB подключен успешно");
  })
  .catch((err) => {
    console.error("Ошибка подключения к MongoDB:", err);
  });

module.exports = app;
