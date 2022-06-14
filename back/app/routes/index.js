// importing the express module and the user and sauce routes
const express = require("express");
// Then we make a router to defind URI
const router = express.Router();
const commentsRoutes = require("./comment");
const userRoutes = require("./user");
const postsRoutes = require("./post");


// We create the user, comment and post routes
router.use("/api/auth", userRoutes);
router.use("/api/comment", commentsRoutes);
router.use("/api/post", postsRoutes);

// then we export our router
module.exports = router;


