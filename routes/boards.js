var express = require("express");
var boardsController = require("../controllers/boards");
var router = express.Router();
// var securityMiddleware = require('../middlewares/security');

/* base path: /boards */

// Show all boards
router.get("/admin/show", boardsController.getAllBoards);

// Show all active boards (admin use only)
router.get("/showActive", boardsController.getActiveBoards);

// Show all deleted boards (admin use only)
router.get("/showDeleted", boardsController.getDeletedBoards);

// Show particular board
router.get("/show/:id", boardsController.getBoard);

// Show all boards created by a user
router.get("/user/:userId", boardsController.getUserBoards);

// Show all public boards created by a user
router.get("/public/:userId", boardsController.getUserPublicBoards);

// Create a board
router.post("/create", boardsController.createBoard);

// Update a board
router.patch("/update/:id", boardsController.updateBoard);

// Remove a board (status change to deleted but still in db)
router.patch("/remove/:id", boardsController.removeBoard);

// Delete a board from database (delete from db - admin only)
router.delete("/delete/:id", boardsController.deleteBoard);

module.exports = router;
