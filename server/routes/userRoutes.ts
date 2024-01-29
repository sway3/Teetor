import express from 'express';
import { getUserController, getMentorsController } from '../controllers/userController';
import { getNotificationsController, mentoringRequestController, getMentoringRequestController, controlMentoringRequestController } from '../controllers/notificationController';

const router = express.Router();

router.get('/users/:id', getUserController);
router.get('/users/:id/mentors', getMentorsController);
router.get('/users/:id/notifications', getNotificationsController);
router.post('/mentoring-request', mentoringRequestController);
router.get('/mentoring-request/:id', getMentoringRequestController);
router.patch('/mentoring-request/:id', controlMentoringRequestController);

export default router;