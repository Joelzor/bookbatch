const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserById).delete(deleteUser);

module.exports = router;
