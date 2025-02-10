import express from 'express';
import { useDatabase } from '../db/couchdb';

const router = express.Router();
const db = useDatabase(process.env.DB_NAME || 'default_database_name');

interface ImageDocument {
  _id: string;
  _rev: string;
  tags?: string[];
}

router.get('/', async (req, res) => {
  try {
    const response = await db.find({
      selector: { tags: { $exists: true } }, // Get only docs with tags
      fields: ['_id', '_rev', 'tags'],
    });

    // Flatten all "tags" arrays and remove duplicates
    const allTags = response.docs.flatMap((doc: ImageDocument) => doc.tags || []);
    const uniqueTags = [...new Set(allTags)];
    res.json({ tags: uniqueTags }); // Respond with the unique tags
  } catch (error) {
    console.error('Error processing tags:', error);
    res.status(500).json({ error: 'Failed to process tags' });
  }
});

export default router;
