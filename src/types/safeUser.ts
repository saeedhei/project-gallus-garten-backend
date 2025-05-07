import { User } from "../models/User.js";
export type SafeUser = Omit<User, 'passwordHash'>;
