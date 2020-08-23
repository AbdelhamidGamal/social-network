const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json({ hi: "user route" }));

module.exports = router;
