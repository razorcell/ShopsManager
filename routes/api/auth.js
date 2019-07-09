const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// @route GET api/auth
// @desc Test Auth token
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/auth
// @desc Login a user using email and password
// @access Public
router.post(
  "/",
  //Input Validation integration
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required !").exists()
  ],
  //Answer login request
  async (req, res) => {
    //Validate the input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check provided credentials
    const { email, password } = req.body;
    try {
      //Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials !" }] });
      }
      //Check password is correct
      const isMatch = await bycrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials !" }] });
      }
      //If correct create a token and send it back so user can use it to browse the website
      const payload = {
        user: {
          id: user.id
        }
      };
      //Build the JWT
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 9000000 },
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, {
            expires: new Date(Date.now() + 9000000)
          });
          res.cookie("email", email, {
            expires: new Date(Date.now() + 9000000)
          });
          //Redirect the User to the Home page
          res.redirect("/");
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
