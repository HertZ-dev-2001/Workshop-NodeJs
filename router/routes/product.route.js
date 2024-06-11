const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product/product.controller");
const orderController = require("../../controllers/order/order.controller");
const { validateToken } = require("../../middlewares/verifyToken");

router.get("/", validateToken, productController.listProducts);
router.post("/", validateToken, productController.createProduct);
router.put("/:id", validateToken, productController.editProduct);
router.delete("/:id", validateToken, productController.deleteProduct);
router.get("/:id", validateToken, productController.viewProduct);

router.get("/:id/orders", validateToken, orderController.viewProductOrder);
router.post("/:id/orders", validateToken, orderController.orderProducts);

module.exports = router;
