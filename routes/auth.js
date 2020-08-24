const express = require("express");

const asyncWrapper = require("../middlewares/errorHandlers/asyncWrapper");
const requireLogin = require("../middlewares/requireLogin");
const requireGuest = require("../middlewares/requireGuest");

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
