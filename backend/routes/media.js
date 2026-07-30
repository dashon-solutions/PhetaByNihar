import express from 'express';
import { MediaLogo } from '../models/MediaLogo.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET all media logos
router.get('/', async (req, res) => {
  try {
    const logos = await MediaLogo.find();
    res.json(logos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST a new media logo - Protected
router.post('/', verifyToken, async (req, res) => {
  try {
    const newLogo = new MediaLogo(req.body);
    await newLogo.save();
    res.status(201).json(newLogo);
  } catch (error) {
    res.status(400).json({ message: 'Error adding media logo', error: error.message });
  }
});

// PUT (update) media logo - Protected
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const logo = await MediaLogo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!logo) {
      return res.status(404).json({ message: 'Media logo not found' });
    }
    res.json(logo);
  } catch (error) {
    res.status(400).json({ message: 'Error updating media logo', error: error.message });
  }
});

// DELETE media logo - Protected
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const logo = await MediaLogo.findByIdAndDelete(req.params.id);
    if (!logo) {
      return res.status(404).json({ message: 'Media logo not found' });
    }
    res.json({ message: 'Media logo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
