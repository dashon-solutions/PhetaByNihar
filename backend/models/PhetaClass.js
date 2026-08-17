import mongoose from 'mongoose';

const phetaClassSchema = new mongoose.Schema({
  title: { type: String, required: true },
  marathiTitle: { type: String, default: '' },
  level: { type: String, default: 'All Levels' }, // Beginner, Intermediate, Advanced, Professional Masterclass, All Levels
  duration: { type: String, required: true }, // e.g. "2 Days Workshop", "4 Weeks Course"
  mode: { type: String, default: 'Offline Studio / Hands-on' }, // Offline Studio, Online Live, Hybrid, On-site
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, default: 'Contact for Fee' },
  badge: { type: String, default: 'Certified Workshop' },
  curriculum: [{ type: String }],
  features: [{
    icon: { type: String, default: 'CheckCircle' },
    label: { type: String, required: true }
  }],
  eligibility: { type: String, default: 'Open to everyone with a passion for heritage art.' },
  certification: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export const PhetaClass = mongoose.model('PhetaClass', phetaClassSchema);
