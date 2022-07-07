// Importing the mongoose module
const mongoose = require("mongoose");

// Making a comment model to define the requirement to make a comment
const commentSchema = mongoose.Schema({
	userId: { type: String, required: true, ref: "User" },
	content: { type: String, required: true, trim: true},
	
});

// then we export this model
module.exports = mongoose.model("Comment", commentSchema);
 