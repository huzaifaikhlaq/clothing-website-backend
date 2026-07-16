import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

const app = express();


// ====Middlewares====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===Test API running===
app.get('/', (req, res) => { res.json({ success: true, message: '🚀 API is running...' }) });

// ===routes===
app.use('/api', router)

export default app;