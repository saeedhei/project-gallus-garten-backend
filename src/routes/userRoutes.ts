import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  findUserByIdController,
  getAllUsersController,
  updateUserDetailsController,
} from '../controllers/userController.js';
import { checkAdminRole, checkSelfOrAdmin } from '../middlewares/checkAdminRole.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
const router = Router();
router.get('/v1/getall', authenticateJWT, getAllUsersController);

router.post('/v2/create', createUserController);
router.put('/v1/update/:id', authenticateJWT,checkSelfOrAdmin, updateUserDetailsController);
router.get('/v1/:id', authenticateJWT, findUserByIdController);

router.delete('/v1/:id', authenticateJWT, deleteUserController);

export default router;
