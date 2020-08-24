const config = require("../config");

module.exports = app => {
  const session = require("express-session");
  const redis = require("redis");

  let RedisStore = require("connect-redis")(session);
  let redisClient = redis.createClient({
    auth_pass: config.redisSecret
  });

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: config.sessionSecret,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      resave: false,
      saveUninitialized: false
    })
  );
};
