import express from 'express';
import { getUserController, getMentorsController } from '../controllers/userController';
import { getNotificationsController, mentoringRequestController } from '../controllers/notificationController';

const router = express.Router();

router.get('/users/:id', getUserController);
router.get('/users/:id/mentors', getMentorsController);
router.get('/users/:id/notifications', getNotificationsController);
router.post('/mentoring-request', mentoringRequestController);

export default router;