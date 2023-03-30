const express = require("express");
const router = express.Router();
const cacheService = require("express-api-cache");
const cache = cacheService.cache;
const {
  getAllBatches,
  createBatch,
  getBatchById,
  getBatchesByUser,
  deleteBatch,
  updateBatch,
  addBatchToSaved,
  deleteBatchFromSaved,
} = require("../controllers/batchController");
const { authenticate } = require("../middleware/auth");

router.route("/").get(getAllBatches).post(authenticate, createBatch);
router
  .route("/:id")
  .get(getBatchById)
  .delete(authenticate, deleteBatch)
  .patch(authenticate, updateBatch);
router.route("/user/:id").get(getBatchesByUser);
router
  .route("/:batchId/save/:userId")
  .patch(authenticate, addBatchToSaved)
  .delete(authenticate, deleteBatchFromSaved);

module.exports = router;
