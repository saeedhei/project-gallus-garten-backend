import express, { Request, Response, Router } from 'express';
import { useDatabase } from '../db/couchdb';

const router: Router = express.Router();
const db = useDatabase(process.env.DB_NAME || 'default_database_name');

// Define expected request parameter and body types
interface Params {
  publicId: string;
}

interface RequestBody {
  year: number;
}

// Update image year
router.put(
  '/update-year/:publicId',
  async (req: Request<Params, {}, RequestBody>, res: Response): Promise<void> => {
    const { publicId } = req.params;
    const { year } = req.body;

    if (!year || typeof year !== 'number') {
      res.status(400).json({ message: 'Invalid year provided' });
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
      const updatedImage = { ...image, year }; // Update the year

      // Save the updated document to CouchDB
      const updateResponse = await db.insert(updatedImage);

      res.json({
        message: 'Year updated successfully',
        response: updateResponse,
      });
    } catch (error) {
      console.error('Error updating year:', error);
      res
        .status(500)
        .json({
          message: 'Error updating image year',
          error: error instanceof Error ? error.message : error,
        });
    }
  },
);

export default router;
