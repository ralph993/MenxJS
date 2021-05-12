const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    items: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number,
        img: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
