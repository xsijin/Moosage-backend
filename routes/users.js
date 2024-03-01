var express = require("express");
var usersController = require("../controllers/users");
var router = express.Router();
var securityMiddleware = require("../middlewares/security");

/* base path: /users */

// Show all user profiles
router.get("/admin/show", securityMiddleware.checkPermission, usersController.getAllUsers);

// Show particular user profile
router.get("/show/:id", usersController.getUser);

// User Login
router.get("/login", usersController.getLoginDetails);
router.post("/login", usersController.loginUser);

router.post("/logout", securityMiddleware.checkLogin, usersController.logoutUser);

// Create a user profile
router.post("/create", usersController.createUser);

// Update a user profile
router.patch("/update/:id", securityMiddleware.checkPermission, usersController.updateUser);

// Remove a user profile (status change to deleted but still in db)
router.patch("/remove/:id", securityMiddleware.checkPermission, usersController.removeUser);

// Delete a user profile from database (delete from db - admin only)
router.delete("/delete/:id", securityMiddleware.checkPermission, usersController.deleteUser);

module.exports = router;
