var express = require("express");
var moosagesController = require("../controllers/moosages");
var router = express.Router();
// var securityMiddleware = require('../middlewares/security');

/* base path: /moosages */

// Show all moosages
router.get("/admin/show", moosagesController.getAllMoosages);

// Show all active moosages (admin use only)
router.get("/showActive", moosagesController.getActiveMoosages);

// Show all deleted moosages (admin use only)
router.get("/showDeleted", moosagesController.getDeletedMoosages);

// Show all moosages on particular board
router.get("/show/:boardId", moosagesController.getBoardMoosages);

// Show all moosages created by a user
router.get("/user/:userId", moosagesController.getUserMoosages);

// Show all public moosages created by a user
router.get("/public/:userId", moosagesController.getUserPublicMoosages);

// Create a moosage for a board
router.post("/create/:boardId", moosagesController.createMoosage);

// Update a moosage
router.patch("/update/:id", moosagesController.updateMoosage);

// Remove a moosage (status change to deleted but still in db)
router.patch("/remove/:id", moosagesController.removeMoosage);

// Delete a moosage.
router.delete("/delete/:id", moosagesController.deleteMoosage);

module.exports = router;
