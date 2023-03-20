const express = require("express");
const router = express.Router();
const {
  createComment,
  getAllComments,
  getCommentsByBatchId,
  deleteComment,
} = require("../controllers/commentController");

router.route("/").get(getAllComments).post(createComment);
router.route("/:batchId").get(getCommentsByBatchId);
router.route("/:id").delete(deleteComment);

module.exports = router;
