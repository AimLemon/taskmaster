import express from "express";
import { 
    getUsers, 
    Register, 
    Login, 
    Logout 
} from "../controllers/UserController.js";
import { 
    getTasks, 
    createTask, 
    updateTask, // PASTIKAN ADA DI SINI
    deleteTask  // PASTIKAN ADA DI SINI
} from "../controllers/TaskController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// Route untuk User
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.delete('/logout', Logout);

// Route untuk Tasks (Tugas)
router.get('/tasks', verifyToken, getTasks);
router.post('/tasks', verifyToken, createTask);
router.patch('/tasks/:id', verifyToken, updateTask); // Jalur untuk EDIT
router.delete('/tasks/:id', verifyToken, deleteTask); // Jalur untuk HAPUS

export default router;