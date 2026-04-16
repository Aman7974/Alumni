import express from 'express';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';
import { validate, forumTopicSchema } from '../utils/validators.js';
import {
  listForums,
  addForum,
  updateForum,
  deleteForum,
  listComments,
  addComment,
  updateComment,
  deleteComment
} from '../controllers/forum.controller.js';

const router = express.Router();

// Public: list forums and comments
router.get('/', listForums);
router.get('/:topicId/comments', listComments);

// Protected: add topic and comments
router.post('/', authenticate, validate(forumTopicSchema), addForum);
router.post('/:topicId/comments', authenticate, addComment);

// Admin only: update/delete topics and comments
router.put('/:id', authenticate, isAdmin, updateForum);
router.delete('/:id', authenticate, isAdmin, deleteForum);
router.put('/comments/:id', authenticate, isAdmin, updateComment);
router.delete('/comments/:id', authenticate, isAdmin, deleteComment);

export default router;
