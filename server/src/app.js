import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';

// Import routers
import eventRouter from './routes/event.js';
import supportRouter from './routes/support.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: '*', // We can change this to specific domain during production
  methods: ['GET', 'POST'],
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Anti-Spam Rate Limiter (Max 30 requests per 15 minutes per IP)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to all routes
app.use('/api/', apiLimiter);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date(),
    adminReady: true,
    mongoReady: false // Hook for database checks
  });
});

// Modular Routes
app.use('/api/event', eventRouter);
app.use('/api/support', supportRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Application Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Global Error Handler to catch Multer or other unhandled exceptions and return JSON
app.use((err, req, res, next) => {
  console.error('Unhandled Backend Error:', err.message);
  res.status(500).json({ 
    success: false, 
    message: err.message || 'An unexpected server error occurred.' 
  });
});

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 FFM COMMUNITY TN BACKEND STARTING ON PORT ${PORT}`);
  console.log(`🛡️ Rate Limiting & Helmet Security Initialized`);
  console.log(`📩 Admin Configured Email: ${process.env.ADMIN_EMAIL}`);
  console.log(`===================================================`);
});
