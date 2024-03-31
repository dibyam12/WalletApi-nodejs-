const express = require("express");
const auth = require("../../middlewares/auth");
const addExpense = require("./controllers/addExpense");

const expensesRouter = express.Router();
expensesRouter.use(auth);

expensesRouter.post("/add-expense", addExpense);

module.exports = expensesRouter;
