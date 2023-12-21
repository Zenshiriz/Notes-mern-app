require("dotenv").config();
const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password, salt);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "This user already exists" });
    }

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword,
    });
    const data = {
      user: {
        id: user._id,
      },
    };
    const authToken = await jwt.sign(data, process.env.JWT_SECRET);
    return res.json({success:true, authToken, userName: user.name });
  } catch (error) {
    console.log("There was an error", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "please try to login with correct credentials",
        });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({
          success: false,
          message: "please try to login with correct credentials",
        });
    }
    const data = {
      user: {
        id: user._id,
      },
    };
    const authToken = await jwt.sign(data, process.env.JWT_SECRET);
    return res.json({success:true, authToken, userName:user.name});
  } catch (error) {
    console.log("There was an error", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const getUser = async (req, res) => {
  try {
  
    const userId = req.user.id
    const user =  await User.findById(userId).select("-password")
    res.send(user);
  }catch (error) {
      console.log("There was an error", error);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  };

module.exports = { registerUser, loginUser,getUser };
