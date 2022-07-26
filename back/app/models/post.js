// Importing the mongoose module
const mongoose = require("mongoose");

// Making a post model to define the requirement to make a post
const postSchema = mongoose.Schema({
	userId: { type: String, required: true, ref: "User" },
	content: { type: String, required: true, trim: true },
	imageUrl: { type: String, trim: true },
	likes: { type: Number, default: 0 },
	usersLiked: [{ type: String, ref: "User" }],
	firstname: {type: String, required: true, trim: true },
    lastname: {type: String, required: true, trim: true },
	created_at: { type: Date},
	updated_at: { type: Date }

});

postSchema.pre('save', function(next){
	now = new Date();
	this.updated_at = now;
	if ( !this.created_at ) {
	  this.created_at = now;
	}
	next();
  });
 
  
// then we export this model
module.exports = mongoose.model("Post", postSchema);
