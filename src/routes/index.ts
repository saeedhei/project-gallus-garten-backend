// src\routes\index.ts
import express, { Request, Response } from 'express';
// import galleryRouter from './gallery.js';
// import galleryCategories from './galleryCategories.js';
// import adminDash from './adminDash.js';
// import adminLogin from './adminLogin.js';
// import yearRoutes from './yearRoutes.js';
// import categoryRoutes from './categoryRoutes.js';

// // import userRouter from './userRoutes.js';
// import loginRouter from './authRouter.js';
// import passwordRouter from './passwordRoutes.js';

import authRoutes from '../modules/admin/auth.routes.js';
import dashboardRoutes from '../modules/admin/dashboard.routes.js';

const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response): void => {
  res.render('index', { title: 'Express' });
});
// router.use('/api', yearRoutes);
// router.use('/api', categoryRoutes);
// router.use('/api/images', galleryRouter);
// router.use('/api/images/filter', galleryCategories);
// router.use('/api/adminPanelDash', adminDash);
// router.use('/api/login', adminLogin);

// router.use('/', userRouter);
// router.use('/v1/user', loginRouter);
// router.use('/v1', passwordRouter);

router.use('/v3/auth/login', authRoutes);
router.use('/v3/dashboard', dashboardRoutes);

export default router;
