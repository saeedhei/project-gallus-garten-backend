export interface User {
  _id?: string;
  _rev?: string;
  type: 'user';
  name: string;
  email: string;
  passwordHash: string;
  role: 'administrator' | 'admin' | 'member' | 'user';
  fullName: string;
  createdAt: string;
  updatedAt: string;
}

