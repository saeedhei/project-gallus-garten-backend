import express, { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod'; // برای اعتبارسنجی نوع‌محور
import { fromZodError } from 'zod-validation-error'; // مدیریت خطاهای خوانا

import rateLimit from 'express-rate-limit'; // محافظت در برابر brute-force
import 'dotenv/config';
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('❌ JWT_SECRET must be defined in .env');

// 2. اعتبارسنجی نوع‌محور با Zod
const LoginSchema = z.object({
  login: z.string().min(3).max(20),
  password: z.string().min(8).max(100),
});

// 3. محدودیت نرخ درخواست
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقیقه
  max: 5, // حداکثر 5 درخواست
});

// 4. هندلر لاگین (با تایپ‌های دقیق)
const loginHandler: RequestHandler = async (req, res, next) => {
  try {
    // 1. Validate input
    const { login, password } = LoginSchema.parse(req.body);

    // 2. Authenticate (in real apps, use database + bcrypt)
    const isValid = await authenticate(login, password);
    if (!isValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // 3. Create JWT token
    const token = jwt.sign({ sub: login, iat: Math.floor(Date.now() / 1000) }, JWT_SECRET, {
      expiresIn: '15m',
      algorithm: 'HS256',
    });

    // 4. Set secure HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // 5. Send success response (no return needed)
    res.json({ success: true });
  } catch (err) {
    // 6. Handle validation errors
    if (err instanceof z.ZodError) {
      res.status(400).json({
        error: 'Validation failed',
        details: fromZodError(err).message,
      });
      return;
    }

    // 7. Pass other errors to error handler
    next(err);
  }
};

// 9. Route با محافظت ضد حملات brute-force
router.post('/login', limiter, loginHandler);

// 10. تابع احراز هویت مجزا (برای تست‌پذیری)
async function authenticate(login: string, password: string): Promise<boolean> {
  // در واقعیت باید از دیتابیس + bcrypt استفاده شود
  const STATIC_USER = {
    login: process.env.ADMIN_LOGIN || 'admin',
    passwordHash: await hashPassword(process.env.ADMIN_PASSWORD || 'admin123'),
  };

  return login === STATIC_USER.login && (await comparePassword(password, STATIC_USER.passwordHash));
}

// 11. توابع کمکی امنیتی
async function hashPassword(pwd: string): Promise<string> {
  const bcrypt = await import('bcrypt');
  return bcrypt.hash(pwd, 12);
}

async function comparePassword(pwd: string, hash: string): Promise<boolean> {
  const bcrypt = await import('bcrypt');
  return bcrypt.compare(pwd, hash);
}

export default router;
