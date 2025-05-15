import { Router } from 'express';
import { PasswordController } from '../controllers/passwordController.js';
// import { handleRequestReset, handleResetPassword } from '../controllers/passwordController.js';
const passwordController = new PasswordController()
const router = Router()

router.post('/request-reset', passwordController.requestReset)
router.post('/reset-password', passwordController.resetPassword);

export default router