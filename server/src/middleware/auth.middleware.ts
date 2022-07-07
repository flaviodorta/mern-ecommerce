import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/keys';
import { userModel } from '../models/user.model';

class AuthMiddleware {
  private static instance: AuthMiddleware | null = null;

  public static getInstance(): AuthMiddleware {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  loginCheck(req: Request, res: Response, next: NextFunction) {
    try {
      let token = [...req.headers.token].join('') as string;
      token = token.replace('Bearer', '');
      let decode = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
      req.userDetails = decode;
      next();
    } catch (err) {
      res.json({
        error: 'You must be logged in',
      });
    }
  }

  isAuth(req: Request, res: Response, next: NextFunction) {
    let { loggedInUserId } = req.body;
    if (
      !loggedInUserId ||
      !req.userDetails._id ||
      loggedInUserId !== req.userDetails._id
    ) {
      res.status(403).json({ error: 'You are not authenticate' });
    }
    next();
  }

  async isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      let reqUser = await userModel.findById(req.body.loggedInUserId);
      if (reqUser.userRole === 'user') {
        res.status(403).json({ error: 'Access denied' });
      }
      next();
    } catch {
      res.status(404);
    }
  }
}

export const authMiddleware = AuthMiddleware.getInstance();
