const express = require("express");
const router = express.Router();

const commonRouter = require("./routes/common.route");
const productRouter = require("./routes/product.route");
const orderRouter = require("./routes/order.route");

router.use("/api/v1/", commonRouter);
router.use("/api/v1/products", productRouter);
router.use("/api/v1/orders", orderRouter);

module.exports = router;
