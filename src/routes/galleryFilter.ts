import express from 'express';
import { useDatabase } from '../db/couchdb';

const router = express.Router();
const db = useDatabase(process.env.DB_NAME || 'default_database_name');

interface ImageDocument {
  _id: string;
  _rev: string;
  categories?: string[];
}

router.get('/', async (req, res) => {
  try {
    const response = await db.find({
      selector: { categories: { $exists: true } }, // Get only docs with tags
      fields: ['_id', '_rev', 'categories'],
    });

    // Flatten all "tags" arrays and remove duplicates
    const allCategories = response.docs.flatMap((doc: ImageDocument) => doc.categories || []);
    const uniqueCategories = [...new Set(allCategories)];
    res.json({ categories: uniqueCategories }); // Respond with the unique tags
  } catch (error) {
    console.error('Error processing categories:', error);
    res.status(500).json({ error: 'Failed to process categories' });
  }
});

export default router;
