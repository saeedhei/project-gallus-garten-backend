import express, { Request, Response, RequestHandler } from 'express';
// import { useDatabase } from '../db/couchdb.js';
import { getDB } from '../core/config/couchdb.js';
const router = express.Router();


// Get all images or search by publicId
router.get('/', (async (req: Request, res: Response) => {
    const { search = '' } = req.query;

  try {
      const db = await getDB();
      if (search) {
        
        const response = await db.find({
          selector: { publicId: search },
        });

        if (response.docs.length > 0) {
          return res.json({ images: response.docs });
        } else {
          return res.status(404).json({ message: 'Image not found' });
        }
      }

      // If no search query, fetch all images
      const response = await db.list({ include_docs: true });
      const images = response.rows.map((row) => row.doc);
      return res.json({ images });
    } catch (error) {
      console.error('Error fetching images:', error);
      return res.status(500).json({ message: 'Error fetching images', error });
    }
  }) as unknown as RequestHandler);

// Update image description
router.put(
  '/update-description/:publicId',
  (async (req: Request<{ publicId: string; }>, res: Response) => {
    const { publicId } = req.params;
    const { description } = req.body;

    if (!description || typeof description !== 'string') {
      console.log('Invalid description:', description);
      return res.status(400).json({ message: 'Invalid description provided' });
    }

    try {
      const db = await getDB();
      // Find the document by its publicId
      const response = await db.find({
        selector: { publicId },
      });

      if (response.docs.length === 0) {
        return res.status(404).json({ message: 'Image not found' });
      }

      const image = response.docs[0]; // Get the first matching document
      const updatedImage = { ...image, description }; // Update the description


      // Save the updated document to CouchDB
      const updateResponse = await db.insert(updatedImage);
      return res.json({
        message: 'Description updated successfully',
        response: updateResponse,
      });
    } catch (error) {
      console.error('Error updating description:', error);
      return res.status(500).json({ message: 'Error updating image description', error });
    }
  }) as unknown as RequestHandler,
);

// Add a new image (Upload)
router.post('/upload', (async (req: Request, res: Response) => {
    const newImage = req.body;

    if (!newImage || !newImage.publicId || typeof newImage.publicId !== 'string') {
      return res.status(400).json({ message: "Invalid image data. 'publicId' is required." });
    }

  try {
      const db = await getDB();
      // Check if an image with the same publicId already exists
      const response = await db.find({
        selector: { publicId: newImage.publicId },
      });

      if (response.docs.length > 0) {
        return res.status(400).json({ message: 'An image with this publicId already exists.' });
      }

      // Insert the new document into CouchDB
      const uploadResponse = await db.insert(newImage);
      return res.status(201).json({
        message: 'Image uploaded successfully',
        response: uploadResponse,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      return res.status(500).json({ message: 'Error uploading image', error });
    }
  }) as unknown as RequestHandler);

// Update image visibility
router.put('/imageStatus/:publicId', (async (req: Request<{ publicId: string; }>, res: Response) => {
    const { publicId } = req.params;

  try {
      const db = await getDB();
      // Find the document by its publicId
      const response = await db.find({
        selector: { publicId },
      });

      if (response.docs.length === 0) {
        return res.status(404).json({ message: 'Image not found' });
      }

      const image = response.docs[0] as {
        _id: string;
        _rev: string;
        isPublic?: boolean;
      };
      image.isPublic = !image.isPublic;

      // Save the updated document to CouchDB
      const updateResponse = await db.insert(image);
      return res.json({
        message: 'Image visibility updated successfully',
        response: updateResponse,
      });
    } catch (error) {
      console.error('Error updating visibility:', error);
      return res.status(500).json({ message: 'Error updating image visibility', error });
    }
  }) as unknown as RequestHandler);

export default router;
