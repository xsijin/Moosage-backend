var express = require("express");
var usersController = require("../controllers/users");
var router = express.Router();
// var securityMiddleware = require("../middlewares/security");

/* base path: /users */

// Show all user profiles
router.get("/show", usersController.getAllUsers);

// Show particular user profile
router.get("/showOne/:id", usersController.getUser);

// User Login
router.get("/login", usersController.getLoginDetails);
router.post("/login", usersController.loginUser);

router.post("/logout", usersController.logoutUser);

// Create a user profile
router.post("/create", usersController.createUser);

// Update a user profile
router.patch("/update/:id", usersController.updateUser);

// Remove a user profile (status change to deleted but still in db)
router.patch("/remove/:id", usersController.removeUser);

// Delete a user profile from database (delete from db - admin only)
router.delete("/delete/:id", usersController.deleteUser);

module.exports = router;
