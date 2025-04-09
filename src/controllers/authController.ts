import { Request, Response } from 'express';
import { findUserByLogin } from '../services/userServise.js';
import { comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { login, password } = req.body;

  if (!login || !password) {
    res.status(400).json({ error: 'Login and password are required' });
    return;
  }

  try {
    const user = await findUserByLogin(login);

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = generateToken({
      id: user._id!,
      name: user.name,
      role: user.role,
    });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};