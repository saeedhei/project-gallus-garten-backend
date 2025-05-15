import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms'; 

const SECRET: Secret = process.env.JWT_SECRET || 'your_jwt_secret_key';

export interface IJwtPayload {
  id: string;
  name: string;
  role: string;
}

export const generateToken = (
  payload: IJwtPayload,
  expiresIn: number | StringValue = '1h',
): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET, options);
};

export const verifyToken = (token: string): IJwtPayload => {
  return jwt.verify(token, SECRET) as IJwtPayload;
};