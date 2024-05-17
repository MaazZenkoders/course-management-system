const express = require("express");
const authController = require("../controllers/auth.controller")
const authRouter = express.Router();

authRouter.post('/signup',authController.signupHandler)
authRouter.post('/login',authController.loginHandler)

module.exports = authRouter