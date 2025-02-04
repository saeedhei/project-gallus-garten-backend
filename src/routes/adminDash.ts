import express, { Request, Response } from 'express';
import { useDatabase } from '../db/couchdb';

const router = express.Router();
const dbName = 'gallusgarten'; // CouchDB database name
const db = useDatabase(dbName);

// Get all images or search by publicId
router.get('/', async (req: Request, res: Response) => {
  const { search = '' } = req.query;

  try {
    if (search) {
      // Find a specific document by its publicId
      const response = await db.find({
        selector: { publicId: search },
      });

      if (response.docs.length > 0) {
        res.json({ images: response.docs });
      } else {
        res.status(404).json({ message: 'Image not found' });
      }
    }

    // Get all documents in the database
    const response = await db.list({ include_docs: true });
    const images = response.rows.map((row) => row.doc);
    res.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Error fetching images', error });
  }
});

// Update image description
router.put(
  '/update-description/:publicId',
  async (req: Request<{ publicId: string }>, res: Response) => {
    const { publicId } = req.params;
    const { description } = req.body;

    if (!description || typeof description !== 'string') {
      console.log('Invalid description:', description);
      res.status(400).json({ message: 'Invalid description provided' });
    }

    try {
      // Find the document by its publicId
      const response = await db.find({
        selector: { publicId },
      });

      if (response.docs.length === 0) {
        res.status(404).json({ message: 'Image not found' });
      }

      const image = response.docs[0]; // Get the first matching document
      const updatedImage = { ...image, description }; // Update the description

      // Save the updated document to CouchDB
      const updateResponse = await db.insert(updatedImage);
      res.json({
        message: 'Description updated successfully',
        response: updateResponse,
      });
    } catch (error) {
      console.error('Error updating description:', error);
      res.status(500).json({ message: 'Error updating image description', error });
    }
  },
);

// Add a new image (Upload)
router.post('/upload', async (req: Request, res: Response) => {
  const newImage = req.body;

  if (!newImage || !newImage.publicId || typeof newImage.publicId !== 'string') {
    res.status(400).json({ message: "Invalid image data. 'publicId' is required." });
  }

  try {
    // Check if an image with the same publicId already exists
    const response = await db.find({
      selector: { publicId: newImage.publicId },
    });

    if (response.docs.length > 0) {
      res.status(400).json({ message: 'An image with this publicId already exists.' });
    }

    // Insert the new document into CouchDB
    const uploadResponse = await db.insert(newImage);
    res.status(201).json({
      message: 'Image uploaded successfully',
      response: uploadResponse,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image', error });
  }
});

// Delete an image (Remove)
// router.delete(
//   "/remove/:publicId",
//   async (req: Request<{ publicId: string }>, res: Response) => {
//     const { publicId } = req.params;

//     try {
//       const response = await db.find({
//         selector: { publicId },
//       });

//       if (response.docs.length === 0) {
//         return res.status(404).json({ message: "Image not found" });
//       }

//       const image = response.docs[0]; // Get the first matching document

//       // Delete the document from CouchDB
//       const deleteResponse = await db.destroy(image._id, image._rev);
//       res.json({
//         message: "Image removed successfully",
//         response: deleteResponse,
//       });
//     } catch (error) {
//       console.error("Error removing image:", error);
//       res.status(500).json({ message: "Error removing image", error });
//     }
//   }
// );

// Update image visibility
router.put('/imageStatus/:publicId', async (req: Request<{ publicId: string }>, res: Response) => {
  const { publicId } = req.params;

  try {
    // Find the document by its publicId
    const response = await db.find({
      selector: { publicId },
    });

    if (response.docs.length === 0) {
      res.status(404).json({ message: 'Image not found' });
    }

    const image = response.docs[0] as {
      _id: string;
      _rev: string;
      isPublic?: boolean;
    };
    image.isPublic = !image.isPublic;

    // Save the updated document to CouchDB
    const updateResponse = await db.insert(image);
    res.json({
      message: 'Image visibility updated successfully',
      response: updateResponse,
    });
  } catch (error) {
    console.error('Error updating visibility:', error);
    res.status(500).json({ message: 'Error updating image visibility', error });
  }
});

export default router;
