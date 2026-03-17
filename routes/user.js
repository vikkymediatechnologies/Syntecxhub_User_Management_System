// const express = require("express");
// const router = express.Router();
// const { body } = require("express-validator");

// const userController = require("../controllers/userController");
// const { protect, adminOnly } = require("../middleware/auth");

// // ✅ CREATE USER
// router.post("/", userController.createUser);

// // GET /api/users — get all users (admin only)
// router.get("/", protect, adminOnly, userController.getAllUsers);

// // GET /api/users/:id — get single user (admin only)
// router.get("/:id", protect, adminOnly, userController.getUserById);

// // UPDATE USER
// router.put(
//   "/:id",
//   protect,
//   [
//     body("name")
//       .optional()
//       .trim()
//       .isLength({ min: 2 })
//       .withMessage("Name must be at least 2 characters"),
//     body("email")
//       .optional()
//       .isEmail()
//       .withMessage("Please enter a valid email"),
//   ],
//   userController.updateUser
// );

// // DELETE USER
// router.delete("/:id", protect, adminOnly, userController.deleteUser);

// // CHANGE PASSWORD
// router.put("/:id/change-password", protect, userController.changePassword);

// module.exports = router;



const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// ✅ CREATE USER (THIS WAS MISSING)
router.post("/", userController.createUser);

// ✅ TEST ROUTE (for debugging)
router.get("/test", (req, res) => {
  res.send("Users route working ✅");
});

// GET ALL USERS
router.get("/", userController.getAllUsers);

// GET SINGLE USER
router.get("/:id", userController.getUserById);

// UPDATE USER
router.put("/:id", userController.updateUser);

// DELETE USER
router.delete("/:id", userController.deleteUser);

module.exports = router;