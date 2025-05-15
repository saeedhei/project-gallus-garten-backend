import { Router } from 'express';
import { loginController } from '../controller/authController.js';
import passport from 'passport';
const router = Router();
router.post('/login', passport.authenticate('local', { session: false }), loginController);
export default router