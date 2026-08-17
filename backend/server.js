import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Route imports
import authRoutes from './routes/auth.js';
import bannerRoutes from './routes/banner.js';
import aboutRoutes from './routes/about.js';
import servicesRoutes from './routes/services.js';
import productsRoutes from './routes/products.js';
import videosRoutes from './routes/videos.js';
import mediaRoutes from './routes/media.js';
import testimonialsRoutes from './routes/testimonials.js';
import uploadRoutes from './routes/upload.js';
import inquiryRoutes from './routes/inquiry.js';
import { router as ourWorkRoutes } from './routes/our-work.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for simplicity, can configure specifically later
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas.'))
  .catch((err) => console.error('MongoDB Atlas connection error:', err));

// API Routes Registration
app.use('/api/auth', authRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/inquiry', inquiryRoutes);
app.use('/api/our-work', ourWorkRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', dbState: mongoose.connection.readyState });
});

// Start listening
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
