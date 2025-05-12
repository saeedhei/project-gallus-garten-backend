import { Request, Response } from 'express';
import { PasswordService } from '../services/passwordServise.js';

export class PasswordController {
  private passwordService = new PasswordService();

  public requestReset = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ error: 'Login or email is required' });
        return;
      }

      await this.passwordService.requestPasswordReset(email);
      res.json({ message: 'Password reset link sent to email' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword) {
        res.status(400).json({ error: 'Token and new password are required' });
        return;
      }

      await this.passwordService.resetPassword(token, newPassword);
      res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
}
