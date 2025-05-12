import { Router } from 'express';
import { loginController } from '../controllers/authController.js';
import passport from 'passport';
const router = Router();
router.post('/login', passport.authenticate('local', { session: false }), loginController);
export default router