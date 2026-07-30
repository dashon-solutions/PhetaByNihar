import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['rental', 'class'],
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
  address: {
    type: String,
    required: true
  },
  locationDetails: {
    lat: Number,
    lng: Number,
    accuracy: Number
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'resolved'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
