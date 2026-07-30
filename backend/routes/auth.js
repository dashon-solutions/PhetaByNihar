import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Register Admin (can be disabled or secured in production)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const normalizedUsername = username.trim().toLowerCase();

    const existingAdmin = await Admin.findOne({ username: normalizedUsername });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      username: normalizedUsername,
      password: hashedPassword
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Admin
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const normalizedUsername = username.trim().toLowerCase();

    const admin = await Admin.findOne({ username: normalizedUsername });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'super_secret_royal_pheta_token_2026',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Verify Token status
router.get('/verify', verifyToken, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

export default router;
