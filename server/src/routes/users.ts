import express, { Router } from 'express';
import { usersController } from '../controllers/users';

export const usersRouter = express.Router();

usersRouter.get('/all-users', usersController.getAllUsers);

usersRouter.post('/single-user', usersController.getSingleUser);
usersRouter.post('/new-user', usersController.createNewUser);
usersRouter.post('/edit-accountd-details', usersController.editAccountDetails);
usersRouter.post('/edit-billing-address', usersController.editAddress);
usersRouter.post('/edit-primary-shipping-address', usersController.editAddress);
