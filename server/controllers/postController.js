import Post from '../models/postModel.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  // It generates a slug from the post's title by replacing spaces with hyphens, converting to lowercase, and removing any non-alphanumeric characters or hyphens.
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savePost = await newPost.save();

    res.status(201).json(savePost);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  const {
    startIndex,
    limit,
    order,
    userId,
    category,
    slug,
    postId,
    searchTerm,
  } = req.query;

  try {
    // Parse the startIndex parameter into an integer, defaulting to 0 if it is not a valid number.
    const startingIndex = parseInt(startIndex) || 0;
    // Parse the limit parameter into an integer, defaulting to 9 if it is not a valid number.
    const maxLimit = parseInt(limit) || 9;
    // Determine the sort direction based on the order parameter, defaulting to descending order.
    const sortDirection = order === 'asc' ? 1 : -1;

    // Find posts in the database that match the specified criteria.
    // If userId is provided, only retrieve posts by that user.
    // If category is provided, only retrieve posts in that category.
    // If slug is provided, only retrieve the post with that slug.
    // If postId is provided, only retrieve the post with that ID.
    // If searchTerm is provided, only retrieve posts that match the search term in the title or content.
    const posts = await Post.find({
      ...(userId && { userId }),
      ...(category && { category }),
      ...(slug && { slug }),
      ...(postId && { _id: postId }),
      ...(searchTerm && {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { content: { $regex: searchTerm, $options: 'i' } },
        ],
      }),
    })
      // Sort the posts by the updatedAt field in the specified direction.
      .sort({ updatedAt: sortDirection })
      // Skip the specified number of posts.
      .skip(startingIndex)
      // Limit the number of posts to retrieve.
      .limit(maxLimit);

    // Count the total number of posts in the database.
    const totalPosts = await Post.countDocuments();

    // Get the current date.
    const now = new Date();

    // Subtract one month from the current date to get the date one month ago.
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    // Count the number of posts created in the last month.
    // This is done by querying the database for posts with a createdAt date
    // greater than or equal to one month ago.
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    // Send the retrieved posts, total post count, and count of posts created in the last month as a JSON response.
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    // If an error occurs, pass it to the next middleware function.
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are allowed to delete this post'));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};
