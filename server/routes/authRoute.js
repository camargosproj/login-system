const express = require("express");
const {userLogin, userRegister} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/register", userRegister);


authRouter.post("/login", userLogin);

module.exports = {authRouter};

