const User = require("../../models/user");

module.exports = {
  create(data) {
    return new User(data).save();
  },

  get(id) {
    return User.findById(id).select("-password -__v -date");
  },

  findOne(email) {
    return User.findOne({ email });
  }
};
