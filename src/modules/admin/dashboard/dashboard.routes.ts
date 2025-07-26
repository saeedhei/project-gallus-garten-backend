// src\modules\admin\dashboard.routes.ts
import express from 'express';
import passport from 'passport';
import usersRouter from './users.routes.js';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    message: 'Access granted to protected route',
    user: req.user,
  });
});

router.use('/users', passport.authenticate('jwt', { session: false }), usersRouter);
// router.use('/users', usersRouter);

export default router;

// dashboard.routes.ts: Handles routes related to the dashboard, such as:
// /dashboard
// /dashboard/stats
// /dashboard/settings
// /dashboard/users
