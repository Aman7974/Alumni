import express from 'express';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';
import { getSettings } from '../controllers/settings.controller.js';

const router = express.Router();

// Public: get settings
router.get('/', getSettings);

// Admin only: update settings (add controller when needed)
// router.put('/', authenticate, isAdmin, updateSettings);

export default router;
