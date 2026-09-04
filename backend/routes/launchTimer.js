import express from 'express';
import { LaunchTimer } from '../models/LaunchTimer.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Memory fallback in case MongoDB is connecting
let inMemoryTimer = {
  key: 'global_launch_timer',
  isActive: false,
  timerMinutes: 3,
  targetEndTime: null,
  startedAt: null,
  title: 'Grand Royal Launching Soon...',
  subtitle: 'Pheta By Nihar • Master Pheta Tying & Royal Wedding Collection',
  autoUnlock: true,
  isCompleted: false
};

// GET launch timer settings
router.get('/', async (req, res) => {
  try {
    let timer = await LaunchTimer.findOne({ key: 'global_launch_timer' });
    if (!timer) {
      timer = await LaunchTimer.create(inMemoryTimer);
    } else if (timer.isActive && timer.targetEndTime && new Date(timer.targetEndTime) <= new Date()) {
      timer.isActive = false;
      timer.isCompleted = true;
      await timer.save();
    }
    res.json(timer);
  } catch (error) {
    console.error('Error fetching launch timer settings:', error);
    // Fallback response so frontend never breaks
    res.json(inMemoryTimer);
  }
});

// PUT update/start/stop launch timer settings - Admin Protected
router.put('/', verifyToken, async (req, res) => {
  try {
    const { action, timerMinutes, title, subtitle, autoUnlock, isActive } = req.body;

    let updateData = {};

    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (autoUnlock !== undefined) updateData.autoUnlock = autoUnlock;

    if (action === 'start') {
      const minutes = Number(timerMinutes) || 3;
      const now = new Date();
      const endTime = new Date(now.getTime() + minutes * 60 * 1000);

      updateData.isActive = true;
      updateData.timerMinutes = minutes;
      updateData.startedAt = now;
      updateData.targetEndTime = endTime;
      updateData.isCompleted = false;
    } else if (action === 'stop' || action === 'reveal') {
      updateData.isActive = false;
      updateData.isCompleted = true;
    } else if (isActive !== undefined) {
      updateData.isActive = Boolean(isActive);
    }

    const timer = await LaunchTimer.findOneAndUpdate(
      { key: 'global_launch_timer' },
      { $set: updateData },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );

    // Sync memory fallback
    inMemoryTimer = { ...inMemoryTimer, ...timer.toObject() };

    res.json(timer);
  } catch (error) {
    console.error('Error updating launch timer:', error);
    res.status(500).json({ message: 'Server error updating launch timer', error: error.message });
  }
});

export default router;
