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
      res.json({ users: allUsers });
    } catch {
      res.status(404);
    }
  }

  async signup(req: Request, res: Response) {
    let { email, password } = req.body;
    let error = {};
    if (!email || !password) {
      error = {
        ...error,
        email: 'Filed must not be empty',
        password: 'Filed must not be empty',
      };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        if (password.length > 255 || password.length < 8) {
          error = {
            ...error,
            password: 'Password must be 8 characters',
            email: '',
          };
          return res.json({ error });
        } else {
          try {
            const salt = bcrypt.genSaltSync(10);
            password = bcrypt.hashSync(password, salt);
            const userFound = await userModel.findOne({ email: email });
            if (userFound) {
              error = {
                ...error,
                email: 'Email already exists',
                password: '',
              };
              return res.json({ error });
            } else {
              const id = uuid();
              let newUser = new userModel({
                id: id,
                email,
                password,
                userRole: 1, // 1 for admin, 0 for user
              });
              newUser
                .save()
                .then(() => {
                  return res.json({
                    success: 'Account create successfully. Please login.',
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        error = {
          ...error,
          password: '',
          email: 'Email is not valid.',
        };
      }
    }
  }

  async signin(req: Request, res: Response) {
    let { email, candidatePassword } = req.body;
    let errors = {};
    if (!email) {
      errors = { ...errors, emptyEmail: 'Email must not be empty' };
    }
    if (!candidatePassword) {
      errors = { ...errors, emptyPassword: 'Password must not be empty' };
    }
    if (!email || !candidatePassword) {
      return res.json({ errors });
    }

    try {
      const userFound = await userModel.findOne({ email: email });
      if (!userFound) {
        errors = { ...errors, userNotFound: 'Email not found' };
        return res.json({ errors });
      }

      const isPasswordValid = await bcrypt.compare(
        candidatePassword,
        userFound.password
      );
      if (!isPasswordValid) {
        errors = { ...errors, invalidPassword: 'Invalid password' };
        return res.json({ errors });
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
      console.log(err);
      errors = err;
      res.json({ erros });
    }
  }
}

export const authController = AuthController.getInstance();
