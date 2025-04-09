import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';
export const checkAdminRole = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user as User;
  // console.log(user);
  if (!user || user.role !== 'administrator') {
    res.status(403).json({ error: 'Forbidden: Only administrators can perform this action' });
    return;
  }

  next();
};
export const checkSelfOrAdmin = (req: Request, res: Response, next: NextFunction):void => {
  const user = req.user as User;
    console.log(user);
  const { id } = req.params;
    console.log(id);
  if (user?.role === 'administrator' || user?._id === id) {
    return next();
  }
  res.status(403).json({ message: 'You can update only your own account' });
  return;
};