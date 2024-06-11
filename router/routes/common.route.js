const express = require("express");
const router = express.Router();

const commonRegister = require("../../controllers/common/common.controller");

router.post("/login", commonRegister.loginAdmin);
router.post("/register", commonRegister.registerAdmin);
router.put("/approve/:id", commonRegister.approveAdmin);

module.exports = router;
