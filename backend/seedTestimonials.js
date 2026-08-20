import 'dotenv/config.js';
import mongoose from 'mongoose';
import { Testimonial } from './models/Testimonial.js';

const testimonialsData = [
  {
    "source": "manual",
    "quote": "Nihar helped me put together my traditional wedding attire for the vidhi, including the Pheta, Dhoti, and Shela, with all materials provided by him. The final look turned out fantastic and exceeded my expectations.",
    "name": "Chinmay Salaskar",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Chinmay&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "He is a very professional turban artist and has a very good knowledge of turbans. He also understands head anatomy, which helps him give the perfect structure for various head types.",
    "name": "Priyanka Bhagat",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Priyanka&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Really nice look, created a very good first impression. The overall dressing sense is also good and everything was done within half an hour.",
    "name": "Archit Salunke",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Archit&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "I had a fantastic experience with Pheta by Nihar! Nihar was extremely responsive and helped me choose the perfect Pheta for my wedding. He ensured the right fit, color, and timely delivery to Sindhudurg.",
    "name": "Gaurav Sawant",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Gaurav&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Nihar has perfection in his art. His feta/pagdi/turban is durable and stays for a long time, the folds are clear and visible. Nihar would be the best for this on any occasion. He is also very down to earth, friendly and decent.",
    "name": "Karan Ajmera",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Karan&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "The turban was tied very nicely. Thank you.",
    "name": "Nilesh Powar",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Nilesh&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Excellent pheta artist. Accurate service, punctual. Amazing experience.",
    "name": "Rohini Salekar Tandel",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Rohini&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "Amazing service. Nihar is really particular about every single aspect.",
    "name": "Rupali Kasare",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Rupali&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "One of the great pheta artists from Mumbai. Nihar is very skilled, dedicated and passionate towards his art. I am very happy and thankful to Pheta by Nihar.",
    "name": "Vrushali Bhuwad",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Vrushali&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "Thank you for the beautiful pheta you created for me. The craftsmanship is outstanding, and I felt truly special wearing it.",
    "name": "Sahil Palvankar",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Sahil&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Very professional and maintains the ethnicity of the culture. Nihar is a true artist and adds a personal touch to every pheta.",
    "name": "Pratik Dhumal",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Pratik&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "He is the best pheta artist for me, superb Nihar. Keep going, keep making such great phetas and keep expanding your art.",
    "name": "Zentrex Solutions",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Zentrex&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "A very talented pheta artist. Nihar is very passionate about his work.",
    "name": "Shraddha Kamble",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Shraddha&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "He is the best pheta artist, superb Nihar Dada. Great experience, good service.",
    "name": "Smit Mardhekar",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Smit&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Excellent service... amazing pheta... highly recommended!",
    "name": "Vidhita Patkar",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Vidhita&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "Superb service with creativity and great time management.",
    "name": "Prashant Salgaonkar",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Prashant&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Outstanding work! The turban tying showcases exceptional finish, perfection, and class. Every detail is handled with great precision. The turban you tie is not just a tradition, but a true piece of art.",
    "name": "Varnita Chalke",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Varnita&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "Outstanding work! The pheta you tie shows great finish, perfection and class. Every detail is taken care of very well. It's not just a tradition but a work of art - your skill and experience are evident in every stitch.",
    "name": "Kunal Ghadge",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Kunal&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "If we want to describe Pheta by Nihar, only three words are enough: Creativity, Professionalism and Dedication. Getting a turban from Nihar was the best decision I made for my wedding.",
    "name": "Saurabh Kalambate",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Saurabh&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "A very beautiful turban - it felt very special after seeing the work put into it.",
    "name": "Abhijit Sawant",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Abhijit&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Very nice, very beautiful turban - the way Nihar tied it made my look so complete that everyone liked it. Thank you Nihar for tying such a beautiful turban and for preserving this tradition.",
    "name": "Parth Hajare",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Parth&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "Nihar Dada's work is great. He knows about phetas and even the garlands are good for the sangats.",
    "name": "Chaitan Gurav",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Chaitan&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Thank you very much for tying such a beautiful and excellent pheta. This was my second year in a row getting a pheta from you, and just like last time, it was perfect.",
    "name": "Pratiksha Vikas Kedari",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Pratiksha&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "Nihar Dada, with his helpful and supportive nature, makes tying a turban very efficient, smooth and comfortable. His special qualities are time management along with excellent work efficiency.",
    "name": "Harshhada Salunkhe",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Harshhada&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Nihar is a great and honest artist who does beautiful and fine work. It was so nice getting a turban tied by him. Thank you, brother.",
    "name": "Pratik Mahimkar",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Pratik&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "The pheta work is amazing. The method of tying is comfortable and strong. A good pheta is tied after taking a good amount of time and care.",
    "name": "Siddhesh Madan",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Siddhesh&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "A very nicely tied pheta. Thank you.",
    "name": "Rajni Tondwalkar",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Rajni&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "Once this pheta is tied, it doesn't move for 10 hours straight - and it's tied exactly the way you want it, not too tight, not too loose. A wonderful experience - you should definitely get one tied at least once.",
    "name": "Deepak Mandlik",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Deepak&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Very beautiful badges. The magnets on the back are very strong and good quality, so there's no fear of them falling off. Thank you.",
    "name": "Ganesh Khedekar",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Ganesh&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "My experience with Nihar Pheta was great. The fitting of the clothes was perfect, the quality was great and the service was also on time.",
    "name": "Amol J",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Amol&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Nihar Dada is a very good artist and does very good work.",
    "name": "Aditya Mohite",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Aditya&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "Very experienced and skilled artist. Nihar Dada works very well - a very nice experience.",
    "name": "Prashant Ingale",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Prashant&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Very beautiful pheta artwork - the result of immense prior knowledge and love for his craft. He brings diversity to his work and is proficient in many different styles including Mavli, Marathi and Punjabi.",
    "name": "Bhushan Vispute",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Bhushan&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "The Rajmudra pheta is very nice, and the quality is also good. Thank you, Nihar.",
    "name": "Anil Bhuvad",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Anil&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Thanks Nihar, really such fabulous work - such a lovely pheta, tied so wonderfully!",
    "name": "Pratham Dhuri",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Pratham&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "Nihar Dada is the best pheta artist I know - we've known each other for 3 years now, since the movie Subhedar.",
    "name": "Yash Patil",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Yash&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Really excellent work.",
    "name": "Harshad Jadhav",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Harshad&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "The Maratha-style turban is adorned with a beautiful, graceful pheta. Jai Bhavani, Jai Shivaji.",
    "name": "Shivtej Chavan",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Shivtej&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "At my wedding, my friend Nihar tied an exceptionally regal pheta. At my event, the person with the best-looking pheta was the most talked about - thank you, Nihar bhau.",
    "name": "Abhijeet Neswankar",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Abhijeet&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "I found it very beautiful.",
    "name": "Abhijit Desale",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Abhijit&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "My first time getting a pheta tied - I felt really good about it.",
    "name": "Vikrant Kadve",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Vikrant&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "The pheta work is amazing.",
    "name": "Ajit Devghare",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Ajit&background=4D1217&color=D4AF37"
  },
  {
    "source": "manual",
    "quote": "Good job. Really nice work.",
    "name": "Akshay Shetye",
    "location": "",
    "rating": 5,
    "image": "https://ui-avatars.com/api/?name=Akshay&background=D4AF37&color=2A0D0F"
  },
  {
    "source": "manual",
    "quote": "Great work and attention to detail.",
    "name": "Siddhesh Yejre",
    "location": "",
    "rating": 4,
    "image": "https://ui-avatars.com/api/?name=Siddhesh&background=4D1217&color=D4AF37"
  }
];

async function seedTestimonials() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB!');

    console.log('Clearing existing testimonials...');
    await Testimonial.deleteMany({});

    console.log(`Inserting ${testimonialsData.length} client testimonials...`);
    const inserted = await Testimonial.insertMany(testimonialsData);
    console.log(`Successfully seeded ${inserted.length} testimonials into MongoDB Atlas!`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding testimonials:', error);
    process.exit(1);
  }
}

seedTestimonials();
