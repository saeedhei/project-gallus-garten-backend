"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gallery_1 = __importDefault(require("./gallery"));
const galleryFilter_1 = __importDefault(require("./galleryFilter"));
const adminDash_1 = __importDefault(require("./adminDash"));
const adminLogin_1 = __importDefault(require("./adminLogin"));
//import likes from './Likes';
const router = express_1.default.Router();
/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});
router.use('/api/images', gallery_1.default);
router.use('/api/images/filter', galleryFilter_1.default);
//app.use('/api/likes/:id' , likes)
router.use('/api/adminPanelDash', adminDash_1.default);
router.use('/api/login', adminLogin_1.default);
exports.default = router;
