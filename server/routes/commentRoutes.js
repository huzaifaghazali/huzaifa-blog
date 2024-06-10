import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  create,
  editComment,
  getPostsComments,
  likeComment,
} from '../controllers/commentController.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getPostComments/:postId', getPostsComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);

export default router;
