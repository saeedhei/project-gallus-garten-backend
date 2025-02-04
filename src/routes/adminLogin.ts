import 'dotenv/config';
import express, { Request, Response } from 'express';

const router = express.Router();

const { GALLUS_ADMIN_USER, GALLUS_ADMIN_PASSWORD } = process.env;

router.post('/', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === GALLUS_ADMIN_USER && password === GALLUS_ADMIN_PASSWORD) {
    res.status(200).json({ message: 'Login successful' });
  }

  res.status(401).json({ message: 'Invalid username or password' });
});

export default router;
