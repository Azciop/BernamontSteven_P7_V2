// importing the express module and the user and posts routes
const express = require("express");
// Then we make a router to defind URI
const router = express.Router();
const userRoutes = require("./user");
const postsRoutes = require("./post");


// We create the user and post routes
router.use("/api/auth", userRoutes);
router.use("/api/post", postsRoutes);

// then we export our router
module.exports = router;


