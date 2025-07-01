import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, (payload, done) => {
    // Normally you'd look up user in DB — here it's static:
    if (payload.login === 'admin') {
      return done(null, { login: 'admin' });
    } else {
      return done(null, false);
    }
  }),
);
