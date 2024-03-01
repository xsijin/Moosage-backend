var express = require("express");
var moosagesController = require("../controllers/moosages");
var router = express.Router();
var securityMiddleware = require('../middlewares/security');

/* base path: /moosages */

// Show one moosage (for debugging purposes)
router.get("/show/single/:id", securityMiddleware.checkPermission, moosagesController.getOneMoosage);

// Show all moosages
router.get("/admin/show", securityMiddleware.checkPermission, moosagesController.getAllMoosages);

// Show all active moosages (admin use only)
router.get("/showActive", securityMiddleware.checkPermission, moosagesController.getActiveMoosages);

// Show all deleted moosages (admin use only)
router.get("/showDeleted", securityMiddleware.checkPermission, moosagesController.getDeletedMoosages);

// Show all moosages on owner's board (include private)
router.get("/show/:boardId", securityMiddleware.checkLogin, moosagesController.getBoardMoosages);

// Show all moosages on a public share board (public only)
router.get("/public/board/:boardId", moosagesController.getPublicBoardMoosages);

// Show all moosages created by a user
router.get("/user/:userId", securityMiddleware.checkLogin, moosagesController.getUserMoosages);

// Show all public moosages created by a user
router.get("/public/user/:userId", moosagesController.getUserPublicMoosages);

// Create a moosage for a board
router.post("/create/:boardId", securityMiddleware.checkLogin, moosagesController.createMoosage);

// Update a moosage
router.patch("/update/:id", securityMiddleware.checkLogin, moosagesController.updateMoosage);

// Remove a moosage (status change to deleted but still in db)
router.patch("/remove/:id", securityMiddleware.checkLogin, moosagesController.removeMoosage);

// Delete a moosage.
router.delete("/delete/:id", securityMiddleware.checkPermission, moosagesController.deleteMoosage);

module.exports = router;
