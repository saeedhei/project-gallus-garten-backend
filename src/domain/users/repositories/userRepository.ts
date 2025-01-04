import {
  insertDocument,
  getDocument,
  findDocuments,
  updateDocument,
  deleteDocument,
} from '../../../infrastructure/database/couchHelper';

import User from '../models/user'; // Default import

class UserRepository {
  private readonly dbName = 'gallusgarten'; // Not needed in insertDocument anymore

  async create(user: User): Promise<User> {
    // Now passing only the user document to insertDocument
    const response = await insertDocument(user); // Insert user into CouchDB
    return { ...user, _id: response.id, _rev: response.rev }; // Return user with _id and _rev
  }

  async findById(id: string): Promise<User | null> {
    return await getDocument<User>(id); // Get user by ID
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = { selector: { email }, limit: 1 };
    const result = await findDocuments<User>(query); // Find users with email
    return result.length > 0 ? result[0] : null; // Return first user found or null
  }

  async update(user: User): Promise<User> {
    if (!user._id || !user._rev) {
      throw new Error('User ID and revision are required for updates.');
    }
    // Update user document
    const response = await updateDocument(user);
    return { ...user, _rev: response.rev }; // Return updated user
  }

  async delete(id: string, rev: string): Promise<void> {
    await deleteDocument(id, rev); // Delete user by id and rev
  }

  async findAll(limit: number = 10, skip: number = 0): Promise<User[]> {
    const query = { selector: {}, limit, skip };
    return await findDocuments<User>(query); // Find all users
  }
}

export default UserRepository;
