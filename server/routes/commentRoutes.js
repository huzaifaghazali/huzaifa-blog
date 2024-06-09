import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  create,
  getPostsComments,
  likeComment,
} from '../controllers/commentController.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getPostComments/:postId', getPostsComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);

export default router;
