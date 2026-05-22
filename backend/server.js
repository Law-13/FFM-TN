import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { config } from './config/config.js';
import { registerEvent } from './controllers/registrationController.js';
import { submitSupportQuery } from './controllers/supportController.js';

// ES Module dirname helper
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security and middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup temporary upload directory
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File validation filter
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (file.fieldname === 'rulesPdf') {
    if (ext === '.pdf') {
      cb(null, true);
    } else {
      cb(new Error('Rules document must be a PDF file.'), false);
    }
  } else {
    if (allowedImageTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Images must be of type JPG, PNG, or WEBP.'), false);
    }
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit per file
  }
});

// Configure multi-file upload fields
const uploadFields = upload.fields([
  { name: 'eventPoster', maxCount: 1 },
  { name: 'eventBanner', maxCount: 1 },
  { name: 'rulesPdf', maxCount: 1 },
  { name: 'prevTournamentPoster', maxCount: 1 }
]);

// API Routes
app.post('/api/register', (req, res, next) => {
  // Capture upload errors from multer
  uploadFields(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
}, registerEvent);

app.post('/api/support', submitSupportQuery);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'FFM TN Backend is fully operational.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error.' });
});

// Start Server
app.listen(config.port, () => {
  console.log(`🚀 FFM Community TN Backend running on port ${config.port}`);
});
