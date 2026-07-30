import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  channel: { type: String, required: true },
  url: { type: String, required: true }
});

export const Video = mongoose.model('Video', videoSchema);
