const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function userRegisterCOntroller(req, res) {
  try {
    const { email, name, password } = req.body;

    const isExisting = await usermodel.findOne({ email });

    if (isExisting) {
      return res.status(422).json({
        message: "Email already exists",
        status: "failed",
      });
    }

    const user = await usermodel.create({
      email,
      name,
      password,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token);

    res.status(201).json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}

async function userLoginController(req, res) {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: "email or password is incorrect",
        status: "failed",
      });
    }
}

module.exports = { userRegisterCOntroller, userLoginController };
