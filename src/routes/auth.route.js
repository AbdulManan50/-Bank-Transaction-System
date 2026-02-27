const express = require("express");
// const { userRegisterCOntroller } = require("../controllers/auth.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", authController.userRegisterCOntroller);
router.post("/login", authController.userLoginController);

module.exports = router;
