import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getPostsComments } from '../controllers/commentController.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getPostComments/:postId', getPostsComments);

export default router;
