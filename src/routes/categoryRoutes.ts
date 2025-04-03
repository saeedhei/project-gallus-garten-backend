import express, { Request, Response, Router } from 'express';
import { useDatabase } from '../db/couchdb.js';
import axios from 'axios';

const router: Router = express.Router();
const db = useDatabase(process.env.DB_NAME || 'default_database_name');

const { DB_USER, DB_PASS } = process.env;
const auth = Buffer.from(`${DB_USER}:${DB_PASS}`).toString('base64'); // Fixed template literal

const headers = {
  Authorization: `Basic ${auth}`, // Fixed template literal
};

// Define an interface for expected document structure
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CategoryDocument {
  categories?: string[];
}

interface Params {
  publicId: string;
}

interface RequestBody {
  categories: string[]; // Expect an array of categories
}

// Fetch all unique categories from CouchDB
router.get('/categories', async (req: Request, res: Response): Promise<void> => {
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
    console.error('Error fetching categories:', error);
    res.status(500).json({
      message: 'Error fetching categories',
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Fetch images by category with pagination
router.get('/images', async (req: Request, res: Response): Promise<void> => {
  const { category, page = '1', limit = '15' } = req.query;

  try {
    const url = `https://couchdb.seointro.de/gallusgarten/_design/images/_view/by_category`;

    // Define query parameters
    const params: any = {
      limit: parseInt(limit as string, 10),
      skip: (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10),
      include_docs: true, // Include the full document
    };

    // If category is provided, filter by category
    if (category) {
      params.key = JSON.stringify(category);
    }

    const response = await axios.get(url, { headers, params });

    if (!response.data || !response.data.rows) {
      res.status(404).json({ error: 'Images not found' });
      return;
    }

    // Map the rows to include all required fields
    const images = response.data.rows.map((row: any) => ({
      id: row.id,
      url: row.doc.url,
      description: row.doc.description || '',
      likes: row.doc.likes || 0,
      publicId: row.doc.publicId || row.id,
      linkCount: row.doc.linkCount || 0,
    }));

    // Calculate if there are more images to load
    const totalImages = response.data.total_rows || 0;
    const currentPage = parseInt(page as string, 10);
    const itemsPerPage = parseInt(limit as string, 10);
    const hasMore = currentPage * itemsPerPage < totalImages;

    // Return the response with images and hasMore flag
    res.json({
      images,
      hasMore,
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({
      message: 'Error fetching images',
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
      res.status(500).json({
        message: 'Error updating image categories',
        error: error instanceof Error ? error.message : error,
      });
    }
  },
);

export default router;
