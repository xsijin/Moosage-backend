var express = require('express');
var router = express.Router();

// Require the controller that exports To-Do CRUD functions
var usersCtrl = require("../controllers/users");

// All actual paths start with "/users"

// GET /todos
router.get("/", usersCtrl.index);

module.exports = router;
