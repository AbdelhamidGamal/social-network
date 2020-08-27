const express = require("express");
const router = express.Router();

const { requireLogin, asyncWrapper } = require("../middlewares/");

const {
  getMe,
  createOrEdit,
  getAll,
  getByid,
  deleteProfile
} = require("../controllers/profile");

// get logged in user profile info
router.get("/me", requireLogin, asyncWrapper(getMe));

//create or edit logged in user profile
router.post("/", requireLogin, asyncWrapper(createOrEdit));

// get all profiles
router.get("/", asyncWrapper(getAll));

// get a profile by user id
router.get("/user/:id", asyncWrapper(getByid));

// Delete profile, user, posts for logged in user
router.delete("/", requireLogin, asyncWrapper(deleteProfile));

module.exports = router;
