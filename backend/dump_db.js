import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

// Import all models
import { Banner } from './models/Banner.js';
import { AboutUs } from './models/AboutUs.js';
import { Service } from './models/Service.js';
import { Product } from './models/Product.js';
import { Video } from './models/Video.js';
import { MediaLogo } from './models/MediaLogo.js';
import { Testimonial } from './models/Testimonial.js';
import { PhetaClass } from './models/PhetaClass.js';
import { OurWork } from './models/OurWork.js';
import { Event } from './models/Event.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const dumpDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB. Fetching current data...');

    const [
      banners,
      aboutUs,
      services,
      products,
      videos,
      mediaLogos,
      testimonials,
      phetaClasses,
      ourWork,
      events
    ] = await Promise.all([
      Banner.find().lean(),
      AboutUs.findOne().lean(),
      Service.find().lean(),
      Product.find().lean(),
      Video.find().lean(),
      MediaLogo.find().lean(),
      Testimonial.find().lean(),
      PhetaClass.find().lean(),
      OurWork.find().lean(),
      Event.find().lean()
    ]);

    const dump = {
      banners,
      aboutUs,
      services,
      products,
      videos,
      mediaLogos,
      testimonials,
      phetaClasses,
      ourWork,
      events
    };

    fs.writeFileSync('./current_db_dump.json', JSON.stringify(dump, null, 2), 'utf-8');
    console.log('Dump completed successfully to current_db_dump.json');
    console.log(`Banners: ${banners.length}`);
    console.log(`AboutUs: ${aboutUs ? 'Found' : 'Not found'}`);
    console.log(`Services: ${services.length}`);
    console.log(`Products: ${products.length}`);
    console.log(`Videos: ${videos.length}`);
    console.log(`MediaLogos: ${mediaLogos.length}`);
    console.log(`Testimonials: ${testimonials.length}`);
    console.log(`PhetaClasses: ${phetaClasses.length}`);
    console.log(`OurWork: ${ourWork.length}`);
    console.log(`Events: ${events.length}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error dumping database:', error);
    process.exit(1);
  }
};

dumpDatabase();
