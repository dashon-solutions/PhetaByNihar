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

    const shouldReset = process.argv.includes('--reset');

    if (shouldReset) {
      console.log('Reset flag detected. Clearing existing data...');
      await Banner.deleteMany({});
      await AboutUs.deleteMany({});
      await Service.deleteMany({});
      await Product.deleteMany({});
      await Video.deleteMany({});
      await MediaLogo.deleteMany({});
      await Testimonial.deleteMany({});
      console.log('Data cleared.');
    }

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
    }

    // 2. Seed Banners (Home & About)
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      await Banner.insertMany([
        {
          pageName: 'home',
          tag: 'Preserving Heritage',
          titleItalic: 'The Art of',
          titleBold: 'Maharashtrian',
          titleRegular: 'Pheta Ceremony',
          description: 'Honoring traditions with elegance, respect & pride. From royal weddings to cultural celebrations, we bring the timeless art of Pheta tying to life.',
          backgroundImage: '/footerimg.png',
          primaryButtonText: 'Book Now',
          secondaryButtonText: 'Explore Work'
        },
        {
          pageName: 'about',
          tag: 'Our Legacy',
          titleItalic: 'The Journey of',
          titleBold: 'Pheta By Nihar',
          titleRegular: 'Tradition & Excellence',
          description: 'Learn the story behind our craft, our passion for Maharashtrian culture, and the masters who keep the tradition alive.',
          backgroundImage: '/aboutnewiamge.png',
          primaryButtonText: 'Contact Us',
          secondaryButtonText: 'View Classes'
        }
      ]);
      console.log('✔ Banners seeded.');
    }

    // 3. Seed About Us (Rich Data)
    const aboutCount = await AboutUs.countDocuments();
    if (aboutCount === 0) {
      const defaultAbout = new AboutUs({
        heading: 'A Tradition Passed Down with',
        italicHeading: 'Pride & Precision',
        text: "With deep respect for Maharashtrian culture and years of dedicated practice, Nihar Tambde keeps the royal tradition of Pheta tying alive. Each fold is more than just cloth – it's an emotion, a symbol of respect, honor and our glorious heritage.",
        portraitImage: '/about_portrait.webp',
        backgroundImage: '/aboutnewiamge.png',
        journey: "Our journey began over a decade ago with a simple desire: to see the youth of Maharashtra wear their traditional headgear with pride. What started as tying phetas for close family quickly grew into a cultural movement. Today, 'Pheta By Nihar' is synonymous with royal elegance, trusted by thousands for their most precious life events.",
        passion: "We are deeply passionate about the cultural roots of the Maratha empire. The Pheta is not merely an accessory; it is the crowning glory of Maharashtrian attire. Our passion lies in perfecting the folds, matching the vibrant colors, and ensuring every client feels like royalty on their special day.",
        experience: "With over 5,000 successful events, our team has mastered every style of Pheta - from the classic Puneri Pagadi and Kolhapuri Pheta to the majestic Shahi Pheta. We have had the honor of styling grooms, celebrities, and political figures, ensuring flawless execution even in high-pressure environments.",
        brandStory: "Pheta By Nihar represents a bridge between history and the modern era. Our brand is built on authenticity, premium quality fabrics, and unparalleled craftsmanship. When you choose us, you are not just hiring a service; you are embracing a legacy that commands respect and admiration.",
        classBatches: [
          {
            batchName: "Weekend Mastery Class",
            startDate: "15 Aug 2026",
            duration: "4 Weeks (Sat-Sun)",
            status: "Filling Fast",
            image: "/hero_bride_groom.png"
          },
          {
            batchName: "Intensive Bridal Pheta Workshop",
            startDate: "01 Sep 2026",
            duration: "2 Weeks",
            status: "Open",
            image: "/service_pheta.webp"
          }
        ]
      });
      await defaultAbout.save();
      console.log('✔ About Us seeded.');
    }

    // 4. Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      const defaultServices = [
        {
          title: 'Royal Wedding Pheta',
          description: 'Experience the grandeur of a traditional Maharashtrian wedding. Our signature Shahi Phetas are crafted using premium silk and gold zari, perfectly complementing the groom\'s attire for a truly majestic look.',
          image: '/hero_bride_groom.png',
          icon: 'Crown'
        },
        {
          title: 'Cultural Festivals',
          description: 'Celebrate Ganesh Chaturthi, Gudi Padwa, and Shiv Jayanti with authentic pride. We provide fast and elegant Pheta tying services for large groups, ensuring everyone looks spectacular for the festivities.',
          image: '/service_pheta.webp',
          icon: 'Tent'
        },
        {
          title: 'Professional Masterclasses',
          description: 'Join our highly sought-after workshops to learn the intricate art of Pheta tying. Suitable for beginners and professionals looking to turn this cultural art into a rewarding career.',
          image: '/hero_bride_groom.png',
          icon: 'GraduationCap'
        },
        {
          title: 'Corporate & Political Events',
          description: 'Add a touch of tradition and respect to corporate gatherings, award functions, and political rallies. We offer customized Pheta styles that command authority and reflect Maharashtrian hospitality.',
          image: '/service_pheta.webp',
          icon: 'Briefcase'
        }
      ];
      await Service.insertMany(defaultServices);
      console.log('✔ Services seeded.');
    }

    // 5. Seed Products with Marathi Names
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const defaultProducts = [
        {
          id: '01',
          name: 'Miniature Pheta',
          marathiName: 'मिनिएचर फेटा',
          subtitle: 'Decorative Heritage Artifact',
          image: '/wagnakh (2).png', // Assuming this was the image you were using
          description: 'Handcrafted mini-phetas designed as royal keepsakes. Perfect for car dashboards, home decor, or as a unique cultural gift.'
        },
        {
          id: '02',
          name: 'Wagh Nakh',
          marathiName: 'वाघनख',
          subtitle: 'Legendary Maratha Emblem',
          image: '/wagnakh.png',
          description: 'A detailed metal replica of the legendary "Tiger Claws" used by Chhatrapati Shivaji Maharaj. A symbol of courage and strategic brilliance.'
        },
        {
          id: '03',
          name: 'Rajmudra',
          marathiName: 'राजमुद्रा',
          subtitle: 'The Royal Sovereign Seal',
          image: '/rajmudra.jpg',
          description: 'Precision-etched historic royal seal of the Maratha Empire, cast in traditional metallic tones. An inspiring piece of history for your desk.'
        }
      ];
      await Product.insertMany(defaultProducts);
      console.log('✔ Products seeded.');
    }

    // 6. Seed Videos
    const videoCount = await Video.countDocuments();
    if (videoCount === 0) {
      const defaultVideos = [
        { title: 'Learn the Perfect Puneri Pagadi Fold | Expert Tutorial', channel: 'Pheta By Nihar', url: 'https://www.youtube.com/embed/OkjwpA-MdNc' },
        { title: 'Behind the Scenes: Styling a Royal Maharashtrian Groom', channel: 'Pheta By Nihar', url: 'https://www.youtube.com/embed/OkjwpA-MdNc' },
        { title: 'The History and Significance of the Kolhapuri Pheta', channel: 'Cultural Diaries', url: 'https://www.youtube.com/embed/OkjwpA-MdNc' }
      ];
      await Video.insertMany(defaultVideos);
      console.log('✔ Videos seeded.');
    }

    // 7. Seed Media Recognition Logos
    const logoCount = await MediaLogo.countDocuments();
    if (logoCount === 0) {
      const defaultLogos = [
        { name: 'Lokmat', color: '#6E1E18' },
        { name: 'Sakal', color: '#1a56db' },
        { name: 'ABP Majha', color: '#000000' },
        { name: 'TV9 Marathi', color: '#cc0000' }
      ];
      await MediaLogo.insertMany(defaultLogos);
      console.log('✔ Media Recognition Logos seeded.');
    }

    // 8. Seed Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      const defaultTestimonials = [
        {
          quote: "Nihar and his team are absolute professionals! The Shahi Pheta they tied for my wedding was so comfortable and looked incredibly regal. Highly recommended!",
          name: "Siddharth Patil",
          location: "Pune",
          rating: 5,
          image: "https://ui-avatars.com/api/?name=Siddharth&background=4D1217&color=D4AF37"
        },
        {
          quote: "We hired them for a large cultural event where over 50 guests needed Phetas. They were fast, efficient, and every single Pheta was tied with perfection.",
          name: "Neha Deshmukh",
          location: "Mumbai",
          rating: 5,
          image: "https://ui-avatars.com/api/?name=Neha&background=800020&color=D4AF37"
        },
        {
          quote: "The Wagh Nakh replica I bought is of stunning quality. It sits proudly on my desk. Also took the weekend masterclass—an unforgettable experience!",
          name: "Aditya Kulkarni",
          location: "Nashik",
          rating: 5,
          image: "https://ui-avatars.com/api/?name=Aditya&background=D4AF37&color=2A0D0F"
        }
      ];
      await Testimonial.insertMany(defaultTestimonials);
      console.log('✔ Testimonials seeded.');
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
