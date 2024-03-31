const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./modules/users/users.routes");
const incomeRouter = require("./modules/income/income.routes");
const expensesRouter = require("./modules/expenses/expenses.routes");

require("dotenv").config();

const app = express();
app.use(express.json());
const mongo_connect = process.env.mongo_connect; // connectiong with the .env file

// Models
require("./models/users.models");
require("./models/transactions.models");

mongoose
  .connect(mongo_connect, {})
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.log("Connection with the Database failed", error);
  });

// ROUTES
app.use("/users", userRouter);
app.use("/income", incomeRouter);
app.use("/expense", expensesRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
