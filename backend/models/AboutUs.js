import mongoose from 'mongoose';

const aboutUsSchema = new mongoose.Schema({
  heading: { type: String, default: 'A Tradition Passed Down with' },
  italicHeading: { type: String, default: 'Pride' },
  text: { type: String, default: 'With deep respect for Maharashtrian culture...' },
  portraitImage: { type: String, default: '/about_portrait.webp' },
  backgroundImage: { type: String, default: '/aboutnewiamge.png' }
});

export const AboutUs = mongoose.model('AboutUs', aboutUsSchema);
