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
router.get('/getall', authenticateJWT, getAllUsersController);

router.post('/create',authenticateJWT,checkAdminRole, createUserController);
router.put('/update/:id', authenticateJWT,checkSelfOrAdmin, updateUserDetailsController);
router.get('/:id', authenticateJWT, findUserByIdController);

router.delete('/:id', authenticateJWT, deleteUserController);

export default router;
