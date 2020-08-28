const User = require("../models/user");
const Profile = require("../models/profile");
const { logout } = require("../services/expressSession");

module.exports = {
  async getMe(req, res) {
    const profile = await Profile.findOne({
      user: req.session.userId
    }).populate("user", "name");

    if (!profile) {
      return res.status(400).json({ error: "create a profile first" });
    }

    return res.json({ success: profile });
  },

  async createOrEdit(req, res) {
    let profile = await Profile.findOne({ user: req.session.userId });

    if (profile) {
      await Profile.findOneAndUpdate({ user: req.session.userId }, req.body);

      return res.json({ success: profile });
    }

    profile = await new Profile({
      ...req.body,
      user: req.session.userId
    }).save();

    return res.json({ success: profile });
  },

  async getAll(req, res) {
    const profiles = await Profile.find().populate("user", "name");

    return res.json({ profiles });
  },

  async getByid(req, res) {
    const profile = await Profile.findOne({ user: req.params.id }).populate(
      "user",
      "name"
    );

    if (!profile) {
      return res.status(400).json({ error: "Not Found" });
    }

    return res.json({ profile });
  },

  async deleteProfile(req, res) {
    await Profile.findOneAndDelete({ user: req.session.userId });
    await User.findByIdAndDelete(req.session.userId);
    logout(req);
    return res.send({ success: "Deleted" });
  },

  async addExperience(req, res) {
    const profile = await Profile.findOne({ user: req.session.userId });
    profile.experince.unshift(req.body);
    await profile.save();

    return res.json({ profile });
  },

  async deleteExperience(req, res) {
    const profile = await Profile.findOne({ user: req.session.userId });

    profile.experince = profile.experince.filter(
      exp => exp._id.toString() !== req.params.id
    );

    await profile.save();

    return res.json({ profile });
  },

  async addEducation(req,res){
    const profile = await Profile.findOne({ user: req.session.userId });
    profile.education.unshift(req.body);
    await profile.save();

    return res.json({ profile });
  },

  async deleteEducation(req,res){
    const profile = await Profile.findOne({ user: req.session.userId });

    profile.education = profile.education.filter(
      exp => exp._id.toString() !== req.params.id
    );

    await profile.save();

    return res.json({ profile });
  }
};
