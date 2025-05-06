import { useDatabase } from '../core/config/couchdb.js';
import { sendEmail } from '../core/config/mailer/mailet.js';
import { hashPassword } from '../utils/hash.js';
import { User } from '../models/User.js';
import { generateToken, verifyToken } from '../utils/jwt.js';

const db = useDatabase();
const linkFE = 'http://localhost:3000/reset-password';
export const requestPasswordReset = async (email: string): Promise<void> => {
  try {
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
     const token = generateToken(
       { id: user._id as string, name: user.name, role: user.role },
       '5m',
     );
     const resetLink = `${linkFE}?token=${token}`;
     const message = `To reset your password, click the link: ${resetLink}`;
     if (process.env.NODE_ENV === 'development') {
       await sendEmail({
         to: user.email,
         subject: 'Password Reset Request',
         text: message,
       });
     } else {
       console.log('[INFO] Skipping email sending - NODE_ENV is not development');
     }


  } catch (error) {
    console.error('Error during password reset request:', error);
    throw new Error('Failed to process password reset request');

  }
 
};

export const resetPassword = async (token: string, newPassword: string): Promise<User | null> => {
  if (newPassword.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  const payload = verifyToken(token);
  const userId = payload.id;

  const result = await db.find({
    selector: {
      type: 'user',
      _id: userId,
    },
    limit: 1,
  });

  const user = result.docs[0] as User;
  if (!user) {
    throw new Error('User not found');
  }
  if (newPassword.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  user.passwordHash = await hashPassword(newPassword);
  user.updatedAt = new Date().toISOString();

  try {
    await db.insert(user);
    return user;
  } catch (error) {
    console.error('Error updating user details:', error);
    throw new Error('User update failed');
  }
};
