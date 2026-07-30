import express from 'express';
import { Banner } from '../models/Banner.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET banner
router.get('/', async (req, res) => {
  try {
    const pageName = req.query.pageName || 'home';
    let banner = await Banner.findOne({ pageName });
    if (!banner) {
      // Return default configuration
      banner = new Banner({ pageName });
      await banner.save();
    }
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT (update) banner - Protected
router.put('/', verifyToken, async (req, res) => {
  try {
    const pageName = req.body.pageName || 'home';
    let banner = await Banner.findOne({ pageName });
    if (!banner) {
      banner = new Banner(req.body);
    } else {
      Object.assign(banner, req.body);
    }
    await banner.save();
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
