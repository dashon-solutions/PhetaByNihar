// Centralized Fallback Data (Synced with Live MongoDB Database)
// Ensures the entire website functions beautifully even if backend is offline or sleeping.

export const fallbackBanners: Record<string, any> = {
  home: {
    _id: "6a6b2ea861ea1ce5d0dc7b56",
    pageName: "home",
    tag: "Preserving Heritage",
    titleItalic: "The Art of",
    titleBold: "Maharashtrian",
    titleRegular: "Pheta Ceremony",
    description: "Honoring traditions with elegance, respect & pride. From royal weddings to cultural celebrations, we bring the timeless art of Pheta tying to life.",
    backgroundImage: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787037436/phetabynihar/gqnthtwmpajc6eyuctss.webp",
    primaryButtonText: "Book Now",
    secondaryButtonText: "Explore Work",
    primaryButtonLink: "/contact",
    secondaryButtonLink: "/our-work"
  },
  about: {
    _id: "6a6b2ea861ea1ce5d0dc7b57",
    pageName: "about",
    tag: "Our Legacy",
    titleItalic: "The Story Behind",
    titleBold: "Pheta By Nihar",
    titleRegular: "Tradition & Excellence",
    description: "Learn the story behind our craft, our passion for Maharashtrian culture, and the masters who keep the royal tradition alive.",
    backgroundImage: "/aboutnewiamge.png",
    primaryButtonText: "Explore Collection",
    secondaryButtonText: "Our Services",
    primaryButtonLink: "/products",
    secondaryButtonLink: "/services"
  },
  services: {
    _id: "6a83427514472786a4409e61",
    pageName: "services",
    tag: "Specialized Offerings",
    titleItalic: "Royal & Authentic",
    titleBold: "Pheta Services",
    titleRegular: "& Custom Masterclasses",
    description: "From grand wedding ceremonies and cultural processions to professional training workshops, discover our tailored turban styling services.",
    backgroundImage: "/service_pheta.webp",
    primaryButtonText: "Book Service",
    primaryButtonLink: "/contact",
    secondaryButtonText: "View Portfolio",
    secondaryButtonLink: "/our-work"
  },
  products: {
    _id: "6a83427a14472786a4409f00",
    pageName: "products",
    tag: "Exclusive Heritage",
    titleItalic: "Handcrafted Royal",
    titleBold: "Products & Rentals",
    titleRegular: "Artifacts & Regalia",
    description: "Discover our premium range of traditional Maharashtrian accessories, miniature phetas, Wagnakha replicas, and royal pagadis available for purchase and rental.",
    backgroundImage: "/aboutsideiamge.png",
    primaryButtonText: "Inquire Now",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Our Services",
    secondaryButtonLink: "/services"
  },
  "our-work": {
    _id: "6a83427b14472786a4409f06",
    pageName: "our-work",
    tag: "Portfolio of Pride",
    titleItalic: "A Showcase of",
    titleBold: "Royal Celebrations",
    titleRegular: "& Memorable Events",
    description: "Explore our gallery of royal wedding ceremonies, celebrity satkars, high-profile dignitaries, and vibrant cultural processions across India.",
    backgroundImage: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1786987312/phetabynihar/yynqboe8qt44wurfojr5.webp",
    primaryButtonText: "Book Us Now",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Explore Services",
    secondaryButtonLink: "/services"
  },
  contact: {
    _id: "6a83429a2f4cfc7c249ca2df",
    pageName: "contact",
    tag: "Connect With Us",
    titleItalic: "Begin Your",
    titleBold: "Royal Experience",
    titleRegular: "& Event Inquiries",
    description: "Whether you want to book our team for an upcoming wedding, festival, or masterclass training, reach out to us and let us create unforgettable memories.",
    backgroundImage: "/footerimg.png",
    primaryButtonText: "Send Inquiry",
    primaryButtonLink: "#inquiry-form",
    secondaryButtonText: "Explore Work",
    secondaryButtonLink: "/our-work"
  },
  events: {
    _id: "6a847c7ba0b0ab50c7a8e7b9",
    pageName: "events",
    tag: "Preserving Heritage",
    titleItalic: "The Art of",
    titleBold: "Maharashtrian",
    titleRegular: "Pheta Ceremony",
    description: "Honoring traditions with elegance, respect & pride. Join our upcoming masterclasses and cultural events.",
    backgroundImage: "/footerimg.png",
    primaryButtonText: "Book Now",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Explore Work",
    secondaryButtonLink: "/our-work"
  },
  videos: {
    _id: "6a847c9ca0b0ab50c7a8e7f4",
    pageName: "videos",
    tag: "Preserving Heritage",
    titleItalic: "The Art of",
    titleBold: "Maharashtrian",
    titleRegular: "Pheta Ceremony",
    description: "Watch our masterclass tutorials, media interviews, and behind-the-scenes royal styling videos.",
    backgroundImage: "/footerimg.png",
    primaryButtonText: "Book Now",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Explore Work",
    secondaryButtonLink: "/our-work"
  }
};

