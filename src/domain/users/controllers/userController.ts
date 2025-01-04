import { Request, Response } from 'express';
import UserService from '../services/userService';

const userService = new UserService();

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json(user); // Send the response, no need to return
  } catch (error: any) {
    res.status(400).json({ message: error.message }); // Send error response, no need to return
  }
};

// Get a user by ID
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' }); // Send response, no need to return
      return; // Exit early if user is not found
    }
    res.json(user); // Send the user data as response
  } catch (error: any) {
    res.status(400).json({ message: error.message }); // Send error response, no need to return
  }
};
