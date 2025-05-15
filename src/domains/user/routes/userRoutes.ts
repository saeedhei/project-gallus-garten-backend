import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { authenticateJWT } from '../../../core/config/middlewares/authMiddleware.js';
import { checkSelfOrAdmin } from '../../../core/config/middlewares/checkAdminRole.js';

const router = Router();
const userController = new UserController();

router.get('/v1/getall', authenticateJWT, userController.getAllUsers);
router.post('/v1/create', userController.createUser);
router.put('/v1/update/:id', authenticateJWT, checkSelfOrAdmin, userController.updateUserDetails);
router.get('/v1/:id', authenticateJWT, userController.findUserById);
router.delete('/v1/:id', authenticateJWT, userController.deleteUser);

export default router;
