// const { validationResult } = require("express-validator");
// const User = require("../models/User");

// // @desc    Get all users
// // @route   GET /api/users
// // @access  Private/Admin
// const getAllUsers = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, role, search } = req.query;

//     const filter = {};
//     if (role) filter.role = role;
//     if (search) {
//       filter.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { email: { $regex: search, $options: "i" } },
//       ];
//     }

//     const total = await User.countDocuments(filter);
//     const users = await User.find(filter)
//       .select("-password")
//       .limit(Number(limit))
//       .skip((Number(page) - 1) * Number(limit))
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: users.length,
//       total,
//       pages: Math.ceil(total / limit),
//       currentPage: Number(page),
//       users,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Get single user by ID
// // @route   GET /api/users/:id
// // @access  Private/Admin
// const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select("-password");

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found." });
//     }

//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Update user
// // @route   PUT /api/users/:id
// // @access  Private
// const updateUser = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ success: false, errors: errors.array() });
//   }

//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found." });
//     }

//     if (
//       req.user.role !== "admin" &&
//       req.user._id.toString() !== req.params.id
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized to update this user.",
//       });
//     }

//     const { name, email, profilePicture, isActive, role } = req.body;

//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (profilePicture) user.profilePicture = profilePicture;

//     if (req.user.role === "admin") {
//       if (typeof isActive !== "undefined") user.isActive = isActive;
//       if (role) user.role = role;
//     }

//     const updatedUser = await user.save();

//     res.status(200).json({
//       success: true,
//       message: "User updated successfully.",
//       user: {
//         id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         role: updatedUser.role,
//         isActive: updatedUser.isActive,
//         profilePicture: updatedUser.profilePicture,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Delete a user
// // @route   DELETE /api/users/:id
// // @access  Private/Admin
// const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found." });
//     }

//     if (req.user._id.toString() === req.params.id) {
//       return res.status(400).json({
//         success: false,
//         message: "You cannot delete your own account.",
//       });
//     }

//     await user.deleteOne();

//     res
//       .status(200)
//       .json({ success: true, message: "User deleted successfully." });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Change own password
// // @route   PUT /api/users/:id/change-password
// // @access  Private
// const changePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     const user = await User.findById(req.params.id).select("+password");

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found." });
//     }

//     if (req.user._id.toString() !== req.params.id) {
//       return res
//         .status(403)
//         .json({ success: false, message: "Not authorized." });
//     }

//     const isMatch = await user.matchPassword(currentPassword);
//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Current password is incorrect.",
//       });
//     }

//     if (newPassword.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message: "New password must be at least 6 characters.",
//       });
//     }

//     user.password = newPassword;
//     await user.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Password changed successfully." });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   getAllUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
//   changePassword,
// };



const User = require("../models/User");

// CREATE USER
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// GET USER BY ID
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(user);
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};