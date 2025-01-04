import express from 'express';
import { registerUser, getUser } from './controllers/userController';
const router = express.Router();

router.post('/users/register', registerUser);
router.get('/users/:id', getUser);

export default router;
