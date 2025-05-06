import { Router } from 'express';
import { handleRequestReset, handleResetPassword } from '../controllers/passwordController.js';

const router = Router()

router.post('/request-reset', handleRequestReset)
router.post('/reset-password', handleResetPassword);

export default router