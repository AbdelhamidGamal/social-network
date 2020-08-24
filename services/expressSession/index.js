module.exports = {
  login(req, id) {
    return (req.session.userId = id);
  },

  logout(req) {
    return req.session.destroy();
  }
};
