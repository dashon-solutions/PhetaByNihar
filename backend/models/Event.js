import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, default: '' },
  location: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  highlights: [{ type: String }],
  priceBadge: { type: String, default: 'Upcoming Event' },
  createdAt: { type: Date, default: Date.now }
});

export const Event = mongoose.model('Event', eventSchema);
