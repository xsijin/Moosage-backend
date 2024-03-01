var express = require("express");
var boardsController = require("../controllers/boards");
var router = express.Router();
var securityMiddleware = require('../middlewares/security');

/* base path: /boards */

// Show all boards
router.get("/admin/show", securityMiddleware.checkPermission, boardsController.getAllBoards);

// Show all active boards (admin use only)
router.get("/showActive", securityMiddleware.checkPermission, boardsController.getActiveBoards);

// Show all deleted boards (admin use only)
router.get("/showDeleted", securityMiddleware.checkPermission, boardsController.getDeletedBoards);

// Show particular board
router.get("/show/:id", securityMiddleware.checkPermission, boardsController.getBoard);

// Show all boards created by a user
router.get("/user/:userId", securityMiddleware.checkPermission, boardsController.getUserBoards);

// Show all public boards created by a user
router.get("/public/:userId", boardsController.getUserPublicBoards);

// Create a board
router.post("/create/:userId", securityMiddleware.checkLogin, boardsController.createBoard);

// Update a board
router.patch("/update/:id", securityMiddleware.checkPermission, boardsController.updateBoard);

// Remove a board (status change to deleted but still in db)
router.patch("/remove/:id", securityMiddleware.checkPermission, boardsController.removeBoard);

// Delete a board from database (delete from db - admin only)
router.delete("/delete/:id", securityMiddleware.checkPermission, boardsController.deleteBoard);

module.exports = router;
