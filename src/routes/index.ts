import express, { Request, Response } from 'express';
import galleryRouter from './gallery';
import galleryFilter from './galleryFilter';
import adminDash from './adminDash';
import adminLogin from './adminLogin';
//import likes from './Likes';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response): void => {
  res.render('index', { title: 'Express' });
});

router.use('/api/images', galleryRouter);
router.use('/api/images/filter', galleryFilter);
//app.use('/api/likes/:id' , likes)
router.use('/api/adminPanelDash', adminDash);
router.use('/api/login', adminLogin);

export default router;
