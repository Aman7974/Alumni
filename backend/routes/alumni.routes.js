import express from 'express';
import multer from 'multer';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';
import {
  updateAlumnusStatus,
  deleteAlumnus,
  alumniList,
  updateAccount,
  alumnus
} from '../controllers/alumni.controller.js';
import { avatarUpload } from '../utils/file-upload.js';

const router = express.Router();

// Public routes
router.get('/', alumniList);
router.get('/:id', alumnus);

// Admin-only routes
router.put('/status', authenticate, isAdmin, updateAlumnusStatus);
router.delete('/:id', authenticate, isAdmin, deleteAlumnus);

// User updates their own account
router.put('/account', authenticate, avatarUpload.single('avatar'), updateAccount);

export default router;