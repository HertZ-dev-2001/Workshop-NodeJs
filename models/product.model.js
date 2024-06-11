const mongoose = require("mongoose");
const { getNextSequence } = require("../utils/database/IdCounter");

const productSchema = new mongoose.Schema(
  {
    productNumber: { type: Number, default: 0 },
    productName: { type: String, require: true },
    productDetail: { type: String, default: null },
    productPrice: { type: Number, require: true },
    productAmount: { type: Number, require: true },
  },
  { timestamps: true }
);

productSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.productNumber = await getNextSequence("productNumber");
  }
  next();
});

const product = mongoose.model("products", productSchema);
module.exports = product;
