import express from 'express';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';
import { listEvents, addEvent, updateEvent, deleteEvent, participateEvent, checkParticipation, upcomingEvents } from '../controllers/event.controller.js';

const router = express.Router();

// Public: list events
router.get('/', listEvents);
router.get('/upcoming-events', upcomingEvents);

// Protected: participate and check participation
router.post('/participate', authenticate, participateEvent);
router.post('/participation-check', authenticate, checkParticipation);

// Admin only: manage events
router.post('/', authenticate, isAdmin, addEvent);
router.put('/:id', authenticate, isAdmin, updateEvent);
router.delete('/:id', authenticate, isAdmin, deleteEvent);

export default router;
