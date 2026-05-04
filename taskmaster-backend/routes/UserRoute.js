import express from 'express';
import { login } from '../controllers/UserController.js';

const router = express.Router();

// Endpoint untuk login user
// Nantinya diakses melalui: http://localhost:5000/login
router.post('/login', login);

export default router;