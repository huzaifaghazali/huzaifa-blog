import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  create,
  deleteComment,
  editComment,
  getComments,
  getPostsComments,
  likeComment,
} from '../controllers/commentController.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getPostComments/:postId', getPostsComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getComments);

export default router;
