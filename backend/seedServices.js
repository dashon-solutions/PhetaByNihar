import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Service } from './models/Service.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const richServices = [
  {
    title: 'Royal Groom Pheta & Safa Styling',
    description: 'Bespoke royal Maharashtrian and Shahi phetas tailored to harmonize with the groom\'s sherwani and regal wedding palette, adorned with exquisite kalgi, brooches, and pearl necklaces.',
    image: '/hero_bride_groom.png',
    icon: 'Crown',
    moreInfo: 'Includes personal on-site styling for the groom, matching pagadi brooches, and pre-wedding consultation.',
    features: [
      { icon: 'Crown', label: 'Shahi Groom Turban' },
      { icon: 'Award', label: 'Custom Kalgi & Ornaments' },
      { icon: 'Sparkles', label: 'Pure Silk & Zari Fabrics' },
      { icon: 'Heart', label: 'On-Site Groom Styling' }
    ]
  },
  {
    title: 'Barati & Family Mass Pheta Draping',
    description: 'High-speed, synchronized traditional Pheta tying for wedding parties, baratis, and honored family guests of 50 to 500+ attendees with zero compromise on elegance.',
    image: '/service_pheta.webp',
    icon: 'Users',
    moreInfo: 'Our team of experienced artists can drape up to 200+ guests in under 60 minutes with coordinated themes.',
    features: [
      { icon: 'Users', label: '500+ Guests Capacity' },
      { icon: 'Palette', label: 'Theme Coordinated Colors' },
      { icon: 'Flag', label: 'Authentic Traditional Folds' },
      { icon: 'Star', label: 'Rapid Professional Draping' }
    ]
  },
  {
    title: 'Cultural Festivals & Grand Shobha Yatras',
    description: 'Authentic Puneri and Kolhapuri pheta styling for Ganesh Utsav, Gudi Padwa, Dhol Tasha Pathaks, and Shiv Jayanti processions honoring Maharashtra\'s glorious legacy.',
    image: '/pheta_by_nihar_tambde_1676761513_3041218461604431189_2400202343.webp',
    icon: 'Tent',
    moreInfo: 'Weather-resistant and movement-friendly tying techniques specially designed for dynamic procession performers.',
    features: [
      { icon: 'Landmark', label: 'Puneri & Kolhapuri Styles' },
      { icon: 'Flag', label: 'Dhol Tasha Troupe Styling' },
      { icon: 'Award', label: 'Secure All-Day Hold' },
      { icon: 'Sparkles', label: 'Traditional Saffron & Gold' }
    ]
  },
  {
    title: 'Celebrity, Film & Media Styling',
    description: 'Historical and contemporary headgear styling for feature films, television shows, celebrity red carpets, theatrical plays, and high-fashion editorial campaigns.',
    image: '/pheta_by_nihar_tambde_1676761513_3041218461604505343_2400202343.webp',
    icon: 'Video',
    moreInfo: 'Full on-set continuity management, character-specific turban design, and rapid restyling between takes.',
    features: [
      { icon: 'Video', label: 'Camera-Ready Precision' },
      { icon: 'Palette', label: 'Period-Accurate Design' },
      { icon: 'Award', label: 'Celebrity Experience' },
      { icon: 'Star', label: 'On-Set Continuous Support' }
    ]
  },
  {
    title: 'Corporate Honors & VIP Felicitation',
    description: 'Dignified Maharashtrian Satkar and ceremonial honor phetas for corporate annual meets, national summits, award ceremonies, and political dignitaries.',
    image: '/pheta_by_nihar_tambde_1665393890_2945859920821826134_2400202343.webp',
    icon: 'Briefcase',
    moreInfo: 'Includes ceremonial protocol advisory, royal velvet presentation boxes, and respectful stage assistance.',
    features: [
      { icon: 'Briefcase', label: 'Executive Satkar Pheta' },
      { icon: 'Shield', label: 'State & Corporate Protocol' },
      { icon: 'Presentation', label: 'Dignitary Felicitation' },
      { icon: 'Crown', label: 'Silk Shawl & Sriphal Set' }
    ]
  },
  {
    title: 'Destination Weddings & Global Travel',
    description: 'Pan-India and international destination wedding services. Our specialized troupe travels worldwide to deliver authentic royal Maratha grandeur to your chosen venue.',
    image: '/pheta_by_nihar_tambde_1665393499_2945856640876056884_2400202343.webp',
    icon: 'Plane',
    moreInfo: 'Comprehensive multi-day coverage including Sangeet, Haldi, Baraat, and Reception styling across all global locations.',
    features: [
      { icon: 'Plane', label: 'Pan-India & Global Travel' },
      { icon: 'MapPin', label: 'Turnkey Logistics Handling' },
      { icon: 'Users', label: 'Multi-Day Wedding Support' },
      { icon: 'Award', label: 'Dedicated Styling Crew' }
    ]
  },
  {
    title: 'Professional Masterclasses & Certification',
    description: 'Comprehensive, hands-on certification training programs covering traditional folding techniques, fabric curation, client styling, and commercial event management.',
    image: '/about_portrait.webp',
    icon: 'GraduationCap',
    moreInfo: 'Personal mentorship by master artist Nihar Tambde with practical live workshop sessions and authorized certification.',
    features: [
      { icon: 'GraduationCap', label: 'Certified Career Training' },
      { icon: 'Presentation', label: 'Hands-on Live Practice' },
      { icon: 'Ticket', label: 'Business Growth Blueprint' },
      { icon: 'Sparkles', label: 'Master 10+ Heritage Styles' }
    ]
  },
  {
    title: 'Pre-Tied Royal Phetas & Custom Crafting',
    description: 'Custom-tailored, ready-to-wear phetas with lightweight structured inner linings for effortless wearing without requiring an on-site tying artist.',
    image: '/pheta_by_nihar_tambde_1676761513_3041218461596044683_2400202343.webp',
    icon: 'Sparkles',
    moreInfo: 'Shipped safely in shockproof packaging with worldwide courier delivery and personalized measurement fittings.',
    features: [
      { icon: 'Sparkles', label: 'Instant Wear Comfort' },
      { icon: 'Award', label: 'Custom Head Size Fit' },
      { icon: 'Plane', label: 'Worldwide Doorstep Shipping' },
      { icon: 'Heart', label: 'Durable Shape Retention' }
    ]
  }
];

const seedServices = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI is missing in environment variables.');
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('✔ Connected to MongoDB Atlas.');

    console.log('Clearing old services and inserting rich service catalog...');
    await Service.deleteMany({});

    const inserted = await Service.insertMany(richServices);
    console.log(`✔ Successfully seeded ${inserted.length} rich services!`);

    inserted.forEach((s, idx) => {
      console.log(`  ${idx + 1}. [${s.icon}] ${s.title} (${s.features.length} features)`);
    });

    await mongoose.disconnect();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();
