import { Request, Response, NextFunction } from 'express';

export const checkAdminRole = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user as { role: string };
  // console.log(user)
  if (!user || user.role !== 'administrator') {
    res.status(403).json({ error: 'Forbidden: Only administrators can perform this action' });
    return;
  }

  next();
};