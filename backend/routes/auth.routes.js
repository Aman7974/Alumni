import express from 'express';
import { login, signup, logout } from '../controllers/auth.controller.js';
import { validate, loginSchema, userSchema } from '../utils/validators.js';

const router = express.Router();

router.post('/login', validate(loginSchema), login);
router.post('/signup', validate(userSchema), signup);
router.post('/logout', logout);

export default router;
