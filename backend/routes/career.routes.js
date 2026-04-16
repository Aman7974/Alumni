import express from 'express';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';
import { listCareers, addCareer, updateCareer, deleteCareer } from '../controllers/career.controller.js';
import { validate, careerSchema } from '../utils/validators.js';

const router = express.Router();

// Public: list all careers
router.get('/', listCareers);

// Protected: add career (requires authentication)
router.post('/', authenticate, validate(careerSchema), addCareer);

// Admin only: update/delete careers
router.put('/:id', authenticate, isAdmin, updateCareer);
router.delete('/:id', authenticate, isAdmin, deleteCareer);

export default router;
