const express = require("express");
const router = express.Router();
const {
  getAllBatches,
  createBatch,
  getBatchById,
} = require("../controllers/batchController");
const { authenticate } = require("../middleware/auth");

router.route("/").get(getAllBatches).post(authenticate, createBatch);
router.route("/:id").get(getBatchById);

module.exports = router;
