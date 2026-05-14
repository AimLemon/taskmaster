import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import UserRoute from './routes/UserRoute.js';
import Tasks from './models/TaskModel.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(UserRoute);

// CEK: Jalankan server HANYA JIKA file ini dijalankan langsung, bukan saat di-test
if (process.env.NODE_ENV !== 'test') {
    const startServer = async () => {
        try {
            await db.authenticate();
            await db.sync({ alter: true });
            console.log('Database Connected & Synchronized');
            app.listen(5000, () => console.log('Server running on port 5000'));
        } catch (error) {
            console.error('Database Connection Error:', error);
        }
    };
    startServer();
}

export default app;