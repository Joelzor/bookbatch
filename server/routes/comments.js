const express = require("express");
const router = express.Router();
const {
  createComment,
  getAllComments,
  getCommentsByBatchId,
} = require("../controllers/commentController");

router.route("/").get(getAllComments).post(createComment);
router.route("/:batchId").get(getCommentsByBatchId);

module.exports = router;
