const express = require("express");
const config = require("./config");

const app = express();

// setup session
require("./loaders/sessionSetup")(app);

// DB connection
require("./loaders/dbInit");

// midilewares
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/post", require("./routes/posts"));
app.use("/api/profile", require("./routes/profiles"));

// Catch errors
app.use(require("./middlewares/errorHandlers/catchErros"));
app.use(require("./middlewares/errorHandlers/notFound"));

// Listen on port
app.listen(config.PORT, () =>
  console.log(`app is running on port ${config.PORT}`)
);
