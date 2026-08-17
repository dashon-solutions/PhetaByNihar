import express from 'express';
import { PhetaClass } from '../models/PhetaClass.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET all active classes
router.get('/', async (req, res) => {
  try {
    const classes = await PhetaClass.find({ isActive: true }).sort({ createdAt: 1 });
    res.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ message: 'Error fetching pheta classes' });
  }
});

// GET single class by ID
router.get('/:id', async (req, res) => {
  try {
    const phetaClass = await PhetaClass.findById(req.params.id);
    if (!phetaClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(phetaClass);
  } catch (error) {
    console.error('Error fetching class details:', error);
    res.status(500).json({ message: 'Error fetching class details' });
  }
});

// POST create new class (Admin)
router.post('/', verifyToken, async (req, res) => {
  try {
    const newClass = new PhetaClass(req.body);
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({ message: 'Error creating class', error: error.message });
  }
});

// PUT update class (Admin)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedClass = await PhetaClass.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(updatedClass);
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({ message: 'Error updating class', error: error.message });
  }
});

// DELETE class (Admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedClass = await PhetaClass.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({ message: 'Error deleting class' });
  }
});

export default router;

