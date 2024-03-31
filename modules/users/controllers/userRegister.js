const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  const users = mongoose.model("users");

  const { name, email, password, address, balance } = req.body;

  //Creation code
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const createUser = await users.create({
      name,
      email,
      password: encryptedPassword,
      balance,
      address,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error while creating user",
      message: error,
    });
  }
  res.status(200).json({
    status: "Register",
  });
};

module.exports = userRegister;
