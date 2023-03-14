const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUserProfile,
} = require("../controllers/userController");
const { authenticate } = require("../middleware/auth");

router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:id")
  .get(getUserById)
  .delete(authenticate, deleteUser)
  .patch(authenticate, updateUserProfile);

module.exports = router;
