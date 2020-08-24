const express = require("express");

const { asyncWrapper, requireLogin, requireGuest } = require("../middlewares");

const router = express.Router();

const { register, getUser, login, logout } = require("../controllers/auth");

// Register
router.post("/register", requireGuest, asyncWrapper(register));

// get current user
router.get("/", requireLogin, asyncWrapper(getUser));

// Login
router.post("/login", requireGuest, asyncWrapper(login));

// Logout
router.get("/logout", requireLogin, asyncWrapper(logout));

module.exports = router;
