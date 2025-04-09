import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { findUserByIdFromDb } from '../../../services/userServise.js';
import { User } from '../../../models/User.js';
const SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
export interface JwtPayload {
  id: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
}
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

passport.use(
  new JwtStrategy(
    opts,
    async (jwt_payload: JwtPayload, done: (error: any, user?: User | false) => void) => {
      try {
        const user = await findUserByIdFromDb(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

export default passport;
