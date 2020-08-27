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

    res.json({ profiles });
  },

  async getByid(req, res) {
    const profile = await Profile.findOne({ user: req.params.id }).populate(
      "user",
      "name"
    );

    if (!profile) {
      return res.status(400).json({ error: "Not Found" });
    }

    res.json({ profile });
  },

  async deleteProfile(req, res) {
    await Profile.findOneAndDelete({ user: req.session.userId });
    await User.findByIdAndDelete(req.session.userId);
    logout(req);
    res.send({ success: "Deleted" });
  }
};
