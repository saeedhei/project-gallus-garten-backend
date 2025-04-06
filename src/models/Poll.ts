export interface User {
  _id?: string;
  _rev?: string;
  type: 'user'; 
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}
