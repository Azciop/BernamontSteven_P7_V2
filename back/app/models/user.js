// Importing the mongoose module
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Making an user model to define the requirement to make an user
const userSchema = mongoose.Schema({
	email: {
		type: Object,
		required: true,
		unique: [true, "Email must be unique"],
	},
	password: { type: String, required: true },
	firstname: { type: String, required: true, trim: true },
	lastname: { type: String, required: true, trim: true },
	isAdmin: { type: Boolean, required: true, default: false },
	created_at: { type: Date },
	updated_at: { type: Date }
});

userSchema.pre('save', function (next) {
	now = new Date();
	this.updated_at = now;
	if (!this.created_at) {
		this.created_at = now;
	}
	next();
});


// We are also using an uniqueValidor plugin to allow only an unique email when creating an account
userSchema.plugin(uniqueValidator);

// then we export the user model
module.exports = mongoose.model("User", userSchema);
