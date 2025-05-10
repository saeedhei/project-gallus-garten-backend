import { Router } from 'express';
import { loginController } from '../controllers/authController.js';
import passport from 'passport';
const router = Router();
router.post('v1/login', passport.authenticate('local', { session: false }), loginController);
export default router