// Importing bcrypt to hash passwords
const bcrypt = require("bcrypt");

// Importing jwt to make tokens
const jwt = require("jsonwebtoken");

// Importing the models
const User = require("../models/user");

// importing the dotenv file
const dotenv = require("dotenv");
const result = dotenv.config();
require("dotenv").config();

function emailValidator(email) {
	const reg =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(String(email).toLowerCase());
}

// making the signup function
exports.signup = (req, res, next) => {
	if (!emailValidator(req.body.email)) {
		return res.status(400).json({ error: "invalid email" });
	}
	bcrypt
		.hash(req.body.password, 10)
		.then(hash => {
			const user = new User({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				password: hash,
			});
			user
				.save()
				.then(result => {
					// we get the email to send it
					result.email = req.body.email;
					res
						.status(201)
						.json(
							{ message: " User Created !", data: result }
						);
				})
				.catch(error => res.status(400).json({ error }));
		})
		.catch(error => res.status(500).json(console.log(error)));
};

// making the login function
exports.login = (req, res, next) => {
	// using findOne to find the user
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) {
				return res.status(401).json({ error: " User not found !" });
			}
			bcrypt
				// checking if the two passwords matches. If not, send error message
				.compare(req.body.password, user.password)
				.then(valid => {
					if (!valid) {
						return res.status(401).json({ error: "Wrong password !" });
					}
					res.status(200).json(
						{
							// if passwords matches, creat random secret token for a duration of 24h, and log in
							userId: user._id,
							firstname: user.firstname,
							lastname: user.lastname,
							isAdmin: user.isAdmin,
							token: jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, "RANDOM_TOKEN_SECRET", {
								expiresIn: "24h",
							}),
						}
					);
				})
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};


// find user and send infos in JSON
exports.readUser = (req, res, next) => {
	// using FindONe to find the user
	User.findOne({ _id: req.auth.userId })
		.then(user => {
			// if user does not match, send error message
			if (!user) {
				return res.status(404).json({ error: "User not found!" });
			}
			user.password = req.body.password;
			// send user infos as json
			res.status(200).json(user);
		})
		.catch(error => {
			res.status(404).send(console.log(error));
		});
};

exports.readAllUsers = (req, res, next) => {
	// using a find function to find every posts available
	User.find()
		.then(users => {
			// using a .map to make an array that includes every posts
			users = users.map(user => {
				// pushing every posts and their image
				return user;
			});
			res.status(200).json(users);
		})
		.catch(error => res.status(400).json({ error }));
};


// update user infos
exports.updateUser = async (req, res, next) => {
	// making an empty object to store future infos
	const update = {};
	// making the password change
	if (req.body.password) {
		// Hashing the password
		const hash = await bcrypt.hash(req.body.password, 10);
		//changing the password
		update.password = hash;
	}
	// Making the email change
	if (req.body.email) {
		if (!emailValidator(req.body.email)) {
			return res.status(400).json({ error: "invalid email" });
		}
		// changing the  email
		update.email = (req.body.email);
	}
	// Making the firstname change
	if (req.body.firstname) {
		update.firstname = req.body.firstname
	}
	// Making the lastname change
	if (req.body.lastname) {
		update.lastname = req.body.lastname
	}
	// using the findOneAndUpdate function to update the desired change
	User.findOneAndUpdate({ _id: req.auth.userId }, update)
		.then(user => {
			// if user not found, send error message
			if (!user) {
				return res.status(404).json({ error: "User not found !" });
			}
			// else, sending the confirmation message and update the user's infos
			res
				.status(201)
				.json(
					{ message: "user updated", data: user }
				);
		})
		.catch(error => res.status(400).json({ error }));
};

// delete the user
exports.deleteUser = (req, res, next) => {
	// using the findOneAndDelete function to delete the desired user
	User.findOneAndDelete({ _id: req.auth.userId })
		.then(user => {
			// if user not found, send error message
			if (!user) {
				return res.status(404).json({ error: "User not found !" });
			}
			// else, delete the user
			res.send({ message: "user has been deleted" });
		})
		.catch(error => res.status(400).json({ error }));
};


