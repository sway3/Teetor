import express from 'express';
import {
  getUserInfoController,
  getMentorsController,
  userSignUpController,
  userLogoutController,
} from '../controllers/userController';
import {
  getNotificationsController,
  mentoringRequestController,
  getMentoringRequestController,
  controlMentoringRequestController,
} from '../controllers/notificationController';
import { getDashInfoController } from '../controllers/dashboardController';
import { googleOAuthController } from '../controllers/OAuthController';
import {
  authController,
  refreshTokenController,
} from '../controllers/userAuthController';

const router = express.Router();

router.get('/dashboard', getDashInfoController);
router.post('/signup', userSignUpController);
router.get('/user', getUserInfoController);
router.post('/logout', userLogoutController);
router.get('/users/:id/mentors', getMentorsController);
router.get('/users/:id/notifications', getNotificationsController);
router.post('/mentoring-request', mentoringRequestController);
router.get('/mentoring-request/:id', getMentoringRequestController);
router.patch('/mentoring-request/:id', controlMentoringRequestController);

// authentication, authorisation controllers
router.post('/auth', authController);
router.post('/google-oauth', googleOAuthController);
router.post('/refresh-token', refreshTokenController);

export default router;
