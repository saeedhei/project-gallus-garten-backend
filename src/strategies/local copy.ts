// import { Strategy as LocalStrategy } from 'passport-local';
// import passport from 'passport';
// import { comparePassword } from '../utils/hash.js';
// import { UserService } from '../services/userServise.js';
// const userService = new UserService();

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'login',
//       passwordField: 'password',
//     },
//     async (login, password, done) => {
//       try {
//         const user = await userService.findUserByLogin(login);
//         if (!user) {
//           return done(null, false, { message: 'Incorrect login' });
//         }

//         const isMatch = await comparePassword(password, user.passwordHash);
//         if (!isMatch) {
//           return done(null, false, { message: 'Incorrect password' });
//         }

//         const { passwordHash, ...safeUser } = user;
//         return done(null, safeUser);
//       } catch (err) {
//         return done(err);
//       }
//     },
//   ),
// );

// src\strategies\local.ts
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';

// Static user with plain-text password
const STATIC_USER = {
  login: 'admin',
  password: 'admin123', // plain password (NOT hashed)
};

passport.use(
  new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'password',
    },
    async (login, password, done) => {
      try {
        // Check login
        if (login !== STATIC_USER.login) {
          return done(null, false, { message: 'Incorrect login' });
        }

        // Check plain password
        if (password !== STATIC_USER.password) {
          return done(null, false, { message: 'Incorrect password' });
        }

        // Avoid variable shadowing
        const { password: userPassword, ...safeUser } = STATIC_USER;
        return done(null, safeUser);
      } catch (err) {
        return done(err);
      }
    },
  ),
);
