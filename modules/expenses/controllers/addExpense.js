const mongoose = require("mongoose");

const addExpense = async (req, res) => {
  const Users = mongoose.model("users");

  const { amount, remarks } = req.body;

  //validations

  try {
    if (!amount) throw "Please input amount";
    if (!remarks) throw "Please input remarks";
    if (amount < 1) throw "Amount should be greater than 1";
    if (remarks.len < 3) throw "remarks should be more than 3 words";
  } catch (error) {
    return res.status(400).json({
      status: "Failed",
      error,
    });
  }
  // Success

  try {
    // Create Transaction History
    await Transactions.create({
      amount: amount,
      remarks: remarks,
      user_id: req.user._id,
      transaction_type: "expense",
    });

    // update the users account
    await Users.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: {
          balance: amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } catch (error) {
    return res.status(400).json({
      status: "Database error",
      error,
    });
  }

  res.status(200).json({
    status: "Expense is updated",
    amount,
    remarks,
  });
};

module.exports = addExpense;
