// Importing our express and router module
const express = require("express");
const router = express.Router();

// Importing our user controller and our auth middleware
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

// We make our routes to signup or logging an user
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// we make our routes to read user
router.get("/read", auth, userCtrl.readUser);
router.get("/readAllUsers",  userCtrl.readAllUsers)

// we make our route tu update user's info
router.put("/", auth, userCtrl.updateUser);

// We make our route to delete an user
router.delete("/", auth, userCtrl.deleteUser);


// we export our router
module.exports = router;