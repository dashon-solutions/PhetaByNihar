import mongoose from 'mongoose';

const mediaLogoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false }, // Optional logo image path
  color: { type: String, required: false }, // Custom color class or hex (e.g. sakal color)
  link: { type: String, required: false, default: '' } // Article or channel link
});

export const MediaLogo = mongoose.model('MediaLogo', mediaLogoSchema);
