const express = require("express");
const router = express.Router();

const {
  addChild,
  viewAllChildren,
  viewChildren,
  getChildrenByParentId
} = require("../controllers/childController");

router.post("/add-child", addChild);
router.get("/all", viewAllChildren);
router.get("/view-child", viewChildren);
router.get("/parent/:parentId", getChildrenByParentId);

module.exports = router;
