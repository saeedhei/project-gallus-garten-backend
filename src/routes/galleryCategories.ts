import express from 'express';
import axios from 'axios';

const router = express.Router();
const { DB_USER, DB_PASS } = process.env;
const auth = Buffer.from(`${DB_USER}:${DB_PASS}`).toString('base64');
const url = `https://couchdb.seointro.de/gallusgarten/_design/categories/_list/format_categories/unique_categories?group=true`;

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

export default router;