export const fallbackAboutUs = {
  _id: "6a6b2ea861ea1ce5d0dc7b5a",
  heading: "A Tradition Passed Down with",
  italicHeading: "Pride & Precision",
  text: "With deep respect for Maharashtrian culture and years of dedicated practice, Nihar Tambde keeps the royal tradition of Pheta tying alive. Each fold is more than just cloth – it's an emotion, a symbol of respect, honor and our glorious heritage.",
  portraitImage: "/about_portrait.webp",
  backgroundImage: "/aboutnewiamge.png",
  journey: "Our journey began over a decade ago with a simple desire: to see the youth of Maharashtra wear their traditional headgear with pride. What started as tying phetas for close family quickly grew into a cultural movement. Today, 'Pheta By Nihar' is synonymous with royal elegance, trusted by thousands for their most precious life events.",
  passion: "We are deeply passionate about the cultural roots of the Maratha empire. The Pheta is not merely an accessory; it is the crowning glory of Maharashtrian attire. Our passion lies in perfecting the folds, matching the vibrant colors, and ensuring every client feels like royalty on their special day.",
  experience: "With over 5,000 successful events, our team has mastered every style of Pheta - from the classic Puneri Pagadi and Kolhapuri Pheta to the majestic Shahi Pheta. We have had the honor of styling grooms, celebrities, and political figures, ensuring flawless execution even in high-pressure environments.",
  brandStory: "Pheta By Nihar represents a bridge between history and the modern era. Our brand is built on authenticity, premium quality fabrics, and unparalleled craftsmanship. When you choose us, you are not just hiring a service; you are embracing a legacy that commands respect and admiration.",
  classBatches: [
    {
      _id: "6a834068bdcf355e313fc069",
      batchName: "Weekend Mastery Batch (Sat-Sun)",
      startDate: "22 Aug 2026",
      duration: "2 Days (8 Hours Hands-on)",
      status: "Filling Fast",
      image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230125/phetabynihar/adbakyzrkoljbywhr4eq.webp"
    }
  ],
  offeredClasses: [
    {
      _id: "6a834068bdcf355e313fc065",
      title: "Offline Studio Masterclass",
      description: "Immersive, hands-on masterclass at our studio with live models, authentic silk fabrics, and personal 1-on-1 guidance from Nihar Tambde.",
      image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230095/phetabynihar/vt7nb1nhd70ocsfwlwxv.webp"
    }
  ],
  quoteAuthor: "Nihar Tambde",
  quoteText: "For me, it’s not just about tying a pheta, it’s about creating emotions and memories that last forever."
};

export const fallbackServices = [
  {
    _id: "6a8335d61b03ee03ec7a6705",
    title: "Royal Groom Pheta & Safa Styling",
    description: "Bespoke royal Maharashtrian and Shahi phetas tailored to harmonize with the groom's sherwani and regal wedding palette, adorned with exquisite kalgi, brooches, and pearl necklaces.",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1786985432/phetabynihar/zd0gzxbfmvx8gu8ozvw8.webp",
    icon: "Crown",
    moreInfo: "Includes personal on-site styling for the groom, matching pagadi brooches, and pre-wedding consultation.",
    features: [
      { icon: "Crown", label: "Shahi Groom Turban" },
      { icon: "Award", label: "Custom Kalgi & Ornaments" },
      { icon: "Sparkles", label: "Pure Silk & Zari Fabrics" },
      { icon: "Heart", label: "On-Site Groom Styling" }
    ]
  },
  {
    _id: "6a8335d61b03ee03ec7a670a",
    title: "Barati & Family Mass Pheta Draping",
    description: "High-speed, synchronized traditional Pheta tying for wedding parties, baratis, and honored family guests of 50 to 500+ attendees with zero compromise on elegance.",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787229642/phetabynihar/aaonyzcf2cq67qkix8gy.webp",
    icon: "Users",
    moreInfo: "Our team of experienced artists can drape up to 200+ guests in under 60 minutes with coordinated themes.",
    features: [
      { icon: "Users", label: "500+ Guests Capacity" },
      { icon: "Palette", label: "Theme Coordinated Colors" },
      { icon: "Flag", label: "Authentic Traditional Folds" },
      { icon: "Star", label: "Rapid Professional Draping" }
    ]
  },
  {
    _id: "6a8335d61b03ee03ec7a670f",
    title: "Cultural Festivals & Grand Shobha Yatras",
    description: "Authentic Puneri and Kolhapuri pheta styling for Ganesh Utsav, Gudi Padwa, Dhol Tasha Pathaks, and Shiv Jayanti processions honoring Maharashtra's glorious legacy.",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1786985450/phetabynihar/gjbzn7faqbteq6kvv8xa.webp",
    icon: "Tent",
    moreInfo: "Weather-resistant and movement-friendly tying techniques specially designed for dynamic procession performers.",
    features: [
      { icon: "Landmark", label: "Puneri & Kolhapuri Styles" },
      { icon: "Flag", label: "Dhol Tasha Troupe Styling" },
      { icon: "Award", label: "Secure All-Day Hold" },
      { icon: "Sparkles", label: "Traditional Saffron & Gold" }
    ]
  },
  {
    _id: "6a8335d61b03ee03ec7a6714",
    title: "Celebrity, Film & Media Styling",
    description: "Historical and contemporary headgear styling for feature films, television shows, celebrity red carpets, theatrical plays, and high-fashion editorial campaigns.",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787229723/phetabynihar/cmymhcqi21jrhyphhkxa.webp",
    icon: "Video",
    moreInfo: "Full on-set continuity management, character-specific turban design, and rapid restyling between takes.",
    features: [
      { icon: "Video", label: "Camera-Ready Precision" },
      { icon: "Palette", label: "Period-Accurate Design" },
      { icon: "Award", label: "Celebrity Experience" },
      { icon: "Star", label: "On-Set Continuous Support" }
    ]
  },
  {
    _id: "6a8335d61b03ee03ec7a6719",
    title: "Corporate Honors & VIP Felicitation",
    description: "Dignified Maharashtrian Satkar and ceremonial honor phetas for corporate annual meets, national summits, award ceremonies, and political dignitaries.",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787229765/phetabynihar/rgfdpix3nlh6tlulow9z.webp",
    icon: "Briefcase",
    moreInfo: "Includes ceremonial protocol advisory, royal velvet presentation boxes, and respectful stage assistance.",
    features: [
      { icon: "Briefcase", label: "Executive Satkar Pheta" },
      { icon: "Shield", label: "State & Corporate Protocol" },
      { icon: "Presentation", label: "Dignitary Felicitation" },
      { icon: "Crown", label: "Silk Shawl & Sriphal Set" }
    ]
  },
  {
    _id: "6a8335d61b03ee03ec7a671e",
    title: "Destination Weddings & Global Travel",
    description: "Pan-India and international destination wedding services. Our specialized troupe travels worldwide to deliver authentic royal Maratha grandeur to your chosen venue.",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787229801/phetabynihar/rokim9s9xdkqp55uadkm.webp",
    icon: "Plane",
    moreInfo: "Comprehensive multi-day coverage including Sangeet, Haldi, Baraat, and Reception styling across all global locations.",
    features: [
      { icon: "Plane", label: "Pan-India & Global Travel" },
      { icon: "MapPin", label: "Turnkey Logistics Handling" },
      { icon: "Users", label: "Multi-Day Wedding Support" },
      { icon: "Award", label: "Dedicated Styling Crew" }
    ]
  },
  {
    _id: "6a8335d61b03ee03ec7a6723",
    title: "Professional Masterclasses & Certification",
    description: "Comprehensive, hands-on certification training programs covering traditional folding techniques, fabric curation, client styling, and commercial event management.",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787229826/phetabynihar/iyrizaxx3ehj10gsvd0x.webp",
    icon: "GraduationCap",
    moreInfo: "Personal mentorship by master artist Nihar Tambde with practical live workshop sessions and authorized certification.",
    features: [
      { icon: "Presentation", label: "Hands-on Live Practice" },
      { icon: "Ticket", label: "Business Growth Blueprint" },
      { icon: "Sparkles", label: "Master 10+ Heritage Styles" }
    ]
  },
  {
    _id: "6a8335d61b03ee03ec7a6728",
    title: "Pre-Tied Royal Phetas & Custom Crafting",
    description: "Custom-tailored, ready-to-wear phetas with lightweight structured inner linings for effortless wearing without requiring an on-site tying artist.",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787229860/phetabynihar/gy6yqdd84on9tqg9gsfs.webp",
    icon: "Sparkles",
    moreInfo: "Shipped safely in shockproof packaging with worldwide courier delivery and personalized measurement fittings.",
    features: [
      { icon: "Sparkles", label: "Instant Wear Comfort" },
      { icon: "Award", label: "Custom Head Size Fit" },
      { icon: "Plane", label: "Worldwide Doorstep Shipping" },
      { icon: "Heart", label: "Durable Shape Retention" }
    ]
  }
];

