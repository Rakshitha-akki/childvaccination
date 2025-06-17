// routes/parentRoutes.js

const express = require("express");
const router = express.Router();
const { getParentDashboard } = require("../controllers/parentController");
const authenticate = require("../middleware/auth");

router.get("/parent-dashboard", authenticate, getParentDashboard);

module.exports = router;
