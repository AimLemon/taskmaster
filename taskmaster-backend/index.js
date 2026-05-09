import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import UserRoute from './routes/UserRoute.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // Penting agar bisa membaca data JSON dari frontend
app.use(UserRoute);

const startServer = async () => {
  try {
    await db.authenticate();
    await db.sync(); // Otomatis membuat/update tabel di PostgreSQL
    console.log('Database Connected & Synchronized');
    app.listen(5000, () => console.log('Server running on port 5000'));
  } catch (error) {
    console.error(error);
  }
};

startServer();
export default app;