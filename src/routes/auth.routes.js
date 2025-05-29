const express = require("express");
const router = express.Router();
const { validateRegister } = require("../middlewares/validation");

const jwt = require("jsonwebtoken");
const authController = require("../controllers/auth.controller");
router.post("/register", validateRegister, authController.register);
router.post("/login", validateRegister, authController.login);
module.exports = router;
