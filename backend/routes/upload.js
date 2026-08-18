import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer Memory Storage Configuration
const storage = multer.memoryStorage();

// File Filter for Images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const mimetype = allowedTypes.test(file.mimetype);
  
  // We can just rely on mimetype here, since memoryStorage doesn't easily expose originalname without path module
  if (mimetype) {
    return cb(null, true);
  }
  cb(new Error('Only image files (jpg, jpeg, png, webp, gif) are allowed!'));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
});

// Upload Single Image Route (Protected)
router.post('/', verifyToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload directly to Cloudinary using upload_stream with WebP conversion
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'phetabynihar',
        format: 'webp', // Convert everything to webp for optimization
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'webp' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ message: 'Cloudinary upload failed', error: error.message });
        }

        // Return the secure Cloudinary WebP URL
        const webpUrl = result.secure_url ? result.secure_url.replace(/\.[a-zA-Z0-9]+$/, '.webp') : result.secure_url;

        res.status(200).json({
          message: 'Image uploaded successfully',
          imageUrl: webpUrl,
          format: 'webp'
        });
      }
    );

    // Pipe the multer memory buffer into the Cloudinary upload stream
    uploadStream.end(req.file.buffer);

  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

export default router;
