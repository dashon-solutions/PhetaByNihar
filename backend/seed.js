import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Import models
import { Admin } from './models/Admin.js';
import { Banner } from './models/Banner.js';
import { AboutUs } from './models/AboutUs.js';
import { Service } from './models/Service.js';
import { Product } from './models/Product.js';
import { Video } from './models/Video.js';
import { MediaLogo } from './models/MediaLogo.js';
import { Testimonial } from './models/Testimonial.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedDatabase = async () => {
  try {
    console.log('Connecting to database for seeding...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB. Starting seed...');

    // 1. Seed Admin User
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const defaultAdmin = new Admin({
        username: 'admin',
        password: hashedPassword
      });
      await defaultAdmin.save();
      console.log('✔ Default admin created: admin / admin123');
    } else {
      console.log('• Admin already exists. Skipping...');
    }

    // 2. Seed Banner
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      const defaultBanner = new Banner({
        tag: 'Preserving Heritage',
        titleItalic: 'The Art of',
        titleBold: 'Maharashtrian',
        titleRegular: 'Pheta Ceremony',
        description: 'Honoring traditions with elegance, respect & pride. From royal weddings to cultural celebrations, we bring the timeless art of Pheta tying to life.',
        backgroundImage: '/footerimg.png',
        primaryButtonText: 'Book Now',
        secondaryButtonText: 'Explore Work'
      });
      await defaultBanner.save();
      console.log('✔ Hero Banner seeded.');
    } else {
      console.log('• Hero Banner already exists. Skipping...');
    }

    // 3. Seed About Us
    const aboutCount = await AboutUs.countDocuments();
    if (aboutCount === 0) {
      const defaultAbout = new AboutUs({
        heading: 'A Tradition Passed Down with',
        italicHeading: 'Pride',
        text: "With deep respect for Maharashtrian culture and years of dedicated practice, Nihar Tambde keeps the royal tradition of Pheta tying alive. Each fold is more than just cloth – it's an emotion, a symbol of respect, honor and our glorious heritage.",
        portraitImage: '/about_portrait.webp',
        backgroundImage: '/aboutnewiamge.png'
      });
      await defaultAbout.save();
      console.log('✔ About Us seeded.');
    } else {
      console.log('• About Us already exists. Skipping...');
    }

    // 4. Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      const defaultServices = [
        {
          title: 'Wedding Pheta',
          description: 'Traditional & royal pheta ceremony for weddings that becomes a memory for life.',
          image: '/hero_bride_groom.png',
          icon: 'Crown'
        },
        {
          title: 'Cultural Events',
          description: 'Celebrate festivals, temple events & cultural programs with pride.',
          image: '/service_pheta.webp',
          icon: 'Tent'
        },
        {
          title: 'Workshops & Training',
          description: 'Learn the art of Pheta tying with our interactive workshops & training.',
          image: '/hero_bride_groom.png',
          icon: 'GraduationCap'
        },
        {
          title: 'Corporate Events',
          description: 'Add a touch of tradition to corporate gatherings, award functions & more.',
          image: '/service_pheta.webp',
          icon: 'Briefcase'
        }
      ];
      await Service.insertMany(defaultServices);
      console.log('✔ Services seeded.');
    } else {
      console.log('• Services already exist. Skipping...');
    }

    // 5. Seed Products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const defaultProducts = [
        {
          id: '01',
          name: 'Miniature Pheta',
          subtitle: 'Decorative Heritage Artifact',
          image: '/wagnakh (2).png',
          description: 'Handcrafted mini-phetas designed as royal keepsakes and cultural decor.'
        },
        {
          id: '02',
          name: 'Wagnakha',
          subtitle: 'Legendary Maratha Emblem',
          image: '/wagnakh.png',
          description: 'Detailed metal replicas showcasing the power and courage of Chhatrapati Shivaji Maharaj.'
        },
        {
          id: '03',
          name: 'Rajmudra',
          subtitle: 'The Royal Sovereign Seal',
          image: '/rajmudra.jpg',
          description: 'Precision-etched historic royal seal cast in traditional metallic tones.'
        }
      ];
      await Product.insertMany(defaultProducts);
      console.log('✔ Products seeded.');
    } else {
      console.log('• Products already exist. Skipping...');
    }

    // 6. Seed Videos
    const videoCount = await Video.countDocuments();
    if (videoCount === 0) {
      const defaultVideos = [
        { title: 'अधीपतीचा राजेशाही फेटा बांधतानाची खास झलक आणि फेटयाबद्दलचा विशेष अभिप्राय नक्की बघा @PhetabyNihar', channel: 'Zee Marathi', url: 'https://www.youtube.com/embed/OkjwpA-MdNc' },
        { title: 'अधीपतीचा राजेशाही फेटा बांधतानाची खास झलक आणि फेटयाबद्दलचा विशेष अभिप्राय नक्की बघा @PhetabyNihar', channel: 'Zee Marathi', url: 'https://www.youtube.com/embed/OkjwpA-MdNc' },
        { title: 'अधीपतीचा राजेशाही फेटा बांधतानाची खास झलक आणि फेटयाबद्दलचा विशेष अभिप्राय नक्की बघा @PhetabyNihar', channel: 'Zee Marathi', url: 'https://www.youtube.com/embed/OkjwpA-MdNc' },
        { title: 'अधीपतीचा राजेशाही फेटा बांधतानाची खास झलक आणि फेटयाबद्दलचा विशेष अभिप्राय नक्की बघा @PhetabyNihar', channel: 'Zee Marathi', url: 'https://www.youtube.com/embed/OkjwpA-MdNc' },
        { title: 'अधीपतीचा राजेशाही फेटा बांधतानाची खास झलक आणि फेटयाबद्दलचा विशेष अभिप्राय नक्की बघा @PhetabyNihar', channel: 'Zee Marathi', url: 'https://www.youtube.com/embed/OkjwpA-MdNc' },
      ];
      await Video.insertMany(defaultVideos);
      console.log('✔ Videos seeded.');
    } else {
      console.log('• Videos already exist. Skipping...');
    }

    // 7. Seed Media Recognition Logos
    const logoCount = await MediaLogo.countDocuments();
    if (logoCount === 0) {
      const defaultLogos = [
        { name: 'Lokmat', color: '#6E1E18' },
        { name: 'Sakal', color: '#1a56db' },
        { name: 'ABP', color: '#000000' },
        { name: 'TV9', color: '#cc0000' }
      ];
      await MediaLogo.insertMany(defaultLogos);
      console.log('✔ Media Recognition Logos seeded.');
    } else {
      console.log('• Media Logos already exist. Skipping...');
    }

    // 8. Seed Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      const defaultTestimonials = [
        {
          quote: "Nihar's Pheta tying added a royal touch to our wedding. Every single guest was mesmerized by the precision of folds!",
          name: "Radhika & Swapnil",
          location: "Pune, India",
          rating: 5,
          image: "https://ui-avatars.com/api/?name=Radhika&background=4D1217&color=D4AF37"
        },
        {
          quote: "Professional, punctual, and profoundly passionate. They brought authentic Maratha regal elegance to our heritage event.",
          name: "Rohit Deshmukh",
          location: "Mumbai, India",
          rating: 5,
          image: "https://ui-avatars.com/api/?name=Rohit&background=800020&color=D4AF37"
        },
        {
          quote: "The masterclass workshop was divine! We didn't just learn turban wrapping; we experienced the soul of royal Maharashtrian culture.",
          name: "Anagha Kulkarni",
          location: "California, USA",
          rating: 5,
          image: "https://ui-avatars.com/api/?name=Anagha&background=D4AF37&color=2A0D0F"
        }
      ];
      await Testimonial.insertMany(defaultTestimonials);
      console.log('✔ Testimonials seeded.');
    } else {
      console.log('• Testimonials already exist. Skipping...');
    }

    console.log('DB Seeding complete! Closing connection...');
    await mongoose.disconnect();
    console.log('Connection closed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed with error:', error);
    process.exit(1);
  }
};

seedDatabase();
