import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    default: ''
  },
  serviceOrProduct: {
    type: String,
    trim: true,
    default: 'Pheta Draping Service'
  },
  serviceProviderChain: {
    type: String,
    trim: true,
    default: 'Pheta By Nihar Main'
  },
  couponCode: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed_amount', 'special_benefit'],
    default: 'percentage'
  },
  discountValue: {
    type: String,
    default: '15% OFF'
  },
  couponStatus: {
    type: String,
    enum: ['active', 'redeemed', 'expired'],
    default: 'active'
  },
  validUntil: {
    type: Date,
    default: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // Default 90 days validity
  },
  notes: {
    type: String,
    default: ''
  },
  whatsappSentAt: {
    type: Date,
    default: null
  },
  emailSentAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Customer = mongoose.model('Customer', customerSchema);
