import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt.js';
import { User } from '../models/User.js';
export const loginController = (req: Request, res: Response) => {
  const user = req.user as any;

  const token = generateToken({
    id: user._id,
    name: user.name,
    role: user.role,
  });

  res.json({ token });
};