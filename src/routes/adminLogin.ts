import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import jwt from 'jsonwebtoken';

const app = express();
const router = express.Router();

const { GALLUS_ADMIN_USER, GALLUS_ADMIN_PASSWORD, JWT_SECRET } = process.env;
if (!GALLUS_ADMIN_USER || !GALLUS_ADMIN_PASSWORD || !JWT_SECRET) {
  throw new Error('Required environment variables are not set.');
}

// console.log('GALLUS_ADMIN_USER:', GALLUS_ADMIN_USER);
// console.log('GALLUS_ADMIN_PASSWORD:', GALLUS_ADMIN_PASSWORD);
// console.log('JWT_SECRET:', JWT_SECRET);

// Passport Local Strategy
passport.use(
  new LocalStrategy(async (username: string, password: string, done: any) => {
    try {
      // console.log('Checking username:', username);
      if (username !== GALLUS_ADMIN_USER) {
        console.log('Invalid username');
        return done(null, false, { message: 'Invalid username or password' });
      }

      if (password !== GALLUS_ADMIN_PASSWORD) {
        // console.log('Invalid password');
        return done(null, false, { message: 'Invalid username or password' });
      }

      // console.log('Login successful');
      return done(null, { username });
    } catch (err) {
      console.error('Error during authentication:', err);
      return done(err);
    }
  }),
);
passport.serializeUser((user: any, done) => done(null, user.username));
passport.deserializeUser((username: string, done) => done(null, { username }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6000 },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Login Route
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      console.error('Authentication Error:', err);
      return next(err);
    }
    if (!user) {
      // console.log('User not found:', info.message);
      return res.status(401).json({ success: false, message: info.message });
    }

    try {
      const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '30m' });
      // console.log('Generated Token:', token);

      res.status(200).json({ success: true, token, message: 'Login successful' });
    } catch (error) {
      console.error('JWT Signing Error:', error);
      res.status(500).json({ success: false, message: 'Failed to generate token' });
    }
  })(req, res, next);
});

const ensureAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    // console.log('No token provided');
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { exp: number; username: string };

    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      console.log('Token expired');
      res.status(401).json({ message: 'Session expired. Please log in again.' });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(400).json({ message: 'Invalid token.' });
    return;
  }
};

// Protected Route
router.get('/dashboard', ensureAuthenticated, (req: Request & { user?: any }, res: Response) => {
  res.json({ message: `Welcome, ${req.user?.username || 'Guest'}!` });
});

export default router;
