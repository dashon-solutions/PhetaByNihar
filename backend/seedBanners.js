import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Banner } from './models/Banner.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const banners = [
  {
    pageName: 'home',
    tag: 'Preserving Heritage',
    titleItalic: 'The Art of',
    titleBold: 'Maharashtrian',
    titleRegular: 'Pheta Ceremony',
    description: 'Honoring traditions with elegance, respect & pride. From royal weddings to cultural celebrations, we bring the timeless art of Pheta tying to life.',
    backgroundImage: '/footerimg.png',
    primaryButtonText: 'Book Now',
    primaryButtonLink: '/contact',
    secondaryButtonText: 'Explore Work',
    secondaryButtonLink: '/our-work'
  },
  {
    pageName: 'about',
    tag: 'Our Legacy',
    titleItalic: 'The Story Behind',
    titleBold: 'Pheta By Nihar',
    titleRegular: 'Tradition & Excellence',
    description: 'Learn the story behind our craft, our passion for Maharashtrian culture, and the masters who keep the royal tradition alive.',
    backgroundImage: '/aboutnewiamge.png',
    primaryButtonText: 'Explore Collection',
    primaryButtonLink: '/products',
    secondaryButtonText: 'Our Services',
    secondaryButtonLink: '/services'
  },
  {
    pageName: 'services',
    tag: 'Specialized Offerings',
    titleItalic: 'Royal & Authentic',
    titleBold: 'Pheta Services',
    titleRegular: '& Custom Masterclasses',
    description: 'From grand wedding ceremonies and cultural processions to professional training workshops, discover our tailored turban styling services.',
    backgroundImage: '/service_pheta.webp',
    primaryButtonText: 'Book Service',
    primaryButtonLink: '/contact',
    secondaryButtonText: 'View Portfolio',
    secondaryButtonLink: '/our-work'
  },
  {
    pageName: 'our-work',
    tag: 'Portfolio of Pride',
    titleItalic: 'A Showcase of',
    titleBold: 'Royal Celebrations',
    titleRegular: '& Memorable Events',
    description: 'Explore our gallery of royal wedding ceremonies, celebrity satkars, high-profile dignitaries, and vibrant cultural processions across India.',
    backgroundImage: '/bannerimgside.png',
    primaryButtonText: 'Book Us Now',
    primaryButtonLink: '/contact',
    secondaryButtonText: 'Explore Services',
    secondaryButtonLink: '/services'
  },
  {
    pageName: 'products',
    tag: 'Exclusive Heritage',
    titleItalic: 'Handcrafted Royal',
    titleBold: 'Products & Rentals',
    titleRegular: 'Artifacts & Regalia',
    description: 'Discover our premium range of traditional Maharashtrian accessories, miniature phetas, Wagnakha replicas, and royal pagadis available for purchase and rental.',
    backgroundImage: '/aboutsideiamge.png',
    primaryButtonText: 'Inquire Now',
    primaryButtonLink: '/contact',
    secondaryButtonText: 'Our Services',
    secondaryButtonLink: '/services'
  },
  {
    pageName: 'contact',
    tag: 'Connect With Us',
    titleItalic: 'Begin Your',
    titleBold: 'Royal Experience',
    titleRegular: '& Event Inquiries',
    description: 'Whether you want to book our team for an upcoming wedding, festival, or masterclass training, reach out to us and let us create unforgettable memories.',
    backgroundImage: '/footerimg.png',
    primaryButtonText: 'Send Inquiry',
    primaryButtonLink: '#inquiry-form',
    secondaryButtonText: 'Explore Work',
    secondaryButtonLink: '/our-work'
  }
];

const seedBanners = async () => {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI missing');
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);

    console.log('Upserting banners for all 6 pages...');
    for (const b of banners) {
      await Banner.findOneAndUpdate(
        { pageName: b.pageName },
        b,
        { upsert: true, new: true }
      );
      console.log(`✔ Upserted Banner for: [${b.pageName}]`);
    }

    console.log('\nAll 6 page banners updated successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Error seeding banners:', err);
    process.exit(1);
  }
};

seedBanners();
