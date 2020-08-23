const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();

// DB connection
mongoose.connect("mongodb://localhost/devcon", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// midilewares
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/post", require("./routes/post"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/user", require("./routes/user"));

// Listen on port
app.listen(config.PORT, () =>
  console.log(`app is running on port ${config.PORT}`)
);
