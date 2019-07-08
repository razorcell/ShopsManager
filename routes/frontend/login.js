const express = require("express");
const router = express.Router();

// @route GET /
// @desc Get login page
// @access Public
router.get("/", async (req, res) => {
  try {
    res.render("login", { layout: false });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
