module.exports = {
  PORT: process.env.PORT || 5000,
  mongoURI: process.env.MONGOURI || "mongodb://localhost/devcon",
  sessionSecret: process.env.SESSIONSECRET || "sdhasjkdhasdgasuydasd",
  redisSecret: process.env.REDISSECRET || "secret",
  bcryptSaltRounds: 10,
};
