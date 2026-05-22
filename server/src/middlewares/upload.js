import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter based on rules
const fileFilter = (req, file, cb) => {
  const filetypesImage = /jpeg|jpg|png|webp/;
  const filetypesPdf = /pdf/;
  
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (file.fieldname === 'rulesPdf') {
    // Only PDF allowed
    const isPdf = filetypesPdf.test(extname) && mimetype === 'application/pdf';
    if (isPdf) {
      return cb(null, true);
    }
    return cb(new Error('Only PDF rules files are allowed!'), false);
  } else {
    // Images allowed for poster, banner, prevPoster
    const isImage = filetypesImage.test(extname) && /image\/(jpeg|jpg|png|webp)/.test(mimetype);
    if (isImage) {
      return cb(null, true);
    }
    return cb(new Error('Only JPG, PNG and WEBP image formats are allowed!'), false);
  }
};

// Size limit configuration
const limits = {
  fileSize: 10 * 1024 * 1024, // 10MB general limit, we will check sub-limits in middleware
};

export const upload = multer({
  storage,
  fileFilter,
  limits
});

// Helper validation middleware to check specific field-level file size
export const validateUploadSizes = (req, res, next) => {
  if (!req.files) return next();

  const imageSizeLimit = 5 * 1024 * 1024; // 5MB
  const pdfSizeLimit = 10 * 1024 * 1024; // 10MB

  const files = req.files;

  try {
    for (const key of Object.keys(files)) {
      const fileList = files[key];
      for (const file of fileList) {
        if (file.fieldname === 'rulesPdf' && file.size > pdfSizeLimit) {
          throw new Error('Rules PDF file size exceeds the 10MB limit.');
        }
        if (file.fieldname !== 'rulesPdf' && file.size > imageSizeLimit) {
          throw new Error(`${file.fieldname} image size exceeds the 5MB limit.`);
        }
      }
    }
    next();
  } catch (error) {
    // Clean uploaded files if any error occurs
    if (req.files) {
      Object.keys(req.files).forEach(fieldname => {
        req.files[fieldname].forEach(file => {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        });
      });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};
