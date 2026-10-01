import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import cookieParser from "cookie-parser";

const app = express();

app.set("trust proxy", 1);

const frontendOrigins = (process.env.FRONTEND_URL ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
const localOrigins = process.env.NODE_ENV === "production"
    ? []
    : ["http://localhost:5173", "http://localhost:8080"];

app.use(cors({
    origin: [...new Set([...frontendOrigins, ...localOrigins])],
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