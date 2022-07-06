import express from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const authRouter = express.Router();

authRouter.post('/isadmin', authController.isAdmin);
authRouter.post('/signup', authController.signup);
authRouter.post('/signin', authController.signin);
authRouter.post(
  '/user',
  authMiddleware.loginCheck,
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  authController.allUsers
);
