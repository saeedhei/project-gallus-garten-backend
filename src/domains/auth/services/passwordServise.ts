import { EmailService } from './emailService.js';
import { hashPassword } from '../../../core/config/utils/hash.js';
import { generateToken, verifyToken } from '../../../core/config/utils/jwt.js';
import { User } from '../../user/models/User.js';
import { UserRepository } from '../../user/reposetories/userRepository.js';

export class PasswordService {
  private emailService = new EmailService();
  private userRepository = new UserRepository();
  private linkFE = 'http://localhost:3000/reset-password';

  public async requestPasswordReset(email: string): Promise<void> {
    const user = await this.userRepository.findByLogin(email);
    if (!user) {
      throw new Error('User with this email not found');
    }

    const token = generateToken({ id: user._id as string, name: user.name, role: user.role }, '5m');

    const resetLink = ` ${this.linkFE}?token=${token}`;
    const message = `To reset your password, click the link: ${resetLink}`;

    await this.emailService.sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: message,
    });
  }

  public async resetPassword(token: string, newPassword: string): Promise<User | null> {
    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    const payload = verifyToken(token);
    const user = await this.userRepository.findUserByID(payload.id);

    if (!user) {
      throw new Error('User not found');
    }

    user.passwordHash = await hashPassword(newPassword);
    user.updatedAt = new Date().toISOString();

    await this.userRepository.insert(user);
    return user;
  }
}
