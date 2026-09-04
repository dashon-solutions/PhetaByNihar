import mongoose from 'mongoose';

const launchTimerSchema = new mongoose.Schema({
  key: {
    type: String,
    default: 'global_launch_timer',
    unique: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  timerMinutes: {
    type: Number,
    default: 3
  },
  targetEndTime: {
    type: Date,
    default: null
  },
  startedAt: {
    type: Date,
    default: null
  },
  title: {
    type: String,
    default: 'Grand Royal Launching Soon...'
  },
  subtitle: {
    type: String,
    default: 'Pheta By Nihar • Master Pheta Tying & Royal Wedding Collection'
  },
  autoUnlock: {
    type: Boolean,
    default: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export const LaunchTimer = mongoose.model('LaunchTimer', launchTimerSchema);
