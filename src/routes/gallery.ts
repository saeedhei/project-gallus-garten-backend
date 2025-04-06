import express, { Request, Response } from 'express';
 import { useDatabase } from '../core/config/couchdb.js'; 

const router = express.Router();
// const db = useDatabase(process.env.DB_NAME || 'default_database_name');

router.get('/', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const tag = req.query.tag as string | undefined;
  const imagesPerPage = 15;

  try {
    const db = await useDatabase();
    // Base selector: Fetch only public images
    const selector: any = { isPublic: true };

    // Fix: Proper tag filtering
    if (tag) {
      selector.tags = { $in: [tag] }; // Checks if the tag exists in the array
    }

    // Query CouchDB with pagination
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
