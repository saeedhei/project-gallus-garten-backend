"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const couchdb_1 = require("../db/couchdb");
const router = express_1.default.Router();
const dbName = 'gallusgarten'; // CouchDB database name
const db = (0, couchdb_1.useDatabase)(dbName);
// Route to get paginated and filtered images
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const tag = req.query.tag;
    const imagesPerPage = 22;
    try {
        const response = await db.find({
            selector: { isPublic: true },
            limit: imagesPerPage * 3, // Fetch a large enough number to handle pagination
        });
        let imagesData = response.docs;
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
    }
    catch (error) {
        console.error('Error fetching images from CouchDB:', error);
        res.status(500).json({ message: 'Error fetching images', error });
    }
});
exports.default = router;
