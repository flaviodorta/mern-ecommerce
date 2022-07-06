import express from 'express';
import { authController } from '../controllers/auth.controller';
import { loginCheck, isAuth, isAdmin } from '../middleware/auth.middleware';

export const authRouter = express.Router();

authRouter.post('/isadmin', authController.isAdmin);
authRouter.post('/signup', authController.signup);
authRouter.post('/signin', authController.signin);
authRouter.post('/user', loginCheck, isAuth, isAdmin, authController.allUsers);
