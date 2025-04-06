import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  findUserByIdController,
  getAllUsersController,
  updateUserDetailsController,
} from '../controllers/userController.js';
import { checkAdminRole } from '../middlewares/checkAdminRole.js';
const router = Router();
router.get('/getall', getAllUsersController);

router.post('/create',checkAdminRole, createUserController);
router.put('/update/:id', updateUserDetailsController);
router.get('/:id', findUserByIdController);

router.delete('/:id', deleteUserController);

export default router;
