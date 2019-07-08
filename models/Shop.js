const mongoose = require("mongoose");
const ShopSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Dislike", "Like"]
  },
  distance: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

ShopSchema.index({ user: 1, name: 1, status: 1 }, { unique: true });

// eslint-disable-next-line no-undef
module.exports = Shop = mongoose.model("shop", ShopSchema);
