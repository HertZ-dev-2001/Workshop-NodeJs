const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    approval: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const admin = mongoose.model("admins", adminSchema);
module.exports = admin;
