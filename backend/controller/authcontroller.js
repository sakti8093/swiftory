const { userModel } = require("../models/usermodel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(422).send({
        success: false,
        message: "please provide username and password",
      });
    }

    const user = await userModel.findOne({ username });
    if (!user?.username) {
      return res.status(401).send({
        success: false,
        message: "user not exists",
      });
    }
    console.log(user, "user");
    const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    const token = await jwt.sign(user.toJSON(), process.env.SECRET);
    if (isPasswordCorrect) {
      return res.status(200).send({
        success: true,
        token: token,
        data: {
          username: user.username,
        },
      });
    } else {
      return res.status(401).send({
        success: true,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error?.message || "internal server error",
    });
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(422).send({
        success: false,
        message: "please provide username and password",
      });
    }

    const user = await userModel.findOne({ username });
    const encryptedPassword = await bcrypt.hash(password, 10);

    if (user?.username) {
      return res.status(409).send({
        success: false,
        message: "user already exists",
      });
    }

    await userModel.create({ username, password: encryptedPassword });

    return res.json({
      sucess: true,
      message: "user successfully registered",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error?.message || "internal server error",
    });
  }
};

module.exports = {
  login,
  register,
};
