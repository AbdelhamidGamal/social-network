const requireLogin = require("./requireLogin");
const requireGuest = require("./requireGuest");
const errorHandlers = require("./errorHandlers");

module.exports = {
  requireLogin,
  requireGuest,
  ...errorHandlers
};
