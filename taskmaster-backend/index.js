import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import db from './config/database.js';
import router from './routes/UserRoute.js';

dotenv.config();

// Validasi awal Environment Variables
if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    console.error("FATAL ERROR: JWT Secrets are not defined in .env file.");
    process.exit(1);
}

const app = express();

// 1. MIDDLEWARE
app.use(cors({ 
    credentials: true, 
    origin: 'http://localhost:3000' 
}));
app.use(cookieParser());
app.use(express.json());

// 2. ROUTES
app.use(router);

// 3. DATABASE & SERVER START
const startServer = async () => {
    try {
        await db.authenticate();
        console.log('Database Connected...');
        
        // Menggunakan sync() untuk memastikan tabel ada
        // Gunakan { alter: true } agar Sequelize menambahkan kolom baru jika belum ada di DB
        await db.sync({ alter: true }); 
        console.log('Database Synchronized');
        
        const PORT = process.env.PORT || 5001;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Database Connection Error:', error);
    }
};

startServer();

export default app;