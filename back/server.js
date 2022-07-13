// Importing the Express module
const express = require("express");
const app = express();

// Importing the cors module
const cors = require("cors");

// Importing the  routes
const routes = require("./app/routes");

// Importing the path module
const path = require("path");

// Importing the mongoose module
const mongoose = require("mongoose");

// Logger mongoose
mongoose.set("debug", true);

// Importing the mongoose sanitize module
const mongoSanitize = require("express-mongo-sanitize");

// Init .env config
require("dotenv").config();


const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// importing db confing to allow our database to work
const db = require("./config/db.config");

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Groupomania application." });
});

app.use(mongoSanitize());

app.use(routes);

// using express.static to serv our images in express
app.use("/images", express.static(path.join(__dirname, "images")));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

