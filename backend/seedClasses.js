import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { PhetaClass } from './models/PhetaClass.js';
import { AboutUs } from './models/AboutUs.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const phetaClasses = [
  {
    title: 'Traditional Puneri & Kolhapuri Pheta Workshop',
    marathiTitle: 'पारंपरिक पुणेरी व कोल्हापुरी फेटा कार्यशाळा',
    level: 'Beginner to Intermediate',
    duration: '2 Days (Weekend Workshop - 8 Hours)',
    mode: 'In-Studio / Hands-on',
    description: 'Master the foundational techniques of authentic Puneri pagadi and vibrant Kolhapuri pheta draping with step-by-step guidance, pleat structuring, and fabric selection.',
    image: '/hero_bride_groom.png',
    price: '₹2,499',
    badge: 'Most Popular',
    eligibility: 'Open to all age groups (14+). No prior draping experience required.',
    certification: true,
    features: [
      { icon: 'Award', label: 'Authorized Certificate' },
      { icon: 'Layers', label: 'Authentic Pleat Techniques' },
      { icon: 'Smile', label: 'All Materials Provided' },
      { icon: 'Users', label: 'Small Batch (Max 12)' }
    ],
    curriculum: [
      'Heritage & Historical Significance of Maharashtrian Turbans',
      'Fabric Selection, Thread Grain, and Starching Techniques',
      'Mastering the Iconic 5-Fold Puneri Style with Golden Zari Border',
      'The Bold Kolhapuri Draping & Tassel Styling',
      'Live Model Practice and Form Correction'
    ]
  },
  {
    title: 'Royal Groom & Shahi Safa Masterclass',
    marathiTitle: 'शाही विवाह फेटा व साफा मास्टरक्लास',
    level: 'Intermediate to Advanced',
    duration: '3 Days Intensive (12 Hours)',
    mode: 'In-Studio / Hands-on',
    description: 'Designed for wedding stylists and enthusiasts looking to master regal groom pagadis, Maratha Shahi phetas, royal safas, Kalgi pinning, brooch styling, and luxury pearl ornaments.',
    image: '/service_pheta.webp',
    price: '₹4,999',
    badge: 'Best For Stylists',
    eligibility: 'Ideal for makeup artists, wedding planners, event stylists & passionate learners.',
    certification: true,
    features: [
      { icon: 'Crown', label: 'Royal Shahi Techniques' },
      { icon: 'Sparkles', label: 'Kalgi & Jewelry Styling' },
      { icon: 'Clock', label: 'Speed & Durability Mastery' },
      { icon: 'ShieldCheck', label: 'Masterclass Certification' }
    ],
    curriculum: [
      'Royal Maratha Dynasty Pheta Silhouettes and Variations',
      'Bespoke Groom Headwear Customization to Match Sherwani & Palette',
      'Kalgi, Sirpech & Brooch Secure Attachment Protocols',
      'Pure Silk & Brocade Draping for All-Day Comfort',
      'Wedding Day Styling Logistics and Time Management'
    ]
  },
  {
    title: 'Professional Turban Artist Certification Course',
    marathiTitle: 'व्यावसायिक फेटा आर्टिस्ट प्रमाणपत्र अभ्यासक्रम',
    level: 'Professional Masterclass',
    duration: '4 Weeks (Comprehensive Weekend Batch)',
    mode: 'Hybrid (Studio + Live Event Exposure)',
    description: 'The complete career-launching program for aspiring professional pheta artists. Covers 12+ regional Indian and Maharashtrian styles, commercial speed draping for 500+ guests, pricing, and live shadow training.',
    image: '/pheta_by_nihar_tambde_1676761513_3041218461604431189_2400202343.webp',
    price: '₹11,999',
    badge: 'Career Masterclass',
    eligibility: 'Passionate learners seeking to start their own wedding styling business.',
    certification: true,
    features: [
      { icon: 'Briefcase', label: 'Business & Client Kit' },
      { icon: 'Users', label: 'Mass Draping Techniques' },
      { icon: 'Award', label: 'Professional Certificate' },
      { icon: 'Video', label: 'Live Event Shadow Training' }
    ],
    curriculum: [
      '12+ Indian & Maharashtrian Traditional Turban Styles',
      'High-Speed Mass Draping (Under 60 Seconds per Person)',
      'Commercial Business Setup, Pricing Models & Portfolio Building',
      'Sourcing Premium Fabrics & Ornaments at Wholesale',
      'Live Event Practical Shadow Training with Master Nihar Tambde'
    ]
  },
  {
    title: 'Cultural Festivals & Dhol Tasha Pheta Workshop',
    marathiTitle: 'उत्सव व मिरवणूक फेटा कार्यशाळा',
    level: 'All Levels',
    duration: '1 Day Express (4 Hours)',
    mode: 'In-Studio / Group Workshop',
    description: 'Specialized workshop tailored for festival enthusiasts, Dhol Tasha Pathak members, and cultural event organizers. Learn energetic, slip-resistant, weather-proof pheta tying for long procession hours.',
    image: '/pheta_by_nihar_tambde_1665393890_2945859920821826134_2400202343.webp',
    price: '₹1,499',
    badge: 'Festival Special',
    eligibility: 'Open to youth, students, pathak members & festival organizers.',
    certification: true,
    features: [
      { icon: 'Flame', label: 'High-Movement Resistant' },
      { icon: 'Sun', label: 'Weather-Proof Hold' },
      { icon: 'Smile', label: 'Pathak Preferred' },
      { icon: 'Award', label: 'Workshop Badge' }
    ],
    curriculum: [
      'Heavy Movement-Resistant Locking Ties',
      'Saffron (Bhagwa) & Gold Band Draping for Grand Processions',
      'Quick Re-adjustment Techniques during Parades',
      'Head Comfort & Pressure Balance for Extended High-Energy Wear'
    ]
  },
  {
    title: 'Corporate Satkar & VIP Felicitation Training',
    marathiTitle: 'कॉर्पोरेट सत्कार व सन्मान फेटा प्रशिक्षण',
    level: 'Corporate & Hospitality Teams',
    duration: '1 Day Custom (3 Hours)',
    mode: 'On-Site / Corporate Office / Studio',
    description: 'Custom training for protocol officers, event management firms, and hospitality teams to respectfully drape and present traditional honor phetas for VIP dignitaries, political guests, and corporate awardees.',
    image: '/pheta_by_nihar_tambde_1676761513_3041218461604505343_2400202343.webp',
    price: '₹3,499 (Group Quotes Available)',
    badge: 'Corporate & VIP',
    eligibility: 'Corporate event planners, HR managers, PR teams & hospitality staff.',
    certification: true,
    features: [
      { icon: 'Briefcase', label: 'VIP Protocol Guidance' },
      { icon: 'Award', label: 'Ceremonial Standards' },
      { icon: 'Gift', label: 'Velvet Box Presentation' },
      { icon: 'FileText', label: 'Corporate Handbook' }
    ],
    curriculum: [
      'Maharashtrian Satkar Protocols and Dignitary Respect Traditions',
      'Elegant VIP Stage Presentation Etiquette and Timing',
      'Universal Head Sizing and Fast Comfort Fitting',
      'Silk Shawl & Sriphal Ceremony Coordination'
    ]
  },
  {
    title: 'Online Live Global Pheta Masterclass',
    marathiTitle: 'ऑनलाइन आंतरराष्ट्रीय फेटा मास्टरक्लास',
    level: 'Beginner to Intermediate',
    duration: '2 Days (Interactive Live Zoom Sessions)',
    mode: 'Online Live Interactive',
    description: 'For our global Maharashtrian diaspora and Indian heritage lovers across the USA, UK, UAE, Australia and beyond. Step-by-step live interactive HD training with real-time feedback and lifetime recorded access.',
    image: '/aboutsideiamge.png',
    price: '₹3,999 / $49 USD',
    badge: 'Global Diaspora',
    eligibility: 'International participants, diaspora families & remote learners worldwide.',
    certification: true,
    features: [
      { icon: 'Globe', label: 'Live Global Zoom' },
      { icon: 'Video', label: 'Lifetime Video Access' },
      { icon: 'MessageCircle', label: '1-on-1 Feedback' },
      { icon: 'Award', label: 'Digital Certificate' }
    ],
    curriculum: [
      'Finding & Choosing Suitable Fabrics Locally Abroad',
      'Step-by-step Self-Tying and Mirror Techniques',
      'Tying on Family Members for Weddings, Diwali & Gudi Padwa',
      'Live Q&A and Individual Form Correction by Master Nihar Tambde'
    ]
  }
];

