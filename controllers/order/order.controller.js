const express = require("express");
const orderModel = require("../../models/order.model");
const productModel = require("../../models/product.model");

const orderProducts = async (req, res) => {
  try {
    if (req.params && req.body) {
      const { id } = req.params;
      const { listOrders } = req.body;
      const formattedListOrders = [];
      let totalOrderPrice = 0;

      for (const order of listOrders) {
        totalOrderPrice += order.orderAmount * order.price;

        const product = await productModel.findById(order.productId);

        if (order.orderAmount > product.productAmount) {
          return res.status(200).json({
            status: 200,
            message: `Amount of order is higher than stock.`,
          });
        } else {
          await productModel.findByIdAndUpdate(order.productId, {
            productAmount: product.productAmount - order.orderAmount,
          });
          formattedListOrders.push({
            productId: order.productId,
            orderAmount: order.orderAmount,
            price: order.price,
            totalPrice: order.orderAmount * order.price,
          });
        }
      }

      orders = {
        adminId: id,
        listOrders: formattedListOrders,
        totalOrderPrice: totalOrderPrice,
      };

      await orderModel.create(orders);

      return res.status(201).json({
        status: 201,
        message: "Order product success.",
        orders: orders,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Fail to products order." });
  }
};

const viewProductOrder = async (req, res) => {
  try {
    if (req.params) {
      const { id } = req.params;
      const allOrders = await orderModel.find();
      const listProductsOrder = allOrders.reduce((listOrders, order) => {
        const productOrder = order.listOrders.filter(
          (product) => product.productId.toString() === id
        );
        if (productOrder.length > 0) {
          listOrders.push({
            orderId: order._id,
            adminId: order.adminId,
          });
        }
        return listOrders;
      }, []);

      return res.status(200).json({
        status: 200,
        message: "View product order success.",
        productId: id,
        orders: listProductsOrder,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Fail to view products order." });
  }
};

const listOrders = async (req, res) => {
  try {
    const listOrders = await orderModel.find();

    const formattedListOrders = listOrders.map((order, index) => {
      const formattedListProducts = order.listOrders.map((product, index) => {
        return {
          productId: product.productId,
          orderAmount: product.orderAmount,
          price: product.price,
          totalPrice: product.totalPrice,
        };
      });
      return {
        adminId: order.adminId,
        listOrders: formattedListProducts,
        totalOrderPrice: order.totalOrderPrice,
      };
    });

    return res.status(200).json({
      status: 200,
      message: "Get list order success.",
      listOrders: formattedListOrders,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Fail to get list order." });
  }
};
module.exports = { orderProducts, viewProductOrder, listOrders };
