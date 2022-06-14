// Importing our express and router modules
const express = require("express");
const router = express.Router();

// importing our commentcontroller and also our auth and multer middleware
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// We make our routes to create a comment and to like a comment
router.post("/", auth, multer, commentCtrl.createComment);
router.post("/:id/like", auth, commentCtrl.rateComment);

// We make our routes to get one or all the comments
router.get("/:id", commentCtrl.readOneComment);
router.get("/", commentCtrl.readAllcomments);

// We make our route to update a comment
router.put("/:id", auth, multer, commentCtrl.updateComment);

// We make our route to delete a comment
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
