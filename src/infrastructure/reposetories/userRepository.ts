import { useDatabase } from "../../core/config/couchdb.js";
import { User } from "../../models/User.js";

export class UserRepository {
  private db = useDatabase();
  async checkFieldUniqueness(field: string, value: string, excludeId: string): Promise<boolean> {
    const resalt = await this.db.find({
      selector: {
        type: 'user',
        [field]: value,
        _id: { $ne: excludeId },
      },
      limit: 1,
    });
    return resalt.docs.length > 0;
  }
  async findUserByID(id: string): Promise<User | null> {
    const resalt = await this.db.find({
      selector: {
        type: 'user',
        _id: id,
      },
      limit: 1,
      fields: ['_id', '_rev', 'type', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
    });
    return (resalt.docs[0] as User) || null;
  }
  async findByLogin(login: string): Promise<User | null> {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
    const selectorField = isEmail ? 'email' : 'name';
    const result = await this.db.find({
      selector: { type: 'user', [selectorField]: { $eq: login } },
      limit: 1,
    });
    return (result.docs[0] as User) || null;
  }
  async insert(user: User): Promise<void> {
    await this.db.insert(user);
  }

  async delete(_id: string, _rev: string): Promise<void> {
    await this.db.destroy(_id, _rev);
  }

  async getAllUsers(): Promise<User[]> {
    const result = await this.db.find({
      selector: { type: 'user' },
      fields: ['_id', 'name', 'email', 'role', 'fullName', 'createdAt', 'updatedAt'],
    });
    return result.docs as User[];
  }
}