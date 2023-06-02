const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const register = async (req, res) => {
  try {
    console.log(req.body);
    const isexist = await User.findOne({ email: req.userName });
    if (isexist) {
      return res.status(301).json({
        status: fail,
        msg: "User name already in use",
      });
    }
    const encryptedPass = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: encryptedPass,
    });
    const token = jwt.sign(
      { name: newUser.userName, id: newUser._id },
      process.env.SECRECT
    );
    res.status(201).json({
      status: "success",
      data: {
        token,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err,
    });
  }
};

const login = async (req, res) => {
  try {
    const existUser = await User.findOne({ userName: req.body.userName });
    if (!existUser) {
      return res.status(404).json({
        status: "fail",
        msg: "User not found",
      });
    }

    const passMatch = await bcrypt.compare(
      req.body.password,
      existUser.password
    );
    if (!passMatch) {
      return res.status(404).json({
        status: "fail",
        msg: "invalid password",
      });
    }

    const token = jwt.sign(
      { name: existUser.userName, id: existUser._id },
      process.env.SECRECT
    );
    res.status(201).json({
      status: "success",
      data: {
        token,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err,
    });
  }
};
module.exports = { register, login };
