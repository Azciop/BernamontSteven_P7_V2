// Importing the mongoose module
const mongoose = require("mongoose");

// Making a comment model to define the requirement to make a comment
const commentSchema = mongoose.Schema({
	userId: { type: String, required: true, ref: "User" },
    firstname: {type: String, required: true, trim: true },
    lastname: {type: String, required: true, trim: true },
	content: { type: String, required: true, trim: true, minlength: 30},
	imageUrl: { type: String, required: true, trim: true },
	likes: { type: Number, default: 0 },
	dislikes: { type: Number, default: 0 },
	usersLiked: [{ type: String, ref: "User" }],
	usersDisliked: [{ type: String, ref: "User" }],
});

// then we export this model
module.exports = mongoose.model("Comment", commentSchema);
 