export const fallbackProducts = [
  {
    _id: "6a6b2ea861ea1ce5d0dc7b65",
    id: "01",
    name: "Ready-made Pheta",
    marathiName: "तयार फेटा",
    subtitle: "Decorative Heritage Artifact",
    image: "/wagnakh (2).png",
    description: "Handcrafted mini-phetas designed as royal keepsakes. Perfect for car dashboards, home decor, or as a unique cultural gift.",
    galleryImages: [
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231232/phetabynihar/efip11pjodywb1vhowlk.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231233/phetabynihar/zlhhcuwzgfyligj8pst9.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231235/phetabynihar/elwg8geophxlmdkzkq9t.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231236/phetabynihar/nshdjwhzaarxtcxg02me.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231238/phetabynihar/kjmwmdaf5dzkrjrrnct2.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231240/phetabynihar/wefl7z8etjscyoc7ynhf.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231241/phetabynihar/yodgde0pjntblghr5e3r.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231242/phetabynihar/oj2zxf2psztkkh332hem.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231243/phetabynihar/xn4u3cjztrpasv1hcrje.webp"
    ],
    information: ""
  },
  {
    _id: "6a6b2ea861ea1ce5d0dc7b66",
    id: "02",
    name: "Wagh Nakh Maal",
    marathiName: "वाघनख माळ",
    subtitle: "Legendary Maratha Emblem",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787503896/phetabynihar/kbsklmapzssojjjj0j2n.webp",
    description: "A detailed metal replica of the legendary Wagh Nakh Maal. A symbol of courage and strategic brilliance.",
    galleryImages: [
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231535/phetabynihar/a21kk9edsoz0vdk9nmg5.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231537/phetabynihar/lebyiqxiqstrabtklbpf.webp"
    ],
    information: ""
  },
  {
    _id: "6a6b2ea861ea1ce5d0dc7b67",
    id: "03",
    name: "Chhatrapati Sambhaji Maharaj Rajmudra Badge (Pin-Up)",
    marathiName: "छ. संभाजी महा. राजमुद्रा बॅच (pinup)",
    subtitle: "The Royal Sovereign Seal",
    price: 350,
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231354/phetabynihar/pbnmvzusyfsm8jwff79b.webp",
    description: "6 mm MDF wooden artificial gold leaf with acrylic coating. Precision-etched historic royal seal of the Maratha Empire, cast in traditional metallic tones.",
    galleryImages: [
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231393/phetabynihar/b4sdv76aucekp87uosc0.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231394/phetabynihar/q6xuudx7zc6xjjfyb9hy.webp"
    ],
    information: ""
  },
  {
    _id: "6a8b28d46add499aab460d91",
    id: "04",
    name: "Chhatrapati Shivaji Maharaj Rajmudra Pinup Badge",
    marathiName: "छ. शिवाजी महाराज राजमुद्रा पिनअप बॅच",
    subtitle: "Crafted Pinup Badge",
    price: 300,
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787505550/phetabynihar/hvcad98rjhoeyitzsjdp.webp",
    galleryImages: [
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787504818/phetabynihar/ahkmaoul92ojjsoapywi.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787504819/phetabynihar/xvxtyd9rxrhvnalxcyu5.webp"
    ],
    description: "Crafted with a 6 mm MDF wooden base, artificial gold leaf finish, and protective acrylic coating. Ideal for styling on phetas, traditional wear, or jackets.",
    information: "Crafted with a 6 mm MDF wooden base, artificial gold leaf finish, and protective acrylic coating."
  },
  {
    _id: "6a8b296c6add499aab460d93",
    id: "05",
    name: "Chhatrapati Shivaji Maharaj Rajmudra & Signature Pinup Badge",
    marathiName: "छ. शिवाजी महाराज राजमुद्रा व स्वाक्षरी पिनअप बॅच",
    subtitle: "Pinup Badge",
    price: 400,
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787505454/phetabynihar/t7evsglbizdhpc21c9b4.webp",
    galleryImages: [
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787504959/phetabynihar/fk84zrpyci5advlctxlt.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787504960/phetabynihar/psqy2iekatrwnerssffa.webp"
    ],
    description: "Premium pinup badge featuring the royal seal alongside Chhatrapati Shivaji Maharaj's historic signature. Built on a 6 mm MDF base with gold leaf detailing and acrylic coat finish.",
    information: "Premium pinup badge featuring the royal seal alongside Chhatrapati Shivaji Maharaj's historic signature."
  },
  {
    _id: "6a8b2a6a6add499aab460d99",
    id: "06",
    name: "Chhatrapati Shivaji Maharaj Rajmudra 2-in-1 (Acrylic Badge + Fridge Magnet)",
    marathiName: "छ. शिवाजी महाराज राजमुद्रा २-इन-१ (अ‍ॅक्रेलिक बॅच + फ्रिज मॅग्नेट)",
    subtitle: "Acrylic Badge + Fridge Magnet",
    price: 300,
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787505476/phetabynihar/delsqdosbw9rz3z9z8vt.webp",
    galleryImages: [
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787505195/phetabynihar/ehfn4yuy7x3se7jlb8am.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787505196/phetabynihar/uikpzq9kvcdpuq0trb6u.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787505197/phetabynihar/hnoz1ntj1ao8dhyahcvz.webp"
    ],
    description: "Versatile 2-in-1 product crafted from 3 mm premium acrylic material. Features a built-in magnet, allowing it to be worn as a badge or used as a fridge/metal magnet.",
    information: "Versatile 2-in-1 product crafted from 3 mm premium acrylic material."
  }
];

