const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// @route GET /
// @desc Get login page
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    // res.clearCookie("token", { path: "/" });
    res.clearCookie("token", { path: "/" });
    res.clearCookie("email", { path: "/" });
    res.render("login", { layout: false });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
