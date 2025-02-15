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

///////////////
import axios from 'axios';
const { DB_USER, DB_PASS } = process.env;
const auth = Buffer.from(`${DB_USER}:${DB_PASS}`).toString('base64');

const headers = {
  Authorization: `Basic ${auth}`,
};

router.get('/api/c', async (req: Request, res: Response): Promise<void> => {
  try {
    const url =
      'https://couchdb.seointro.de/gallusgarten/_design/categories/_list/format_categories/unique_categories?group=true';

    const response = await axios.get(url, { headers });

    if (!response.data) {
      res.status(404).json({ error: 'Categories not found' });
      return;
    }

    res.json(response.data);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  }
});

router.get('/api/i', async (req: Request, res: Response): Promise<void> => {
  const { category, page = '1', limit = '15' } = req.query;

  try {
    const url = `https://couchdb.seointro.de/gallusgarten/_design/images/_view/by_category`;

    // Make sure to send the right parameters for pagination and filtering
    const response = await axios.get(url, {
      headers,
      params: {
        key: JSON.stringify(category), // Filter images by category
        limit: parseInt(limit as string, 10),
        skip: (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10),
        include_docs: true, // Include the full document (if you want to access more fields in the future)
      },
    });

    if (!response.data || !response.data.rows) {
      res.status(404).json({ error: 'Images not found' });
      return;
    }

    const images = response.data.rows.map((row: any) => ({
      id: row.id,
      url: row.value.url,
    }));

    res.json({ images });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to fetch images' });
    }
  }
});
/////////////////////////////

export default router;
