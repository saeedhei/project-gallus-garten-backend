import express, { Request, Response } from 'express';
import { useDatabase } from '../db/couchdb';

const router = express.Router();
const dbName = 'gallusgarten'; // CouchDB database name
const db = useDatabase(dbName);

// Route to get paginated and filtered images
router.get('/', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const tag = req.query.tag as string | undefined;
  const imagesPerPage = 22;

  try {
    const response = await db.find({
      selector: { isPublic: true },
      limit: imagesPerPage * 3, // Fetch a large enough number to handle pagination
    });
    let imagesData = response.docs as { tags?: string[]; isPublic?: boolean }[];

    // Filter images by tag if a tag is provided
    if (tag) {
      imagesData = imagesData.filter((image) => image?.tags?.includes(tag));
    }

    // Calculate pagination
    const startIndex = (page - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    const paginatedImages = imagesData.slice(startIndex, endIndex);

    // Send paginated images, total count, and pagination info
    res.json({
      images: paginatedImages,
      currentPage: page,
      totalImages: imagesData.length,
      hasMore: endIndex < imagesData.length,
    });
  } catch (error) {
    console.error('Error fetching images from CouchDB:', error);
    res.status(500).json({ message: 'Error fetching images', error });
  }
});

export default router;
