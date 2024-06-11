const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "admin",
    },
    listOrders: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          require: true,
          ref: "product",
        },
        orderAmount: { type: Number, require: true },
        price: { type: Number, require: true },
        totalPrice: { type: Number, require: true },
      },
    ],
    totalOrderPrice: { type: Number, require: true },
  },
  { timestamps: true }
);

const order = mongoose.model("orders", orderSchema);
module.exports = order;
