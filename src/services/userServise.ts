import { useDatabase } from '../core/config/couchdb.js';
import { User } from '../models/User.js';
import { hashPassword } from '../utils/hash.js';
import { generateId } from '../utils/uuid.js';
import { userSchema } from '../schemas/userSchema.js';

const db = useDatabase();

// logic for checking uniqueness
const checkFieldUniqueness = async (
  field: string,
  value: string,
  excludeId: string,
): Promise<boolean> => {
  const result = await db.find({
    selector: {
      type: 'user',
      [field]: value,
      _id: { $ne: excludeId }, // Exclude the current user
    },
    limit: 1,
  });
  return result.docs.length > 0;
};

// logic for searching user by ID
export const findUserByIdFromDb = async (id: string): Promise<User | null> => {
  const result = await db.find({
    selector: {
      type: 'user',
      _id: id,
    },
    limit: 1,
    fields: ['_id', '_rev', 'type', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
  });

  if (result.docs.length === 0) {
    return null;
  }

  return result.docs[0] as User;
};
// logic for searching user by email
export const findUserByEmailFromDb = async (email: string): Promise<User | null> => {
  try {
    if (!email) {
       throw new Error('Email is required');
    }
      const userDoc = await db.find({
        selector: {
          type: 'user',
          email: { $eq: email },
        },
        limit: 1,
      });
    if (!userDoc) {
      return null;
    }
    return userDoc.docs[0] as User
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}

export const createUser = async (
  name: string,
  email: string,
  password: string,
  fullName: string,
  role: User['role'] = 'user',
): Promise<Pick<User, '_id' | 'name' | 'fullName' | 'role' | 'createdAt' | 'updatedAt'>> => {
  const now = new Date().toISOString();

  if (await checkFieldUniqueness('name', name, '')) {
    throw new Error('Username already taken');
  }

  if (await checkFieldUniqueness('email', email, '')) {
    throw new Error('Email already registered');
  }

  const allowedRoles: User['role'][] = ['user', 'member', 'admin', 'administrator'];
  if (!allowedRoles.includes(role)) {
    throw new Error('Invalid role');
  }

  if (!password) {
    throw new Error('Password is required');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  const passwordHash = await hashPassword(password);

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
  if (error) {
    throw new Error(`User validation failed: ${error.message}`);
  }

  try {
    await db.insert(user);
    const { _id, name, fullName, role, createdAt, updatedAt } = user;
    return { _id, name, fullName, role, createdAt, updatedAt };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('User creation failed');
  }
};

export const findUserById = async (id: string): Promise<User | null> => {
  try {
    const userDoc = await findUserByIdFromDb(id);

    if (!userDoc) {
      return null;
    }

    // Checking required fields
    const requiredFields = ['_id', 'name', 'email', 'createdAt', 'updatedAt'];
    const hasAllFields = requiredFields.every((field) => field in userDoc);

    if (!hasAllFields) {
      throw new Error('Missing required user fields');
    }

    return userDoc;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    return null;
  }
};

export const updateUserDetails = async (
  id: string,
  updateData: { name?: string; email?: string; fullName?: string; password: string },
): Promise<User | null> => {
  const userDoc = await findUserByIdFromDb(id);
  console.log(userDoc);
  if (!userDoc) {
    return null;
  }

  if (updateData.name && (await checkFieldUniqueness('name', updateData.name, id))) {
    throw new Error(`User with name ${updateData.name} already exists`);
  }

  if (updateData.email && (await checkFieldUniqueness('email', updateData.email, id))) {
    throw new Error(`User with email ${updateData.email} already exists`);
  }

  if (updateData.fullName && (await checkFieldUniqueness('fullName', updateData.fullName, id))) {
    throw new Error(`User with fullName ${updateData.fullName} already exists`);
  }
  if (updateData.password) {
    if (updateData.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    userDoc.passwordHash = await hashPassword(updateData.password);
  }
  userDoc.updatedAt = new Date().toISOString();

  if (updateData.name) userDoc.name = updateData.name;
  if (updateData.email) userDoc.email = updateData.email;
  if (updateData.fullName) userDoc.fullName = updateData.fullName;

  const { error } = userSchema.validate(updateData, { allowUnknown: true });
  if (error) {
    throw new Error(` `);
  }

  try {
    await db.insert(userDoc);
    return userDoc;
  } catch (error) {
    console.error('Error updating user details:', error);
    throw new Error('User update failed');
  }
};

export const deleteUser = async (id: string): Promise<User | null> => {
  const userDoc = await findUserByIdFromDb(id);
  if (!userDoc) {
    return null;
  }

  try {
    if (typeof userDoc._id !== 'string' || typeof userDoc._rev !== 'string') {
      throw new Error('User document is missing required _id or _rev');
    }
    await db.destroy(userDoc._id, userDoc._rev);
    return userDoc;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('User deletion failed');
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const result = await db.find({
      selector: { type: 'user' },
      fields: ['_id', 'name', 'email', 'role', 'fullName', 'createdAt', 'updatedAt'],
    });
    return result.docs as User[];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};