export const fallbackVideos = [
  {
    _id: "6a6b2ea861ea1ce5d0dc7b6a",
    title: "Learn the Perfect Puneri Pagadi Fold | Expert Tutorial",
    channel: "Pheta By Nihar",
    url: "https://www.instagram.com/stories/highlights/17963849905800662/?hl=en"
  },
  {
    _id: "6a6b2ea861ea1ce5d0dc7b6c",
    title: "Special Interview on Maharashtra Day (1 May) conducted by Maharashtra Times Digital",
    channel: "Cultural Diaries",
    url: "https://www.youtube.com/embed/cCsAXgrgKh4?si=ir-DqJaVnmZno88t"
  },
  {
    _id: "6a6b2ea861ea1ce5d0dc7b6b",
    title: "How the Turban of Kondhanpur’s Mankaris Was Tied",
    channel: "Pheta By Nihar",
    url: "https://www.youtube.com/embed/TTldj5BQ9yw?si=Qg5eBz0w-lMEEHGj"
  },
  {
    _id: "6a83305fd6456c0d86dc10d1",
    title: "News18 Marathi takes note of the history of the Pheta — How might the Pheta have originated? @PhetaByNihar",
    channel: "News18",
    url: "https://www.youtube.com/embed/wauqWpcfwWY?si=qhCE2dKAr6C6pg_a"
  },
  {
    _id: "6a833096d6456c0d86dc10d3",
    title: "From Delivery Boy to the Artist Who Ties Phetas for Celebrities – Nihar Tambade | An Extraordinary Story, Episode 42",
    channel: "Youtube",
    url: "https://www.youtube.com/embed/bQxGbEydaH0?si=iDHcWixdTN8bfc3z"
  },
  {
    _id: "6a8707e65ec234b6a3dca1de",
    title: "जीवा ने उदयभानच्या सैनिकांना वेश बदलून कसं घबरवले",
    channel: "Youtube",
    url: "https://www.youtube.com/embed/pCorf2lntwE?si=yNbg2ULFZFkbRbBj"
  }
];

