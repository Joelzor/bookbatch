const express = require("express");
const router = express.Router();
const {
  getAllBatches,
  createBatch,
} = require("../controllers/batchController");
const { authenticate } = require("../middleware/auth");

router.route("/").get(getAllBatches).post(authenticate, createBatch);

module.exports = router;