const aboutOfferedClasses = [
  {
    title: "Offline Studio Masterclass",
    description: "Immersive, hands-on masterclass at our studio with live models, authentic silk fabrics, and personal 1-on-1 guidance from Nihar Tambde.",
    image: "/hero_bride_groom.png"
  },
  {
    title: "Online Global Masterclass",
    description: "Live interactive HD video training tailored for global learners & diaspora families. Learn step-by-step self-tying and ceremony draping from anywhere.",
    image: "/aboutsideiamge.png"
  },
  {
    title: "Group & Corporate Workshops",
    description: "Tailored cultural workshops for Dhol Tasha Pathaks, colleges, corporate satkars, and festival organizing committees with certification.",
    image: "/pheta_by_nihar_tambde_1665393890_2945859920821826134_2400202343.webp"
  },
  {
    title: "Royal Wedding Safa Specialization",
    description: "Advanced certification in bridal & groom pagadis, Kalgi attachment, Shahi folds, and high-speed mass barati draping for event professionals.",
    image: "/service_pheta.webp"
  }
];

const aboutClassBatches = [
  {
    batchName: "Weekend Mastery Batch (Sat-Sun)",
    startDate: "22 Aug 2026",
    duration: "2 Days (8 Hours Hands-on)",
    status: "Filling Fast",
    image: "/hero_bride_groom.png"
  },
  {
    batchName: "Professional Certified Artist Course",
    startDate: "05 Sep 2026",
    duration: "4 Weeks (Comprehensive)",
    status: "Open for Admission",
    image: "/pheta_by_nihar_tambde_1676761513_3041218461604431189_2400202343.webp"
  },
  {
    batchName: "Ganesh Utsav & Pathak Special",
    startDate: "12 Sep 2026",
    duration: "1 Day Intensive",
    status: "Admissions Open",
    image: "/pheta_by_nihar_tambde_1665393890_2945859920821826134_2400202343.webp"
  }
];

