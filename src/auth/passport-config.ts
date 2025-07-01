import { Strategy as LocalStrategy } from 'passport-local';
import { adminUser, verifyUser } from './config.js';
// import bcrypt from 'bcrypt';

export const initializePassport = (passport: any) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      try {
        const user = verifyUser(username, password);
        if (!user) {
          return done(null, false, { message: 'نام کاربری یا رمز عبور نادرست' });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: any) => {
    try {
      if (id === adminUser.id) {
        done(null, adminUser);
      } else {
        done(new Error('کاربر یافت نشد'));
      }
    } catch (error) {
      done(error);
    }
  });
};
