const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Shop = require("../../models/Shop");

// @route GET /
// @desc Get Home Page
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    //generate dummy stores
    let shops_array = [];
    for (let i = 0; i < 12; i++) {
      shops_array.push({
        name: `Shop${i}`,
        distance: i * (Math.floor(Math.random() * 100) + 10)
      });
    }
    //Sort the array by distance
    shops_array.sort((a, b) => (a.distance > b.distance ? 1 : -1));
    //Filter existing shops against the database
    var filtered_shops = await filter(shops_array, async shop_name => {
      let shop = await Shop.findOne({
        user: req.user.id,
        name: shop_name.name
      });
      if (shop) return false;
      return true;
    });
    res.render("index", {
      title: "Nearby Shops",
      shops_array: filtered_shops,
      email: req.cookies["email"]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

async function filter(arr, callback) {
  const fail = Symbol();
  return (await Promise.all(
    arr.map(async item => ((await callback(item)) ? item : fail))
  )).filter(i => i !== fail);
}

module.exports = router;
