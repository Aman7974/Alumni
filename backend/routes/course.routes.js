import express from 'express';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';
import { listCourses, addCourse, updateCourse, deleteCourse } from '../controllers/course.controller.js';
import { validate, courseSchema } from '../utils/validators.js';

const router = express.Router();

// Public: list courses
router.get('/', listCourses);

// Admin only: manage courses
router.post('/', authenticate, isAdmin, validate(courseSchema), addCourse);
router.put('/:id', authenticate, isAdmin, updateCourse);
router.delete('/:id', authenticate, isAdmin, deleteCourse);

export default router;
