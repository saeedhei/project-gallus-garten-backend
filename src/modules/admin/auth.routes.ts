import express, { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const GALLUS_ADMIN_USER = process.env.GALLUS_ADMIN_USER;
const GALLUS_ADMIN_PASSWORD = process.env.GALLUS_ADMIN_PASSWORD;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set!');
}

if (!GALLUS_ADMIN_USER || !GALLUS_ADMIN_PASSWORD) {
  throw new Error('GALLUS_ADMIN_USER or GALLUS_ADMIN_PASSWORD environment variable is not set!');
}

const loginHandler: RequestHandler = (req, res) => {
  const { login, password } = req.body;

  if (login !== GALLUS_ADMIN_USER || password !== GALLUS_ADMIN_PASSWORD) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ login }, JWT_SECRET, { expiresIn: '30m' });
  res.json({ token });
};

// that's for router.use('/v3/auth/login',
router.post('/', loginHandler);

export default router;

// auth.routes.ts: Handles authentication-related routes, such as:
// /login
// /register
// /logout
// /refresh-token (if you're using refresh tokens)
