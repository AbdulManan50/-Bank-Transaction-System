const accountmodel = require("../models/account.model");

async function createAccountController(req, res) {
  const userId = req.user;

  const account = await accountmodel.create({ user: userId });

  res.status(201).json({ message: "Account created successfully", account });
}

module.exports = { createAccountController };
