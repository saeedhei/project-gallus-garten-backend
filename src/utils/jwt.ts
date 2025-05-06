// import jwt from 'jsonwebtoken';

// const SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// export interface JwtPayload {
//   id: string;
//   name: string;
//   role: string;
// }

// export const generateToken = (payload: JwtPayload): string => {
//   return jwt.sign(payload, SECRET, { expiresIn: '1h' });
// };
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms'; 

const SECRET: Secret = process.env.JWT_SECRET || 'your_jwt_secret_key';

export interface JwtPayload {
  id: string;
  name: string;
  role: string;
}

export const generateToken = (
  payload: JwtPayload,
  expiresIn: number | StringValue = '1h',
): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, SECRET) as JwtPayload;
};