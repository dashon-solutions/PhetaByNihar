import express from 'express';
import { Inquiry } from '../models/Inquiry.js';
import { verifyToken } from '../middleware/auth.js';
import { sendDualInquiryEmails } from '../utils/email.js';

const router = express.Router();

// POST new inquiry (Public)
router.post('/', async (req, res) => {
  try {
    const {
      type,
      subject,
      name,
      phone,
      email,
      address,
      city,
      message,
      preferredBatch,
      locationDetails
    } = req.body;

    if (!type || !subject || !name || !phone) {
      return res.status(400).json({ message: 'Name, phone number, and subject are required.' });
    }

    const inquiry = new Inquiry({
      type,
      subject,
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      address: address || city || '',
      city: city || '',
      message: message || '',
      preferredBatch: preferredBatch || '',
      locationDetails
    });

    await inquiry.save();
    console.log(`\n💾 [DATABASE SAVED] Inquiry saved with ID: ${inquiry._id} (Status: new)`);

    // Trigger dual email dispatch asynchronously (Owner Alert + Customer Confirmation)
    // Non-blocking: Inquiry is already saved to database & admin panel regardless of SMTP status
    sendDualInquiryEmails(inquiry).catch(err => {
      console.warn('⚠️ [EMAIL WARNING] Background email dispatch failed safely:', err.message);
    });

    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
  } catch (error) {
    console.error('Error saving inquiry:', error);
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
