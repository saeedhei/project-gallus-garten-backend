import passport from 'passport';
import { RequestHandler } from 'express';

export const authenticateJWT: RequestHandler = passport.authenticate('jwt', { session: false });
