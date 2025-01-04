import UserRepository from '../repositories/userRepository'; // Import the UserRepository
import User from '../models/user'; // Import the User model

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Register a new user
  async register(user: User): Promise<User> {
    // Check if the user with the same email already exists
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new Error('Email already in use.'); // Throw error if email is already taken
    }
    // If user doesn't exist, create a new user
    return await this.userRepository.create(user);
  }

  // Get a user by their ID
  async getUserById(userId: string): Promise<User | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`); // Throw error if user not found
    }
    return user;
  }

  // Update user details
  async updateUser(user: User): Promise<User> {
    if (!user._id || !user._rev) {
      throw new Error('User ID and revision are required for updating.'); // Ensure _id and _rev are provided for updates
    }
    return await this.userRepository.update(user); // Update user in the repository
  }

  // Delete a user by their ID and revision
  async deleteUser(userId: string, rev: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`); // Throw error if user not found
    }
    await this.userRepository.delete(userId, rev); // Delete user from the repository
  }

  // Get all users (pagination is possible)
  async getAllUsers(limit: number = 10, skip: number = 0): Promise<User[]> {
    return await this.userRepository.findAll(limit, skip); // Get all users from the repository
  }
}

export default UserService;
