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

// making a function using a switch to make the like system functionnal
exports.rateComment = (req, res, next) => {
    // using findOne function to find the comment
    Comment.findOne({ _id: req.params.id }).then(comment => {
        switch (req.body.like) {
            //   case one, we add a like by using a push method
            case 1:
                // Making a if to check if user didn't liked the comment yet
                if (!comment.usersLiked.includes(req.body.userId)) {
                    // making a object with $inc and $push methods to add a like and to add the user's id
                    let toChange = {
                        $inc: { likes: +1 },
                        $push: { usersLiked: req.body.userId },
                    };
                    if (comment.usersDisliked.includes(req.body.userId)) {
                        // if user wants to change his dislike to put a like, we push the like and we pull out the dislike
                        toChange = {
                            $inc: { likes: +1, dislikes: -1 },
                            $push: { usersLiked: req.body.userId },
                            $pull: { usersDisliked: req.body.userId },
                        };
                    }
                    // we update the result for the like
                    Comment.updateOne({ _id: req.params.id }, toChange)
                        // then we send the result and the message
                        .then(comment =>
                            res
                                .status(200)
                                .json(
                                    { message: "Liked !", data: comment }
                                )
                        )
                        .catch(error => res.status(400).json({ error }));
                } else {
                    res.status(304).json();
                }
                break;
            case -1:
                // case 2, we add a dislike by using the push method
                // we check if the user has already disliked the comment
                if (!comment.usersDisliked.includes(req.body.userId)) {
                    // making an object with $inc and $push methods to add the dislike and the user's id
                    let toChange = {
                        $inc: { dislikes: req.body.like++ * -1 },
                        $push: { usersDisliked: req.body.userId },
                    };
                    if (comment.usersLiked.includes(req.body.userId)) {
                        // if the user wants to change his like to a dislike, we push the dislike and we pull out the like
                        toChange = {
                            $inc: { likes: -1, dislikes: +1 },
                            $push: { usersDisliked: req.body.userId },
                            $pull: { usersLiked: req.body.userId },
                        };
                    }
                    // then we update the result
                    Comment.updateOne({ _id: req.params.id }, toChange)
                        .then(comment =>
                            res
                                .status(200)
                                .json(
                                    { message: "Disliked !", data: comment }
                                )
                        )
                        .catch(error => res.status(400).json({ error }));
                } else {
                    res.status(304).json();
                }
                break;
            case 0:
                Comment.findOne({ _id: req.params.id })
                    .then(comment => {
                        // case 3, we want to take off a like or a dislike
                        if (comment.usersLiked.includes(req.body.userId)) {
                            // using the updateOne function to update the result
                            Comment.updateOne(
                                { _id: req.params.id },
                                //  we use a pull method to take off a like
                                { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
                            )
                                .then(customElements => {
                                    // then we send the result and the message
                                    res
                                        .status(200)
                                        .json(
                                            { message: "Comment unliked", data: comment }
                                        );
                                })
                                .catch(error => res.status(400).json({ error }));
                            // if it's a dislike, we take it off too
                        } else if (comment.usersDisliked.includes(req.body.userId)) {
                            Comment.updateOne(
                                { _id: req.params.id },
                                {
                                    //  we use a pull method to take off a dislike
                                    $pull: { usersDisliked: req.body.userId },
                                    $inc: { dislikes: -1 },
                                }
                            )
                                .then(comment => {
                                    // then we push the result
                                    res
                                        .status(200)
                                        .json(
                                            { message: "Comment undisliked !", data: comment }
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

