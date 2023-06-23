const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.post("/register", authController.register);

router.get("/register", authController.getRegister);

router.post("/login", authController.login);

router.get("/login", authController.getLogin);

router.get("/logout", authController.logout);

module.exports = router;
