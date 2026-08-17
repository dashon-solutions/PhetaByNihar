import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  pageName: { type: String, default: 'home' },
  tag: { type: String, default: 'Preserving Heritage' },
  titleItalic: { type: String, default: 'The Art of' },
  titleBold: { type: String, default: 'Maharashtrian' },
  titleRegular: { type: String, default: 'Pheta Ceremony' },
  description: { type: String, default: 'Honoring traditions with elegance, respect & pride.' },
  backgroundImage: { type: String, default: '/footerimg.png' },
  primaryButtonText: { type: String, default: 'Book Now' },
  primaryButtonLink: { type: String, default: '/contact' },
  secondaryButtonText: { type: String, default: 'Explore Work' },
  secondaryButtonLink: { type: String, default: '/our-work' }
});

export const Banner = mongoose.model('Banner', bannerSchema);