export const fallbackMediaLogos = [
  {
    _id: "6a6b2ea861ea1ce5d0dc7b71",
    name: "Time Maharashtra",
    color: "#000000",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787038482/phetabynihar/fvruvmr3ld3omz1y0djq.webp"
  },
  {
    _id: "6a6b2ea861ea1ce5d0dc7b6f",
    name: "Lokmat",
    color: "#6E1E18",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787038067/phetabynihar/ilt8ug2rmfaid9asi36s.webp"
  },
  {
    _id: "6a6b2ea861ea1ce5d0dc7b72",
    name: "TV9 Marathi",
    color: "#cc0000",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787038106/phetabynihar/nkcvjbm1gnlhfwcq3u0n.webp"
  },
  {
    _id: "6a840a9e5ee676b9df8deb5e",
    name: "Marmic",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787038364/phetabynihar/i1yxis1fpfike6p93oe4.webp",
    color: "#6E1E18"
  },
  {
    _id: "6a840ab35ee676b9df8deb60",
    name: "Loksatta",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787038375/phetabynihar/b3zcl51oj4izxbx6dskn.webp",
    color: "#6E1E18"
  },
  {
    _id: "6a840ad45ee676b9df8deb62",
    name: "Indian Idol",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787038417/phetabynihar/tqcrqvcb7oicftzhid5n.webp",
    color: "#6E1E18"
  }
];

export const fallbackTestimonials = [
  {
    _id: "6a87001099ca8c6d81222878",
    source: "manual",
    quote: "Nihar helped me put together my traditional wedding attire for the vidhi, including the Pheta, Dhoti, and Shela, with all materials provided by him. The final look turned out fantastic and exceeded my expectations.",
    name: "Chinmay Salaskar",
    location: "Mumbai",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Chinmay&background=D4AF37&color=2A0D0F"
  },
  {
    _id: "6a87001099ca8c6d81222879",
    source: "manual",
    quote: "He is a very professional turban artist and has a very good knowledge of turbans. He also understands head anatomy, which helps him give the perfect structure for various head types.",
    name: "Priyanka Bhagat",
    location: "Pune",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Priyanka&background=4D1217&color=D4AF37"
  },
  {
    _id: "6a87001099ca8c6d8122287b",
    source: "manual",
    quote: "I had a fantastic experience with Pheta by Nihar! Nihar was extremely responsive and helped me choose the perfect Pheta for my wedding. He ensured the right fit, color, and timely delivery to Sindhudurg.",
    name: "Gaurav Sawant",
    location: "Sindhudurg",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Gaurav&background=4D1217&color=D4AF37"
  },
  {
    _id: "6a87001099ca8c6d8122287c",
    source: "manual",
    quote: "Nihar has perfection in his art. His feta/pagdi/turban is durable and stays for a long time, the folds are clear and visible. Nihar would be the best for this on any occasion. He is also very down to earth, friendly and decent.",
    name: "Karan Ajmera",
    location: "Mumbai",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Karan&background=D4AF37&color=2A0D0F"
  },
  {
    _id: "6a87001099ca8c6d81222888",
    source: "manual",
    quote: "Outstanding work! The turban tying showcases exceptional finish, perfection, and class. Every detail is handled with great precision. The turban you tie is not just a tradition, but a true piece of art.",
    name: "Varnita Chalke",
    location: "Thane",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Varnita&background=D4AF37&color=2A0D0F"
  },
  {
    _id: "6a87001099ca8c6d8122288a",
    source: "manual",
    quote: "If we want to describe Pheta by Nihar, only three words are enough: Creativity, Professionalism and Dedication. Getting a turban from Nihar was the best decision I made for my wedding.",
    name: "Saurabh Kalambate",
    location: "Mumbai",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Saurabh&background=D4AF37&color=2A0D0F"
  },
  {
    _id: "6a87001099ca8c6d8122288e",
    source: "manual",
    quote: "Thank you very much for tying such a beautiful and excellent pheta. This was my second year in a row getting a pheta from you, and just like last time, it was perfect.",
    name: "Pratiksha Vikas Kedari",
    location: "Pune",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Pratiksha&background=D4AF37&color=2A0D0F"
  }
];

