const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const userModel = mongoose.model("users");
  const transactionModel = mongoose.model("transactions");

  const UserData = await userModel
    .findOne({
      _id: req.user.id,
    })
    .sort("-createdAt")
    .select("remarks amount transaction_type")
    .limit(5);

  const getTransactions = await transactionModel.find({
    user_id: req.user._id,
  });

  // const balance = UserData.select("balance");
  res.status(400).json({
    success: "User Dashboard",
    data: UserData,
    transactions: getTransactions,
  });
};

module.exports = userDashboard;
