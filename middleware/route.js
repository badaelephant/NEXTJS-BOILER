const express = require("express");
const checkAuth = require("./auth");

const router = express.Router();
router.use("/", checkAuth);
module.exports = router;
