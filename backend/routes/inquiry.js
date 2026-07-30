import express from 'express';
import { Inquiry } from '../models/Inquiry.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST new inquiry (Public)
router.post('/', async (req, res) => {
  try {
    const { type, subject, name, phone, address, locationDetails } = req.body;

    if (!type || !subject || !name || !phone || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const inquiry = new Inquiry({
      type,
      subject,
      name,
      phone,
      address,
      locationDetails
    });

    await inquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET all inquiries (Protected Admin Route)
router.get('/', verifyToken, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update inquiry status (Protected Admin Route)
router.put('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'contacted', 'resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE inquiry (Protected Admin Route)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
