import { useDatabase } from '../core/config/couchdb.js';
import { sendEmail } from '../core/config/mailer/mailet.js';
import { findUserByLogin } from '../services/userServise.js';
import { hashPassword } from '../utils/hash.js';
import { userSchema } from '../schemas/userSchema.js';
import { User } from '../models/User.js';
import { generateToken, verifyToken } from '../utils/jwt.js';

const db = useDatabase();

export const requestPasswordReset = async (email: string): Promise<void> => {
  const result = await db.find({
    selector: {
      type: 'user',
      email: email,
    },
    limit: 1,
  });
  const user = result.docs[0] as User;
  if (!user) {
    throw new Error('User with this email not foud');
  }
  const token = generateToken({ id: user._id as string, name: user.name, role: user.role }, '5m');
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  const message = `To reset your password, click the link: ${resetLink}`;
  await sendEmail({
    to: user.email,
    subject: 'Password Reset Request',
    text: message,
  });
};