const seedClasses = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully.');

    // 1. Seed Dedicated Pheta Classes Collection
    console.log('Clearing old Pheta Classes catalog...');
    await PhetaClass.deleteMany({});

    console.log('Inserting rich Pheta Classes catalog...');
    const inserted = await PhetaClass.insertMany(phetaClasses);
    console.log(`✔ Successfully seeded ${inserted.length} Pheta Classes!`);

    // 2. Update About Us Offered Classes & Batches
    console.log('Updating About Us "Offered Classes" & Batches...');
    const aboutDoc = await AboutUs.findOne();
    if (aboutDoc) {
      aboutDoc.offeredClasses = aboutOfferedClasses;
      aboutDoc.classBatches = aboutClassBatches;
      await aboutDoc.save();
      console.log('✔ Successfully updated About Us "Offered Classes" and Batches in database!');
    } else {
      const newAbout = new AboutUs({
        offeredClasses: aboutOfferedClasses,
        classBatches: aboutClassBatches
      });
      await newAbout.save();
      console.log('✔ Created new About Us with Offered Classes and Batches!');
    }

    console.log('\n--- Seeded Classes Catalog ---');
    inserted.forEach((item, index) => {
      console.log(`${index + 1}. [${item.badge}] ${item.title} (${item.duration}) - ${item.price}`);
    });

    await mongoose.connection.close();
    console.log('\nDatabase connection closed. Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding pheta classes:', error);
    process.exit(1);
  }
};

seedClasses();

