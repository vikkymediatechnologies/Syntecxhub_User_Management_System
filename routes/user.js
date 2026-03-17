
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