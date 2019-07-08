const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Shop = require("../../models/Shop");

// @route GET /
// @desc Get Home Page
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    //get favorite shops for this user
    let favorite_shops = await Shop.find({
      user: req.user.id,
      status: "Like"
    });
    console.log(favorite_shops);
    // let shops_array = [];
    // for (let i = 0; i < 12; i++) {
    //   shops_array.push(`Shop${i}`);
    // }
    // //Filter existing shops from the list
    // var filtered_shops = await filter(shops_array, async shop_name => {

    //   if (shop) return false;
    //   return true;
    // });
    res.render("favorites", {
      title: "Favorite Shops",
      shops_array: favorite_shops,
      email: req.cookies["email"]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// async function filter(arr, callback) {
//   const fail = Symbol();
//   return (await Promise.all(
//     arr.map(async item => ((await callback(item)) ? item : fail))
//   )).filter(i => i !== fail);
// }

module.exports = router;
