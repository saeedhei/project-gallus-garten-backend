// src\modules\admin\dashboard.routes.ts
import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    message: 'Access granted to protected route',
    user: req.user,
  });
});

export default router;

// dashboard.routes.ts: Handles routes related to the dashboard, such as:
// /dashboard
// /dashboard/stats
// /dashboard/settings
