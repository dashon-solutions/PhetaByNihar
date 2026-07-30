import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  tag: { type: String, default: 'Preserving Heritage' },
  titleItalic: { type: String, default: 'The Art of' },
  titleBold: { type: String, default: 'Maharashtrian' },
  titleRegular: { type: String, default: 'Pheta Ceremony' },
  description: { type: String, default: 'Honoring traditions with elegance, respect & pride.' },
  backgroundImage: { type: String, default: '/footerimg.png' },
  primaryButtonText: { type: String, default: 'Book Now' },
  secondaryButtonText: { type: String, default: 'Explore Work' }
});

export const Banner = mongoose.model('Banner', bannerSchema);
