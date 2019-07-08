const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const Shop = require("../../models/Shop");

// @route PUT api/shop
// @desc Add a favorite Shop for a User
// @access Private
router.put("/", auth, async (req, res) => {
  console.log("Data sent : ");
  console.log(req.body);
  const { name, distance, status } = req.body;
  const user = req.user.id;

  try {
    //Check if shop exists for this user as Liked or disliked
    var filter = { user: user, name: name };
    let shop = await Shop.findOne(filter);
    if (shop) {
      console.log("exists");
      //Update and return
      var update = { status: status };
      shop = await Shop.findOneAndUpdate(filter, update, { new: true });
      console.log("returned data");
      console.log(shop);
      return res.json(shop);
    }
    //Add new shop as liked or disliked
    let new_shop = new Shop({
      user,
      name,
      distance,
      status
    });
    await new_shop.save();
    res.send(`Shop  "${name}"  added as "${status}"`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
