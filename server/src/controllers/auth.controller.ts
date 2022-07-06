import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
    let { email, password, cPassword } = req.body;
    let error = {};
    if (!email || !password || !cPassword) {
      error = {
        ...error,
        email: 'Filed must not be empty',
        password: 'Filed must not be empty',
        cPassword: 'Filed must not be empty',
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
              let newUser = new userModel({
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
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: 'Fields must not be empty',
      });
    }

    try {
      const userFound = await userModel.findOne({ email: email });
      if (!userFound) {
        return res.json({ error: 'Invalid email or password.' });
      } else {
        const loginSuccess = await bcrypt.compare(password, userFound.password);
        if (loginSuccess) {
          const token = jwt.sign(
            {
              _id: userFound._id,
              role: userFound.userRole,
            },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: 'Invalid email or password.',
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export const authController = AuthController.getInstance();
