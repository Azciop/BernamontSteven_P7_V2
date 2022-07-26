// getting the post model's file
const Post = require("../models/post");

const User = require("../models/user")

// importing the filesystem module
const fs = require("fs");

// Importing the express modules
var express = require("express");
const dotenv = require("dotenv");
const result = dotenv.config();
require("dotenv").config();

// making a function and an export to find a specific post
exports.readOnePost = (req, res, next) => {
	// using the findOne function to find a post
	Post.findOne({ _id: req.params.id })
		.then(post => {
			// then, pushing the post and it's image
			post.imageUrl = `${req.protocol}://${req.get("host") + post.imageUrl}`;
			res.status(200).json(post);
		})
		.catch(error => res.status(404).json({ error }));
};

// making a function and an export to read every posts
exports.readAllPosts = (req, res, next) => {
	// using a find function to find every posts available
	Post.find()
		.then(posts => {
			// using a .map to make an array that includes every posts
			posts = posts.map(post => {
				// pushing every posts and their image
				post.imageUrl = `${req.protocol}://${req.get("host") + post.imageUrl
					}`;
				return post;
			});
			res.status(200).json(posts);
		})
		.catch(error => res.status(400).json({ error }));
};

// making a function using a switch to make the like system functionnal
exports.ratePost = (req, res, next) => {
	// using findOne function to find the post
	Post.findOne({ _id: req.params.id }).then(post => {
		switch (req.body.like) {
			//   case one, we add a like by using a push method
			case 1:
				// Making a if to check if user didn't liked the post yet
				if (!post.usersLiked.includes(req.body.userId)) {
					// making a object with $inc and $push methods to add a like and to add the user's id
					let toChange = {
						$inc: { likes: +1 },
						$push: { usersLiked: req.body.userId },
					};
					// we update the result for the like
					Post.updateOne({ _id: req.params.id }, toChange)
						// then we send the result and the message
						.then(post =>
							res
								.status(200)
								.json(
									{ message: "Liked !", data: post }
								)
						)
						.catch(error => res.status(400).json({ error }));
				} else {
					res.status(304).json();
				}
				break;
			case 0:
				Post.findOne({ _id: req.params.id })
					.then(post => {
						// case 2, we want to take off a like
						if (post.usersLiked.includes(req.body.userId)) {
							// using the updateOne function to update the result
							Post.updateOne(
								{ _id: req.params.id },
								//  we use a pull method to take off a like
								{ $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
							)
								.then(post => {
									// then we send the result and the message
									res
										.status(200)
										.json(
											{ message: "Post unliked", data: post }
										);
								})
								.catch(error => res.status(400).json({ error }));
						} else {
							res.status(304).json();
						}
					})
					.catch(error => res.status(400).json({ error }));
				break;
		}
	});
};

exports.createPost = (req, res, next) => {
	const postObject = req.file
		? {
			...req.body,
			imageUrl: `/images/${req.file.filename}`,
		}
		: { ...req.body };
	const post = new Post({
		...postObject,
	});
	post
		.save()
		.then(() => res.status(201).json({ message: "Post created !" }))
		.catch((error) => res.status(400).json({ error }));
};

// imageUrl: `/images/${req.file.filename}`,

exports.updatePost = (req, res, next) => {
	// Using the findOne method to find the post
	Post.findOne({ _id: req.params.id })
		.then(post => {
			if (req.auth.userId !== post.userId) { return res
				.status(403)
				.json(
					{ message: "Access denied. This post is not your own." },
				) }
			// we make a const to find the image we want to delete in case of a image change
			const filename = post.imageUrl.split("/images/")[1];
			if (req.file ) {
				// we make a object that contains the new values and the new image
				const postObject = {
					...JSON.parse(req.body.post),
					imageUrl: `/images/${req.file.filename}`,
				};
				// We use the unlink method to delete the old image
				fs.unlink(`images/${filename}`, () => {
					// using the updateOne function to update the values if the image has been modified
					Post.updateOne(
						{ _id: req.params.id },
						{ ...postObject, _id: req.params.id }
					)
						// then we send the message
						.then(post =>
							res
								.status(200)
								.json(
									{ message: "Your post has been modified", data: post },
								)
						)
						.catch(error => res.status(400).json({ error }));
				});
			} else {
				// else, we just update the new values without changing the image
				Post.updateOne(
					{ _id: req.params.id },
					{ ...req.body, _id: req.params.id }
				)
					// then, we send the message
					.then(post =>
						res
							.status(200)
							.json(
								{ message: "Your post has been modified", data: post },
							)
					)
					.catch(error => res.status(400).json({ error }));
			}
		})
		.catch(error => res.status(500).json(console.log(error)));
};


exports.deletePost = (req, res, next) => {
	User.findOne({ email: process.env.adminEmail })
	Post.findOne({ _id: req.params.id })
		.then(post => {
			if (post.userId !== req.auth.userId // || req.auth.userId !== process.env.adminUserId  
			) {
				return res
					.status(403)
					.json(
						{ message: "Access denied. This post is not your own." },
					)
			}
			if (req.file )
			{
			const filename = post.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {
				Post.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Post deleted !' }))
					.catch(error => res.status(400).json({ error }));
			});
		} else {
			Post.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Post deleted !' }))
					.catch(error => res.status(400).json({ error }));
		}
		})
		.catch(error => res.status(500).json({ error }));
		
};

