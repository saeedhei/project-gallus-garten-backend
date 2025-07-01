import { Request, Response } from 'express';

interface AuthRequest extends Request {
  user?: { id: number; username: string };
}

export const getMe = (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  return res.json({ user: req.user });
};
