import express from 'express';
import { getUserController } from '../controllers/userController';

const router = express.Router();

router.get('/user/:id', getUserController);

export default router;