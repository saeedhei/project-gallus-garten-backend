import bcrypt from 'bcrypt';
export const hashPassword = async (password: string) => bcrypt.hash(password, 10);
export const comparePassword = async (plain: string, hash: string) => bcrypt.compare(plain, hash);
