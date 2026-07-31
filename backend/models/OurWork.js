import mongoose from 'mongoose';

const ourWorkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
}, {
  timestamps: true
});

export const OurWork = mongoose.model('OurWork', ourWorkSchema);
