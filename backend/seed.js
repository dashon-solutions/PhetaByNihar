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
import { PhetaClass } from './models/PhetaClass.js';

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
      await PhetaClass.deleteMany({});
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

    // 2. Seed Banners (All Pages)
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
      ]);
      console.log('✔ All Page Banners seeded.');
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
        offeredClasses: [
          {
            title: "Offline Studio Masterclass",
            description: "Immersive, hands-on masterclass at our Pune studio with live models, authentic silk fabrics, and personal 1-on-1 guidance from Nihar Tambde.",
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
        ],
        classBatches: [
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
      await Service.insertMany(defaultServices);
      console.log('✔ Rich services seeded.');
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

    // 9. Seed Pheta Classes & Workshops
    const classCount = await PhetaClass.countDocuments();
    if (classCount === 0) {
      const defaultClasses = [
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
        }
      ];
      await PhetaClass.insertMany(defaultClasses);
      console.log('✔ Pheta Classes seeded.');
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
