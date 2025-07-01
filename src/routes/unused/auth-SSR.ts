import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login-failed',
    successRedirect: '/dashboard', // or send a JSON response
    failureFlash: false,
  }),
);
