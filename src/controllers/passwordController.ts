import { Request, Response } from 'express';
import { requestPasswordReset, resetPassword } from '../services/passwordServise.js';

export const handleRequestReset = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Login or email is required' });
      return
    }

    await requestPasswordReset(email);
    res.json({ message: 'Password reset link sent to email' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const handleResetPassword = async (req: Request, res: Response):Promise<void> => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      res.status(400).json({ error: 'Token and new password are required' });
      return
    }

    await resetPassword(token, newPassword);
    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};