export const fallbackPhetaClasses = [
  {
    _id: "6a834068bdcf355e313fc042",
    title: "Traditional Puneri & Kolhapuri Pheta Workshop",
    marathiTitle: "पारंपरिक पुणेरी व कोल्हापुरी फेटा कार्यशाळा",
    level: "Beginner to Intermediate",
    duration: "2 Days (Weekend Workshop - 8 Hours)",
    mode: "In-Studio / Hands-on",
    description: "Master the foundational techniques of authentic Puneri pagadi and vibrant Kolhapuri pheta draping with step-by-step guidance, pleat structuring, and fabric selection.",
    image: "/hero_bride_groom.png",
    price: "₹2,499",
    badge: "Most Popular",
    curriculum: [
      "Heritage & Historical Significance of Maharashtrian Turbans",
      "Fabric Selection, Thread Grain, and Starching Techniques",
      "Mastering the Iconic 5-Fold Puneri Style with Golden Zari Border",
      "The Bold Kolhapuri Draping & Tassel Styling",
      "Live Model Practice and Form Correction"
    ],
    features: [
      { icon: "Award", label: "Authorized Certificate" },
      { icon: "Layers", label: "Authentic Pleat Techniques" },
      { icon: "Smile", label: "All Materials Provided" },
      { icon: "Users", label: "Small Batch (Max 12)" }
    ],
    eligibility: "Open to all age groups (14+). No prior draping experience required.",
    certification: true,
    isActive: true
  },
  {
    _id: "6a834068bdcf355e313fc047",
    title: "Royal Groom & Shahi Safa Masterclass",
    marathiTitle: "शाही विवाह फेटा व साफा मास्टरक्लास",
    level: "Intermediate to Advanced",
    duration: "3 Days Intensive (12 Hours)",
    mode: "In-Studio / Hands-on",
    description: "Designed for wedding stylists and enthusiasts looking to master regal groom pagadis, Maratha Shahi phetas, royal safas, Kalgi pinning, brooch styling, and luxury pearl ornaments.",
    image: "/service_pheta.webp",
    price: "₹4,999",
    badge: "Best For Stylists",
    curriculum: [
      "Royal Maratha Dynasty Pheta Silhouettes and Variations",
      "Bespoke Groom Headwear Customization to Match Sherwani & Palette",
      "Kalgi, Sirpech & Brooch Secure Attachment Protocols",
      "Pure Silk & Brocade Draping for All-Day Comfort",
      "Wedding Day Styling Logistics and Time Management"
    ],
    features: [
      { icon: "Crown", label: "Royal Shahi Techniques" },
      { icon: "Sparkles", label: "Kalgi & Jewelry Styling" },
      { icon: "Clock", label: "Speed & Durability Mastery" },
      { icon: "ShieldCheck", label: "Masterclass Certification" }
    ],
    eligibility: "Ideal for makeup artists, wedding planners, event stylists & passionate learners.",
    certification: true,
    isActive: true
  },
  {
    _id: "6a834068bdcf355e313fc04c",
    title: "Professional Turban Artist Certification Course",
    marathiTitle: "व्यावसायिक फेटा आर्टिस्ट प्रमाणपत्र अभ्यासक्रम",
    level: "Professional Masterclass",
    duration: "4 Weeks (Comprehensive Weekend Batch)",
    mode: "Hybrid (Studio + Live Event Exposure)",
    description: "The complete career-launching program for aspiring professional pheta artists. Covers 12+ regional Indian and Maharashtrian styles, commercial speed draping for 500+ guests, pricing, and live shadow training.",
    image: "/pheta_by_nihar_tambde_1676761513_3041218461604431189_2400202343.webp",
    price: "₹11,999",
    badge: "Career Masterclass",
    curriculum: [
      "12+ Indian & Maharashtrian Traditional Turban Styles",
      "High-Speed Mass Draping (Under 60 Seconds per Person)",
      "Commercial Business Setup, Pricing Models & Portfolio Building",
      "Sourcing Premium Fabrics & Ornaments at Wholesale",
      "Live Event Practical Shadow Training with Master Nihar Tambde"
    ],
    features: [
      { icon: "Briefcase", label: "Business & Client Kit" },
      { icon: "Users", label: "Mass Draping Techniques" },
      { icon: "Award", label: "Professional Certificate" },
      { icon: "Video", label: "Live Event Shadow Training" }
    ],
    eligibility: "Passionate learners seeking to start their own wedding styling business.",
    certification: true,
    isActive: true
  },
  {
    _id: "6a834068bdcf355e313fc051",
    title: "Cultural Festivals & Dhol Tasha Pheta Workshop",
    marathiTitle: "उत्सव व मिरवणूक फेटा कार्यशाळा",
    level: "All Levels",
    duration: "1 Day Express (4 Hours)",
    mode: "In-Studio / Group Workshop",
    description: "Specialized workshop tailored for festival enthusiasts, Dhol Tasha Pathak members, and cultural event organizers. Learn energetic, slip-resistant, weather-proof pheta tying for long procession hours.",
    image: "/pheta_by_nihar_tambde_1665393890_2945859920821826134_2400202343.webp",
    price: "₹1,499",
    badge: "Festival Special",
    curriculum: [
      "Heavy Movement-Resistant Locking Ties",
      "Saffron (Bhagwa) & Gold Band Draping for Grand Processions",
      "Quick Re-adjustment Techniques during Parades",
      "Head Comfort & Pressure Balance for Extended High-Energy Wear"
    ],
    features: [
      { icon: "Flame", label: "High-Movement Resistant" },
      { icon: "Sun", label: "Weather-Proof Hold" },
      { icon: "Smile", label: "Pathak Preferred" },
      { icon: "Award", label: "Workshop Badge" }
    ],
    eligibility: "Open to youth, students, pathak members & festival organizers.",
    certification: true,
    isActive: true
  },
  {
    _id: "6a834068bdcf355e313fc056",
    title: "Corporate Satkar & VIP Felicitation Training",
    marathiTitle: "कॉर्पोरेट सत्कार व सन्मान फेटा प्रशिक्षण",
    level: "Corporate & Hospitality Teams",
    duration: "1 Day Custom (3 Hours)",
    mode: "On-Site / Corporate Office / Studio",
    description: "Custom training for protocol officers, event management firms, and hospitality teams to respectfully drape and present traditional honor phetas for VIP dignitaries, political guests, and corporate awardees.",
    image: "/pheta_by_nihar_tambde_1676761513_3041218461604505343_2400202343.webp",
    price: "₹3,499 (Group Quotes Available)",
    badge: "Corporate & VIP",
    curriculum: [
      "Maharashtrian Satkar Protocols and Dignitary Respect Traditions",
      "Elegant VIP Stage Presentation Etiquette and Timing",
      "Universal Head Sizing and Fast Comfort Fitting",
      "Silk Shawl & Sriphal Ceremony Coordination"
    ],
    features: [
      { icon: "Briefcase", label: "VIP Protocol Guidance" },
      { icon: "Award", label: "Ceremonial Standards" },
      { icon: "Gift", label: "Velvet Box Presentation" },
      { icon: "FileText", label: "Corporate Handbook" }
    ],
    eligibility: "Corporate event planners, HR managers, PR teams & hospitality staff.",
    certification: true,
    isActive: true
  },
  {
    _id: "6a834068bdcf355e313fc05b",
    title: "Online Live Global Pheta Masterclass",
    marathiTitle: "ऑनलाइन आंतरराष्ट्रीय फेटा मास्टरक्लास",
    level: "Beginner to Intermediate",
    duration: "2 Days (Interactive Live Zoom Sessions)",
    mode: "Online Live Interactive",
    description: "For our global Maharashtrian diaspora and Indian heritage lovers across the USA, UK, UAE, Australia and beyond. Step-by-step live interactive HD training with real-time feedback and lifetime recorded access.",
    image: "/aboutsideiamge.png",
    price: "₹3,999 / $49 USD",
    badge: "Global Diaspora",
    curriculum: [
      "Finding & Choosing Suitable Fabrics Locally Abroad",
      "Step-by-step Self-Tying and Mirror Techniques",
      "Tying on Family Members for Weddings, Diwali & Gudi Padwa",
      "Live Q&A and Individual Form Correction by Master Nihar Tambde"
    ],
    features: [
      { icon: "Globe", label: "Live Global Zoom" },
      { icon: "Video", label: "Lifetime Video Access" },
      { icon: "MessageCircle", label: "1-on-1 Feedback" },
      { icon: "Award", label: "Digital Certificate" }
    ],
    eligibility: "International participants, diaspora families & remote learners worldwide.",
    certification: true,
    isActive: true
  }
];

