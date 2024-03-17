import express from 'express';
import {
  getUserInfoController,
  getMentorsController,
} from '../controllers/userController';
import {
  getNotificationsController,
  mentoringRequestController,
  getMentoringRequestController,
  controlMentoringRequestController,
} from '../controllers/notificationController';
import { getDashInfoController } from '../controllers/dashboardController';

const router = express.Router();

router.get('/dashboard/:id', getDashInfoController);
router.get('/users/:id', getUserInfoController);
router.get('/users/:id/mentors', getMentorsController);
router.get('/users/:id/notifications', getNotificationsController);
router.post('/mentoring-request', mentoringRequestController);
router.get('/mentoring-request/:id', getMentoringRequestController);
router.patch('/mentoring-request/:id', controlMentoringRequestController);

export default router;
