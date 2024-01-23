import express from 'express';
import { getUserController, getMentorsController } from '../controllers/userController';

const router = express.Router();

router.get('/user/:id', getUserController);
router.get('/user/:id/mentors', getMentorsController);

export default router;