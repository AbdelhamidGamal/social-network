const express = require("express");
const router = express.Router();

const { requireLogin, asyncWrapper } = require("../middlewares/");

const {
  getMe,
  createOrEdit,
  getAll,
  getByid,
  deleteProfile,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation
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

// add user experince
router.put("/experience", requireLogin, asyncWrapper(addExperience));

// delete user experince
router.delete("/experience/:id", requireLogin, asyncWrapper(deleteExperience));

// add education
router.put('/education', requireLogin, asyncWrapper(addEducation) )

// delete education
router.delete('/education/:id', requireLogin, asyncWrapper(deleteEducation) )

module.exports = router;
