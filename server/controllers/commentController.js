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

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, 'You are not allowed to edit this comment')
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { content: req.body.content },
      { new: true }
    );

    res.status(200).json(editComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, 'You are not allowed to delete this comment')
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json('Comment has been deleted');
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  const { startIndex, limit, sort } = req.query;

  try {
    // Parse the startIndex parameter into an integer, defaulting to 0 if it is not a valid number.
    const startingIndex = parseInt(startIndex) || 0;
    // Parse the limit parameter into an integer, defaulting to 9 if it is not a valid number.
    const maxLimit = parseInt(limit) || 9;
    // Determine the sort direction based on the order parameter, defaulting to descending order.
    const sortDirection = sort === 'desc' ? 1 : -1;

    // Retrieve the comments from the database, sorted by creation date in the specified direction,
    // skipping the specified number of comments and limiting the number of comments retrieved.
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startingIndex)
      .limit(maxLimit);

    // Count the total number of comments in the database.
    const totalComments = await Comment.countDocuments();
    // Get the current date.
    const now = new Date();
    // Calculate the date one month ago.
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    // Count the number of comments created in the previous month.
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};
