import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomUUID as uuid } from 'crypto';
import { Request, Response } from 'express';

import { validateEmail } from '../utils/helperFunctions';
import { userModel } from '../models/user.model';
import { JWT_SECRET } from '../config/keys';

class AuthController {
  private static instance: AuthController | null = null;

  public static getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  async isAdmin(req: Request, res: Response) {
    let { loggedInUserId } = req.body;

    try {
      let loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch {
      res.status(404);
    }
  }

  async allUsers(req: Request, res: Response) {
    try {
      let allUsers = await userModel.find({});
      return res.json({ users: allUsers });
    } catch {
      return res.status(404).json({ error: "Don't exist users" });
    }
  }

  async signUp(req: Request, res: Response) {
    let { email, password } = req.body;
    let error = {};

    if (!email) {
      error = { ...error, emptyEmail: 'Email field must not be empty' };
    }
    if (!password) {
      error = { ...error, emptyPassword: 'Password field must not be empty' };
    }
    if (!email || !password) {
      return res.json({ error });
    }

    if (!validateEmail(email)) {
      error = { ...error, invalidEmail: 'Email is not valid' };
      return res.json({ error });
    }

    if (password.length > 255 || password.length < 8) {
      error = {
        ...error,
        invalidPassword: 'Password must be between 8-255 characters',
      };
      return res.json({ error });
    }

    try {
      const passwordSalt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, passwordSalt);
      const user = await userModel.findOne({ email });

      if (user) {
        error = {
          ...error,
          invalidUser: 'There is already a user with that email',
        };
        return res.json({ error });
      }

      const id = uuid();
      const newUser = new userModel({
        id: id,
        email,
        hashedPassword,
        userRole: 'user',
      });

      newUser.save().then(() => {
        return res.json({ success: 'Account created successfully.' });
      });
    } catch (err) {
      error = { ...error, catchErr: err };
      return res.json({ error });
    }
  }

  async signIn(req: Request, res: Response) {
    let { email, candidatePassword } = req.body;
    let error = {};
    if (!email) {
      error = { ...error, emptyEmail: 'Email must not be empty' };
    }
    if (!candidatePassword) {
      error = { ...error, emptyPassword: 'Password must not be empty' };
    }
    if (!email || !candidatePassword) {
      return res.json({ error });
    }

    try {
      const userFound = await userModel.findOne({ email: email });
      if (!userFound) {
        error = { ...error, userNotFound: 'Email not found' };
        return res.json({ error });
      }

      const isPasswordValid = await bcrypt.compare(
        candidatePassword,
        userFound.password
      );
      if (!isPasswordValid) {
        error = { ...error, invalidPassword: 'Invalid password' };
        return res.json({ error });
      }

      const token = jwt.sign(
        {
          id: userFound.id,
          role: userFound.userRole,
        },
        JWT_SECRET
      );
      const encode = jwt.verify(token, JWT_SECRET);
      return res.json({
        token: token,
        user: encode,
      });
    } catch (err) {
      error = { ...error, catchErr: err };
      return res.json({ error });
    }
  }
}

export const authController = AuthController.getInstance();
