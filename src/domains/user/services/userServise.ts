import { hashPassword } from '../../../core/config/utils/hash.js';
import { generateId } from '../../../core/config/utils/uuid.js';
import { userSchema } from '../schemas/userSchema.js';
import { UserRepository } from '../reposetories/userRepository.js';
import { User } from '../models/User.js';

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async createUser(name: string, email: string, password: string, fullName: string) {
    const now = new Date().toISOString();

    if (await this.userRepo.checkFieldUniqueness('name', name, '')) {
      throw new Error('Username already taken');
    }
    if (await this.userRepo.checkFieldUniqueness('email', email, '')) {
      throw new Error('Email already registered');
    }
    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    const passwordHash = await hashPassword(password);
    const role: User['role'] = 'user';
    const user: User = {
      _id: generateId(),
      type: 'user',
      name,
      email,
      passwordHash,
      role,
      fullName,
      createdAt: now,
      updatedAt: now,
    };

    const { error } = userSchema.validate(user, { allowUnknown: true });
    if (error) throw new Error(`User validation failed: ${error.message}`);

    await this.userRepo.insert(user);
    const { _id, name: uname, fullName: fname, role: urole, createdAt, updatedAt } = user;
    return { _id, name: uname, fullName: fname, role: urole, createdAt, updatedAt };
  }

  async findUserById(id: string) {
    try {
      const user = await this.userRepo.findUserByID(id);
      if (!user) return null;

      const requiredFields = ['_id', 'name', 'email', 'createdAt', 'updatedAt'];
      const hasAllFields = requiredFields.every((field) => field in user);
      if (!hasAllFields) throw new Error('Missing required user fields');

      return user;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      return null;
    }
  }

  async findUserByLogin(login: string) {
    try {
      return await this.userRepo.findByLogin(login);
    } catch (error) {
      console.error('Error finding user by login:', error);
      return null;
    }
  }

  async updateUserDetails(
    id: string,
    updateData: { name?: string; email?: string; fullName?: string; password: string },
  ) {
    const user = await this.userRepo.findUserByID(id);
    if (!user) return null;

    const { name, email, fullName, password } = updateData;
    if (name && (await this.userRepo.checkFieldUniqueness('name', name, id))) {
      throw new Error(`User with name ${name} already exists`);
    }
    if (email && (await this.userRepo.checkFieldUniqueness('email', email, id))) {
      throw new Error(`User with email ${email} already exists`);
    }
    if (fullName && (await this.userRepo.checkFieldUniqueness('fullName', fullName, id))) {
      throw new Error(`User with fullName ${fullName} already exists`);
    }
    if (password && password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (password) user.passwordHash = await hashPassword(password);
    if (name) user.name = name;
    if (email) user.email = email;
    if (fullName) user.fullName = fullName;
    user.updatedAt = new Date().toISOString();

    const { error } = userSchema.validate(user, { allowUnknown: true });
    if (error) throw new Error(`User validation failed: ${error.message}`);

    await this.userRepo.insert(user);
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepo.findUserByID(id);
    if (!user) return null;

    if (typeof user._id !== 'string' || typeof user._rev !== 'string') {
      throw new Error('User document is missing required _id or _rev');
    }

    await this.userRepo.delete(user._id, user._rev);
    return user;
  }

  async getAllUsers() {
    try {
      return await this.userRepo.getAllUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }
}
