import express, { Request, Response } from 'express';
import galleryRouter from './gallery';
import galleryCategories from './galleryCategories';
import adminDash from './adminDash';
import adminLogin from './adminLogin';
import yearRoutes from './yearRoutes';
import categoryRoutes from './categoryRoutes';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response): void => {
  res.render('index', { title: 'Express' });
});
router.use('/api', yearRoutes);
router.use('/api', categoryRoutes);
router.use('/api/images', galleryRouter);
router.use('/api/images/filter', galleryCategories);
router.use('/api/adminPanelDash', adminDash);
router.use('/api/login', adminLogin);

export default router;
