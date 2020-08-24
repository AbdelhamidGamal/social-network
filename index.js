const express = require("express");
const config = require("./config");

const app = express();

// setup session
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

// DB connection
const mongoose = require("mongoose");

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// midilewares
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/post", require("./routes/posts"));
app.use("/api/profile", require("./routes/profiles"));
app.use("/api/user", require("./routes/users"));

// Catch errors
app.use(require("./middlewares/errorHandlers/catchErros"));
app.use(require("./middlewares/errorHandlers/notFound"));

// Listen on port
app.listen(config.PORT, () =>
  console.log(`app is running on port ${config.PORT}`)
);
