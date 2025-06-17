const express = require("express");
const router = express.Router();
const { register, login, getAllParents } = require("../controllers/userController");

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// GET all parents
router.get("/parents", getAllParents);

module.exports = router;
