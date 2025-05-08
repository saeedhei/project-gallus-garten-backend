import { Request, Response } from 'express';
import { createUser, deleteUser, findUserById, getAllUsers, updateUserDetails } from '../services/userServise.js';

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, fullName } = req.body;
  try {
    const user = await createUser(name, email, password, fullName);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user', });
  }
};
export const findUserByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await findUserById(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error finding user by ID:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};


export const updateUserDetailsController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; 
  const { name, email, fullName,password } = req.body; 

  try {
    const updatedUser = await updateUserDetails(id, { name, email, fullName, password });
    res.status(200).json({ message: 'User details updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ error:'Failed to update user' });
  }
};


export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      res.status(404).json({ message: `User with id ${id} not found` });
      return;
    }
    res.status(200).json({ message: `User is deleted` , deletedUser});
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
export const getAllUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};