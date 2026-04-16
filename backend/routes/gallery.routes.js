import express from 'express';
import multer from 'multer';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';
import { listGallery, addGallery, deleteGallery } from '../controllers/gallery.controller.js';
import { galleryUpload } from '../utils/file-upload.js';
import { validate, gallerySchema } from '../utils/validators.js';

const router = express.Router();

// Public: list gallery
router.get('/', listGallery);

// Admin only: add/delete gallery images
router.post('/', authenticate, isAdmin, galleryUpload.single('image'), validate(gallerySchema), addGallery);
router.delete('/:id', authenticate, isAdmin, deleteGallery);

export default router;
