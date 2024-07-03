const express = require("express");
const adminModel = require("../../models/admin.model");
const {
  hashPassword,
  compareHashedPassword,
} = require("../../utils/bcrypt/bcrypt");
const {
  jwtAccessTokenGenerate,
} = require("../../services/authentication/tokenManagement");

const loginAdmin = async (req, res) => {
  try {
    if (req.body) {
      const { email, password } = req.body;
      const isEmailExist = await adminModel.exists({ email: email });

      if (isEmailExist) {
        const admin = await adminModel.findOne({ email: email });

        const isPasswordCorrect = await compareHashedPassword(
          password,
          admin.password
        );

        if (isPasswordCorrect && admin.approval === true) {
          const accessToken = jwtAccessTokenGenerate(admin._id, admin.email);
          return res.status(202).json({
            status: 202,
            message: "Login success.",
            token: accessToken,
            username: admin.firstName + " " + admin.lastName,
          });
        }
        if (isPasswordCorrect && admin.approval === false) {
          return res.status(200).json({
            status: 200,
            message: "Admin is not already approved.",
          });
        } else {
          return res
            .status(200)
            .json({ status: 200, message: "Invalid password." });
        }
      } else {
        return res
          .status(200)
          .json({ status: 200, message: "Invalid email or password." });
      }
    } else {
      return res.status(400).json({ status: 400, message: "Bad Request." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Fail to login admin." });
  }
};

const registerAdmin = async (req, res) => {
  try {
    if (req.body) {
      const { firstName, lastName, email, password } = req.body;

      const isEmailExist = await adminModel.exists({ email: email });

      if (isEmailExist) {
        return res
          .status(200)
          .json({ status: 200, message: "Email is already exist." });
      } else {
        const hashedPassword = await hashPassword(password);
        const admin = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashedPassword,
        };
        await adminModel.create(admin);
        return res
          .status(201)
          .json({ status: 201, message: "Create admin success." });
      }
    } else {
      return res.status(400).json({ status: 400, message: "Bad Request." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Fail to create admin." });
  }
};

const approveAdmin = async (req, res) => {
  try {
    if (req.params) {
      const { id } = req.params;
      const admin = await adminModel.findById({ _id: id });
      if (admin && admin.approval === false) {
        await adminModel.findByIdAndUpdate(id, { approval: true });
        return res
          .status(200)
          .json({ status: 200, message: "Approve admin success." });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Admin not found or admin are already approved.",
        });
      }
    } else {
      return res.status(400).json({ status: 400, message: "Bad Request." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Fail to approve admin." });
  }
};

module.exports = { loginAdmin, registerAdmin, approveAdmin };
