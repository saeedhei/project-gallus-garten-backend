import { Request, Response, NextFunction } from 'express';
import { findUserByIdFromDb } from '../services/userServise.js';

export const checkAdminRole = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized: Missing user ID' });
     return;
  }

  const user = await findUserByIdFromDb(userId);

  if (!user || user.role !== 'administrator') {
     res
      .status(403)
      .json({ error: 'Forbidden: Only administrators can perform this action' });
    return;
  }

  next();
};
