const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json({ hi: "post route" }));

module.exports = router;
