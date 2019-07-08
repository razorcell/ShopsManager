const jwt = require("jsonwebtoken");
const config = require("config");

//Middleware to test Authentication

module.exports = function(req, res, next) {
  // Get token from the header
  // const token = req.header("x-auth-token");
  const token = req.cookies["token"];
  // console.log(token);
  //Check if no token
  if (!token) {
    // return res.status(401).json({ msg: 'No token, ACCESS DENIED' });
    return res.redirect(307, "/login");
    // return res.render("login");
  }
  try {
    //Verify and decode the token
    const decoded_token = jwt.verify(token, config.get("jwtSecret"));
    //Token is not valid error will be trown and catched at the bottom
    //else get the user id from the token and let the request continue through the route
    req.user = decoded_token.user;
    console.log(`User:`);
    console.log(req.user);
    next();
  } catch (err) {
    // res.status(401).json({ msg: "Token is not valid" });
    return res.redirect("/login");
  }
};
