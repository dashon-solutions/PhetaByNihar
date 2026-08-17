import express from 'express';
import { Banner } from '../models/Banner.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET banner by pageName
router.get('/', async (req, res) => {
  try {
    const pageName = req.query.pageName || 'home';
    let banner = await Banner.findOne({ pageName });
    if (!banner) {
      banner = await Banner.create({ pageName });
    }
    res.json(banner);
  } catch (error) {
    console.error('Error fetching banner:', error);
    res.status(500).json({ message: 'Server error fetching banner', error: error.message });
  }
});

// PUT (update/upsert) banner - Protected
router.put('/', verifyToken, async (req, res) => {
  try {
    const pageName = req.body.pageName || 'home';
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;

    const banner = await Banner.findOneAndUpdate(
      { pageName },
      { $set: updateData },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );
    res.json(banner);
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Server error updating banner', error: error.message });
  }
});

export default router;

