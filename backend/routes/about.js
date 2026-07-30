import express from 'express';
import { AboutUs } from '../models/AboutUs.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET About Us content
router.get('/', async (req, res) => {
  try {
    let about = await AboutUs.findOne();
    if (!about) {
      about = new AboutUs();
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT (update) About Us content - Protected
router.put('/', verifyToken, async (req, res) => {
  try {
    let about = await AboutUs.findOne();
    if (!about) {
      about = new AboutUs(req.body);
    } else {
      Object.assign(about, req.body);
    }
    await about.save();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
