const User = require("../../models/user");

module.exports = {
  create(data) {
    return new User(data).save();
  },

  getById(id) {
    return User.findById(id).select("-password -__v -date");
  },

  getByEmail(email) {
    return User.findOne({ email });
  }
};
