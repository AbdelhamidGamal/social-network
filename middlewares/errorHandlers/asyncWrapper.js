module.exports = callback => (req, res, next) => {
  callback(req, res).catch(next);
};
