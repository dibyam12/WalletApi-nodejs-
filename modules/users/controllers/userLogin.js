const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userLogin = async (req, res) => {
  const users = mongoose.model("users");

  const { email, password } = req.body;

  //validations
  try {
    if (!email) {
      throw "please provide an email";
    }

    if (!password) {
      throw "please provide a password";
    }

    const getUser = await users.findOne({ email: email });

    if (!getUser) {
      throw "Invalid Email";
    }

    const matched = await bcrypt.compare(password, getUser.password);

    if (!matched) throw " Invalid Password ";
  } catch (e) {
    return res.status(400).json({
      status: "Failed",
      message: e,
    });
  }

  const userForAccessToken = await users.findOne({
    email,
  });

  const accessToken = jwt.sign(
    // jwt vaneko  logged in credentials store garney userko ra securly data haru transfer garney
    {
      //Payload
      id: userForAccessToken._id,
      email: userForAccessToken.email,
      name: userForAccessToken.name,
    },
    process.env.jwt_salt, //string used for verification if the data has been tampered or not
    { expiresIn: "90 days" }
  );

  res.status(200).json({
    status: "User Logged in Successfully",
    accessToken,
  });
};

module.exports = userLogin;
