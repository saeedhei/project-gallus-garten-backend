import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { comparePassword } from '../../utils/hash.js';
import { UserService } from '../../../../domains/user/services/userServise.js';
const userService = new UserService();

passport.use(
  new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'password',
    },
    async (login, password, done) => {
      try {
        const user = await userService.findUserByLogin(login);
        if (!user) {
          return done(null, false, { message: 'Incorrect login' });
        }

        const isMatch = await comparePassword(password, user.passwordHash);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }

        const { passwordHash, ...safeUser } = user;
        return done(null, safeUser);
      } catch (err) {
        return done(err);
      }
    },
  ),
);
