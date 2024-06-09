import Comment from '../models/commentModel.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, 'You are not allowed to create this comment')
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostsComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    // Find the comment in the database using its id.
    const comment = await Comment.findById(req.params.commentId);

    // If the comment doesn't exist, return a '404' status code.
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }

    // Get the index of the current user's id in the comment's likes array.
    const userIndex = comment.likes.indexOf(req.user.id);

    // If the user is not in the comment's likes array,
    // it means they haven't liked it yet.
    if (userIndex === -1) {
      // Increment the comment's number of likes.
      comment.numberOfLikes += 1;

      // Add the current user's id to the comment's likes array.
      comment.likes.push(req.user.id);
    } else {
      // If the user is in the comment's likes array,
      // it means they have already liked it.

      // Decrement the comment's number of likes.
      comment.numberOfLikes -= 1;

      // Remove the current user's id from the comment's likes array.
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
