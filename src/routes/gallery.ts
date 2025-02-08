import express, { Request, Response } from 'express';
import { useDatabase } from '../db/couchdb';

const router = express.Router();
const dbName = 'gallusgarten';
const db = useDatabase(dbName);

router.get('/', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const tag = req.query.tag as string | undefined;
  const imagesPerPage = 15;

  try {
    const selector: any = { isPublic: true };
    if (tag) {
      selector.tags = { $elemMatch: tag };
    }

    const response = await db.find({
      selector: selector,
      limit: imagesPerPage,
      skip: (page - 1) * imagesPerPage,
    });

    res.json({
      images: response.docs,
      currentPage: page,
      totalImages: response.docs.length,
      hasMore: response.docs.length === imagesPerPage, // If less than `imagesPerPage`, no more data
    });
  } catch (error) {
    console.error('Error fetching images from CouchDB:', error);
    res.status(500).json({ message: 'Error fetching images', error });
  }
});

export default router;
