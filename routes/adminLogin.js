"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { GALLUS_ADMIN_USER, GALLUS_ADMIN_PASSWORD } = process.env;
router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (username === GALLUS_ADMIN_USER && password === GALLUS_ADMIN_PASSWORD) {
        res.status(200).json({ message: 'Login successful' });
    }
    res.status(401).json({ message: 'Invalid username or password' });
});
exports.default = router;
