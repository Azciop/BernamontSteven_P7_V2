// Importing our express and router modules
const express = require("express");
const router = express.Router();

// importing our postcontroller and also our auth and multer middleware
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// We make our routes to create a post and to like a post
router.post("/", auth, multer, postCtrl.createPost);
router.post("/:id/like", auth, postCtrl.ratePost);

// We make our routes to get one or all the posts
router.get("/:id", postCtrl.readOnePost);
router.get("/", postCtrl.readAllPosts);

// We make our route to update a post
router.put("/:id", auth, multer, postCtrl.updatePost);

// We make our route to delete a post
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
