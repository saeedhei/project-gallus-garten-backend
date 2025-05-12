import { useDatabase } from '../core/config/couchdb.js';
// import { sendEmail } from '../core/config/mailer/mailer.js';
import { EmailService } from './emailService.js';
import { hashPassword } from '../utils/hash.js';
import { User } from '../models/User.js';
import { generateToken, verifyToken } from '../utils/jwt.js';

const db = useDatabase();
const linkFE = 'http://localhost:3000/reset-password';

const emailService= new EmailService()
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
    console.log(user)
     const token = generateToken(
       { id: user._id as string, name: user.name, role: user.role },
       '5m',
     );
     const resetLink = `${linkFE}?token=${token}`;
     const message = `To reset your password, click the link: ${resetLink}`;
    
       await emailService.sendEmail({
         to: user.email,
         subject: 'Password Reset Request',
         text: message,
       });
     


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
