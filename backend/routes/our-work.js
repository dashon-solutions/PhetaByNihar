import express from 'express';
import { OurWork } from '../models/OurWork.js';

export const router = express.Router();

// Get all works
router.get('/', async (req, res) => {
  try {
    const works = await OurWork.find().sort({ createdAt: -1 });
    res.json(works);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single work
router.get('/:id', async (req, res) => {
  try {
    const work = await OurWork.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }
    res.json(work);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new work
router.post('/', async (req, res) => {
  const { title, description, images } = req.body;
  const work = new OurWork({ title, description, images });
  
  try {
    const newWork = await work.save();
    res.status(201).json(newWork);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a work
router.put('/:id', async (req, res) => {
  try {
    const work = await OurWork.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }

    if (req.body.title != null) work.title = req.body.title;
    if (req.body.description != null) work.description = req.body.description;
    if (req.body.images != null) work.images = req.body.images;

    const updatedWork = await work.save();
    res.json(updatedWork);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a work
router.delete('/:id', async (req, res) => {
  try {
    const work = await OurWork.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }
    
    await work.deleteOne();
    res.json({ message: 'Work deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