export const fallbackOurWork = [
  {
    _id: "6a6c903baeaa244779195fb8",
    title: "Varti Pheta",
    description: "Elegant Phetas for family members, relatives, and wedding guests, with coordinated styles perfect for creating a traditional group appearance.",
    images: [
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230387/phetabynihar/tgsnfioidvg1ghwqkqfv.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230466/phetabynihar/xj4tjyympbazyungpwvq.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230468/phetabynihar/hylfmhiizwrtxatracjq.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230470/phetabynihar/mwiyyuyxei2smc8bywo9.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230471/phetabynihar/oho2haptb2s4qdvqucjz.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230474/phetabynihar/ocexoqq5nzd6pxav2lnv.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230475/phetabynihar/qq2dad3piyplvighgujj.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230477/phetabynihar/pviglwbyvs6qgvjockiw.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230478/phetabynihar/eznvswhnrzywheskknpc.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230480/phetabynihar/g5k5xbf1f5tcymwyoj1z.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230482/phetabynihar/edhxwhmv7w2bf9z2aac7.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230483/phetabynihar/gey8h6gmi72cmcdrxtwv.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230485/phetabynihar/blasds2ung4eanukkn6c.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230486/phetabynihar/ly4v1icbqmcjigdxw6ch.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230488/phetabynihar/d4jihgqmkjlfkfodbciu.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230491/phetabynihar/kcvnxq1xsdvppwdzeeeh.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230493/phetabynihar/ywxvrq3mjv7q1b0crdrd.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230495/phetabynihar/tgv30cms0fz62lcfiou5.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230497/phetabynihar/kzd0q5xqjzp7gcwmeqwl.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230498/phetabynihar/v7bplyxtzkhvml0vzmjb.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230500/phetabynihar/ojkywbtlqpmlgykfessn.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230502/phetabynihar/alawwfjdsefcf5wkdw7t.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230504/phetabynihar/uvgpos0oyirmehzbl272.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230506/phetabynihar/yh3ne0vualvwjetwp93l.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230507/phetabynihar/j4wzwpogbytsqi833a3m.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230509/phetabynihar/efd8e6z5thl01emikx4g.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230511/phetabynihar/pt7hsok9r9zklqiulumr.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230513/phetabynihar/sccq3vrlplhtps6elzl7.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230514/phetabynihar/fcgcivqvzjagrsh94zsa.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230516/phetabynihar/bwroadpafvzvzbtolkgg.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230518/phetabynihar/nuwlevpba74q2ai05mkx.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230519/phetabynihar/pzefxgypqx5r0zevtnlm.webp"
    ]
  },
  {
    _id: "6a6c9136e42d2cc563ef681d",
    title: "Groom Pheta",
    description: "Traditional and royal Pheta styles specially crafted for grooms, adding a distinctive Maharashtrian touch to the wedding look.",
    images: [
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230207/phetabynihar/sc2ze0ugrzvck2dsjkfx.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230261/phetabynihar/tdw3fltzreyw6u4hr0bt.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230263/phetabynihar/w6umjhnnfo648qea0vbr.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230265/phetabynihar/oinotj6fxiuxevhztbsu.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230266/phetabynihar/gxew0enot5aqu9szocwm.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230268/phetabynihar/gkzfdiqlejcrjnip9xbw.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230270/phetabynihar/pebxfj2k3jxhq9vph15s.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230271/phetabynihar/hcvrbeaivgs9gvxbllhv.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230273/phetabynihar/tpf80alda4hpmvii32xm.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230276/phetabynihar/xjjtublotuzpunnt6eon.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230279/phetabynihar/vogn58vp4wtcqwpxyw0q.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230281/phetabynihar/pbseaityuis9ggdvwggy.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230282/phetabynihar/x4nviaotx9fy3isnrkz2.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230284/phetabynihar/j0b5ch6qfjac4lgog8vf.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230286/phetabynihar/acbdmckqfgfaq3hyclvx.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230288/phetabynihar/s280lqxc25gzekulxwzn.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230290/phetabynihar/rx1vz7rplqqhzzmu1afb.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230292/phetabynihar/tcgdyo4lvmamwcukr3sb.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230294/phetabynihar/yrotlirgpnvowmedxiow.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230297/phetabynihar/thvzquyghfmwsqelnvze.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230298/phetabynihar/wiavlgspoltfhmhc8w9s.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230300/phetabynihar/dtjdjuvvz4bueggixaje.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230302/phetabynihar/wny50mzxmnoyzetnaqx4.webp"
    ]
  },
  {
    _id: "6a86fa3e5ec234b6a3dc9d4d",
    title: "Corporate Pheta",
    description: "Professional and elegant Pheta services for corporate events, annual gatherings, employee celebrations, award functions, and brand events.",
    images: [
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230771/phetabynihar/wdmdisltyrfnp7jtvcsf.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230773/phetabynihar/ilrbvgswuqkyfwdonu0e.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230776/phetabynihar/oojsra8e52sscc2uj9lg.webp"
    ]
  },
  {
    _id: "6a86fad95ec234b6a3dc9d50",
    title: "Idol & Statue Pheta",
    description: "Traditional and beautifully crafted Phetas for idols and statues of deities, saints, cultural icons, and respected personalities, suitable for festivals, temples, celebrations, and special occasions.",
    images: [
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230879/phetabynihar/fin9m8dk2ga6yhgaectx.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230881/phetabynihar/uev1vxmii9jjf3j5lzj7.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230884/phetabynihar/tmtzbxjtfbqiaak9tm4m.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230924/phetabynihar/k0dgjhqrxlntexz8qfsw.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230926/phetabynihar/nerkawgqpg057zb8igoi.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230928/phetabynihar/h8pekv6hswhdljq41xfk.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230930/phetabynihar/xskbpadzt3qrdawrkhgp.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230933/phetabynihar/tn5lk4c5sdkkx38jlktj.webp"
    ]
  },
  {
    _id: "6a86fb1b5ec234b6a3dc9d53",
    title: "Festivals & Processions",
    description: "Traditional Phetas for Shiv Jayanti, Ganeshotsav, Gudi Padwa, Dahi Handi, Maharashtra Day, and various festive celebrations and processions.",
    images: [
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230989/phetabynihar/o0hjpsjlr6g6wahw6f53.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230991/phetabynihar/vtozmk8zzo17ido6ovor.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230993/phetabynihar/ymgcwurbcfj6yxhq0bs5.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230995/phetabynihar/wfhmnxvwqhvacqv3kvdz.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230997/phetabynihar/phztn08xy1g699qrure1.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230999/phetabynihar/pmzzxkjvdkfwlyrlf3jl.webp"
    ]
  },
  {
    _id: "6a86fb875ec234b6a3dc9d59",
    title: "Seminar & Conferences",
    description: "Traditional Pheta services for seminars, conferences, workshops, guest welcomes, institutional events, and formal gatherings.",
    images: [
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231081/phetabynihar/lpdflpquqg1xtnuhjhw1.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231083/phetabynihar/ingm3hn5hoahsvliwybi.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231085/phetabynihar/ljozjipw86f5wvfvok6m.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231087/phetabynihar/jcdhebntuxhuohrwdlji.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231090/phetabynihar/sn3rgiielrvd0u3pu7qn.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231092/phetabynihar/vwg3kq5jthmkjpzhzurx.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231094/phetabynihar/uligycw2jxxmlgwdkjde.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231098/phetabynihar/r5bti7n9ryo8yjwqdzjs.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231100/phetabynihar/ndoiemwh5usj4ulxayok.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231103/phetabynihar/up4qecj57kydzrxvwu4i.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787231105/phetabynihar/tivavn0jlobrjw1w67u3.webp"
    ]
  },
  {
    _id: "6a8b2bf16add499aab460da2",
    title: "Film Industry Specific",
    description: "Specialized traditional headgear draping and styling for historical feature films, period dramas, and celebrity movie appearances.",
    images: [
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787505646/phetabynihar/qtorj8siw0fadhuyfd2a.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787505685/phetabynihar/taln535caz8yjnsqdpef.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787505708/phetabynihar/hvc5uo87wm1c5wqvyzxd.webp",
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787505710/phetabynihar/zpxyeszc5zhb2fj8swln.webp"
    ]
  },
  {
    _id: "6a8b2c646add499aab460dae",
    title: "TV show Industry Specific",
    description: "Custom authentic Maharashtrian turbans and pagadis designed for leading television serials, reality shows, and cultural broadcasts.",
    images: [
      "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787505760/phetabynihar/jguahsls7vnvmm79uvts.webp"
    ]
  }
];

export const fallbackEvents = [
  {
    _id: "6a847f13bedda9c840120421",
    title: "2-Day Professional Pheta Tying Masterclass",
    date: "14-15 December",
    time: "10:00 am - 02:00 pm",
    location: "Pheta By Nihar Studio, Girgaon, Mumbai",
    description: "2-Day Professional Pheta Tying Masterclass On 14-15 December 2026 at 10:00 am - 02:00 pm location Pheta By Nihar Studio, Girgaon, Mumbai",
    image: "https://res.cloudinary.com/dfgi5lcxh/image/upload/v1787230019/phetabynihar/sdgvl6mpcxhllvh52p3o.webp",
    highlights: [
      "Authorized Certificate",
      "Complete Styling Kit Provided",
      "Hands-on 1-on-1 Mentorship"
    ],
    priceBadge: "Certified Workshop"
  }
];
