import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import cookieParser from "cookie-parser";

const app = express();

app.set("trust proxy", 1);

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🚀 API is running...'
    });
});

app.use('/api', router);

export default app;