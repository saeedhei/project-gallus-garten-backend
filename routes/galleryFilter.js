"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const couchdb_1 = require("../db/couchdb");
const router = express_1.default.Router();
const dbName = 'gallusgarten';
const db = (0, couchdb_1.useDatabase)(dbName);
router.get('/', async (req, res) => {
    try {
        const response = await db.find({
            selector: { tags: { $exists: true } }, // Get only docs with tags
            fields: ['_id', '_rev', 'tags'],
        });
        // Flatten all "tags" arrays and remove duplicates
        const allTags = response.docs.flatMap((doc) => doc.tags || []);
        const uniqueTags = [...new Set(allTags)];
        res.json({ tags: uniqueTags }); // Respond with the unique tags
    }
    catch (error) {
        console.error('Error processing tags:', error);
        res.status(500).json({ error: 'Failed to process tags' });
    }
});
exports.default = router;
