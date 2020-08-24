const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const asyncWrapper = require("../middlewares/errorHandlers/asyncWrapper");
const requireLogin = require("../middlewares/requireLogin");
const requireGuest = require("../middlewares/requireGuest");
const { registerValidator, loginValidator } = require("../validation/auth");

const router = express.Router();

// Register
router.post(
  "/register",
  requireGuest,
  asyncWrapper(async (req, res) => {
    await registerValidator(req.body);

    const user = await new User(req.body).save();

    req.session.userId = user._id;

    res.json({ success: "User created" });
  })
);

// get current user
router.get(
  "/",
  requireLogin,
  asyncWrapper(async (req, res) => {
    const user = await User.findById(req.session.userId).select(
      "-password -__v -date"
    );
    res.json(user);
  })
);

// Login
router.post(
  "/login",
  requireGuest,
  asyncWrapper(async (req, res) => {
    await loginValidator(req.body);

    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ error: "something wrong happened" });
    }

    req.session.userId = user._id;
    return res.json({ success: "You are loggedin" });
  })
);

// Logout
router.get(
  "/logout",
  requireLogin,
  asyncWrapper(async (req, res) => {
    await req.session.destroy();
    res.send({ success: "ok" });
  })
);

module.exports = router;
