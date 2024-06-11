const express = require("express");
const productModel = require("../../models/product.model");

const listProducts = async (req, res) => {
  try {
    const listProducts = await productModel.find();

    const formattedListProducts = listProducts.map((product, index) => {
      return {
        productNumber: product.productNumber,
        productName: product.productName,
        productDetail: product.productDetail,
        productPrice: product.productPrice,
        productAmount: product.productAmount,
      };
    });

    return res.status(200).json({
      status: 200,
      message: "get list products success.",
      listProducts: formattedListProducts,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Fail to get list products." });
  }
};

const createProduct = async (req, res) => {
  try {
    if (req.body) {
      const { productName, productDetail, productPrice, productAmount } =
        req.body;
      const product = {
        productName: productName,
        productDetail: productDetail,
        productPrice: productPrice,
        productAmount: productAmount,
      };
      await productModel.create(product);
      return res
        .status(201)
        .json({ status: 201, message: "Create product success." });
    } else {
      return res.status(400).json({ status: 400, message: "Bad Request." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Fail to create product." });
  }
};

const editProduct = async (req, res) => {
  try {
    if (req.params && req.body) {
      const { id } = req.params;
      const { productName, productDetail, productPrice, productAmount } =
        req.body;
      await productModel.findByIdAndUpdate(id, {
        productName: productName,
        productDetail: productDetail,
        productPrice: productPrice,
        productAmount: productAmount,
      });
      return res
        .status(201)
        .json({ status: 201, message: "Edit product success." });
    } else {
      return res.status(400).json({ status: 400, message: "Bad Request." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Fail to edit product." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (req.params) {
      const { id } = req.params;
      await productModel.findByIdAndDelete(id);
      return res
        .status(201)
        .json({ status: 200, message: "Delete product success." });
    } else {
      return res.status(400).json({ status: 400, message: "Bad Request." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Fail to delete product." });
  }
};

const viewProduct = async (req, res) => {
  try {
    if (req.params) {
      const { id } = req.params;
      const product = await productModel.findById(id);
      const formattedViewProduct = {
        productNumber: product.productNumber,
        productName: product.productName,
        productDetail: product.productDetail,
        productPrice: product.productPrice,
        productAmount: product.productAmount,
      };
      return res.status(200).json({
        status: 200,
        message: "get view product success.",
        listProducts: formattedViewProduct,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Fail to get view products." });
  }
};

module.exports = {
  listProducts,
  createProduct,
  editProduct,
  deleteProduct,
  viewProduct,
};
