import { Request, Response } from 'express';
import { generateToken } from '../../../core/config/utils/jwt.js';
export const loginController = (req: Request, res: Response) => {
  const user = req.user as any;

  const token = generateToken({
    id: user._id,
    name: user.name,
    role: user.role,
  });

  res.json({ token });
};
