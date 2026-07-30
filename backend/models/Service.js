import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  icon: { type: String, default: 'Crown' } // e.g. Crown, Tent, Briefcase, GraduationCap
});

export const Service = mongoose.model('Service', serviceSchema);
