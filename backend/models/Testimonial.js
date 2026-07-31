import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  source: { type: String, enum: ['manual', 'google'], default: 'manual' },
  quote: { type: String }, // Optional if google map
  name: { type: String },
  location: { type: String },
  rating: { type: Number, default: 5 },
  image: { type: String },
  googleMapUrl: { type: String }
});

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
