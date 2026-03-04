const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");
const express = require("express");

const router = express.Router();

router.post(
  "/",
  authMiddleware.Middleware,
  accountController.createAccountController,
);

module.exports = router;
