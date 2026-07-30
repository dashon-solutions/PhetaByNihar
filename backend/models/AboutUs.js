import mongoose from 'mongoose';

const aboutUsSchema = new mongoose.Schema({
  heading: { type: String, default: 'A Tradition Passed Down with' },
  italicHeading: { type: String, default: 'Pride' },
  text: { type: String, default: 'With deep respect for Maharashtrian culture...' },
  portraitImage: { type: String, default: '/about_portrait.webp' },
  backgroundImage: { type: String, default: '/aboutnewiamge.png' },
  journey: { type: String, default: 'Our journey began...' },
  passion: { type: String, default: 'Our passion is...' },
  experience: { type: String, default: 'Over 10 years of experience...' },
  brandStory: { type: String, default: 'Our brand is built on...' },
  offeredClasses: [
    {
      title: { type: String },
      description: { type: String },
      image: { type: String }
    }
  ],
  classBatches: [
    {
      batchName: { type: String },
      startDate: { type: String },
      duration: { type: String },
      status: { type: String, default: 'Upcoming' },
      image: { type: String }
    }
  ]
});

export const AboutUs = mongoose.model('AboutUs', aboutUsSchema);
