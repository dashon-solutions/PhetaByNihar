import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 5 },
  image: { type: String, required: true }
});

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
