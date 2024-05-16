const express = require("express");
const authController = require("../controllers/auth.controller")
const authRouter = express.Router();

authRouter.post('/signup',authController.signupHandler)

module.exports = authRouter