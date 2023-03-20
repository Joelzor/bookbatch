const express = require("express");
const router = express.Router();
const {
  createComment,
  getAllComments,
} = require("../controllers/commentController");

router.route("/").get(getAllComments).post(createComment);

module.exports = router;
