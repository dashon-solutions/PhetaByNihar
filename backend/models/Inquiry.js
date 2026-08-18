import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'general',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  preferredBatch: {
    type: String,
    default: ''
  },
  locationDetails: {
    lat: Number,
    lng: Number,
    accuracy: Number
  },
  status: {
    type: String,
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
