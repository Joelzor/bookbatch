const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  createBook,
  searchBooks,
} = require("../controllers/bookController");

router.route("/").get(getAllBooks).post(createBook);
router.route("/search").post(searchBooks);

module.exports = router;
