// getting the comment model's file
const Comment = require("../models/comment");

// Importing the express modules
var express = require("express");
var app = express();

// making a function and an export to find a specific comment
exports.readOneComment = (req, res, next) => {
    // using the findOne function to find a comment
    Comment.findOne({ _id: req.params.id })
        .then(comment => {
            // then, pushing the comment
            res.status(200).json(comment);
        })
        .catch(error => res.status(404).json({ error }));
};

// making a function and an export to read every comments
exports.readAllcomments = (req, res, next) => {
    // using a find function to find every comments available
    Comment.find()
        .then(comments => {
            // using a .map to make an array that includes every comments
            comments = comments.map(comment => {
                return comment;
            });
            res.status(200).json(comments);
        })
        .catch(error => res.status(400).json({ error }));
};

// we make a function and a exports to creat a new comment
exports.createComment = (req, res, next) => {
    // making a const to store new comment values
    const commentObject = JSON.parse(req.body.comment);
    delete commentObject._id;
    // then we creat the new comment using the cost we just created
    const comment = new Comment({
        ...commentObject,
    });
    comment
        .save()
        // then we push the new comment and we send a message
        .then(result =>
            res
                .status(201)
                .json(
                    { message: "New comment saved !", data: result }
                )
        )
        .catch(error => res.status(400).json({ error }));
};

// we make a function to update a comment
exports.updateComment = (req, res, next) => {
    // Using the findOne method to find the comment
    Comment.findOne({ _id: req.params.id })
        .then(comment => {
            if (req.auth.userId !== comment.userId) {
                return res
                    .status(403)
                    .json(
                        { message: "Access denied. This comment is not your own." },
                    )
            }

            //  we update the new values 
            Comment.updateOne(
                { _id: req.params.id },
                { ...req.body, _id: req.params.id }
            )
                // then, we send the message
                .then(comment =>
                    res
                        .status(200)
                        .json(
                            { message: "Your comment has been modified", data: comment }
                        )
                )
                .catch(error => res.status(400).json({ error }));
        })
}



// we make a function to delete a comment
exports.deleteComment = (req, res, next) => {
    // uding a findOneAndDelete to delete a comment
    Comment.findOneAndDelete({ _id: req.params.id }).then(comment => {
            res.status(200).json({ message: "Your comment has been deleted" });
        });
};

