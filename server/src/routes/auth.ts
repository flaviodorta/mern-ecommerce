import express from 'express';
import { authController } from '../controllers/auth';
import { loginCheck, isAuth, isAdmin } from '../middleware/auth';

export const router = express.Router();

router.post('/isadmin', authController.isAdmin);
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

router.post('/user', loginCheck, isAuth, isAdmin, authController.allUsers);
