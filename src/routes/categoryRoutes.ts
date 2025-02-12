import express, { Request, Response, Router } from 'express';
import { useDatabase } from '../db/couchdb';

const router: Router = express.Router();
const db = useDatabase(process.env.DB_NAME || 'default_database_name');

// Define an interface for expected document structure
interface CategoryDocument {
  categories?: string[];
}

interface Params {
  publicId: string;
}

interface RequestBody {
  categories: string[]; // Expect an array of categories
}

router.get('/categories', async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all documents with categories
    const response = await db.find({
      selector: { categories: { $exists: true } },
      fields: ['categories'],
    });

    // Ensure TypeScript recognizes response.docs as an array of CategoryDocument
    const allCategories: string[] = (response.docs as CategoryDocument[]).flatMap(
      (doc) => doc.categories || [],
    );

    // Remove duplicates
    const uniqueCategories: string[] = [...new Set(allCategories)];

    res.json({ categories: uniqueCategories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      message: 'Error fetching categories',
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Update image categories
router.put(
  '/update-categories/:publicId',
  async (req: Request<Params, {}, RequestBody>, res: Response): Promise<void> => {
    const { publicId } = req.params;
    const { categories } = req.body;

    if (!Array.isArray(categories) || categories.length === 0) {
      res.status(400).json({ message: 'Invalid categories provided. Must be a non-empty array.' });
      return;
    }

    try {
      // Find the document by its publicId
      const response = await db.find({
        selector: { publicId },
      });

      if (response.docs.length === 0) {
        res.status(404).json({ message: 'Image not found' });
        return;
      }

      const image = response.docs[0]; // Get the first matching document
      const updatedImage = { ...image, categories }; // Update categories field

      // Save the updated document to CouchDB
      const updateResponse = await db.insert(updatedImage);

      res.json({
        message: 'Categories updated successfully',
        response: updateResponse,
      });
    } catch (error) {
      console.error('Error updating categories:', error);
      res
        .status(500)
        .json({
          message: 'Error updating image categories',
          error: error instanceof Error ? error.message : error,
        });
    }
  },
);

export default router;
