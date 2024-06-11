const express = require("express");
const router = express.Router();

const orderController = require("../../controllers/order/order.controller");
const { validateToken } = require("../../middlewares/verifyToken");

router.get("/", validateToken, orderController.listOrders);

module.exports = router;
