import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import cookieParser from "cookie-parser";

import connectDB from './config/db.js';

const app = express();


// ====Middlewares====
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        res.status(503).json({ message: "Database unavailable" });
    }
});

// ===Test API running===
app.get('/', (req, res) => { res.json({ success: true, message: '🚀 API is running...' }) });

// ===routes===
app.use('/api', router)

export default app;