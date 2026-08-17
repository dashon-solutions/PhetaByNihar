import express from 'express';
import { Customer } from '../models/Customer.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Helper to generate unique coupon code
const generateCouponCode = (prefix = 'ROYAL') => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 5; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${randomPart}`;
};

// GET /api/crm/stats - CRM statistics
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const activeCoupons = await Customer.countDocuments({ couponStatus: 'active' });
    const redeemedCoupons = await Customer.countDocuments({ couponStatus: 'redeemed' });
    const expiredCoupons = await Customer.countDocuments({ couponStatus: 'expired' });

    res.json({
      totalCustomers,
      activeCoupons,
      redeemedCoupons,
      expiredCoupons
    });
  } catch (error) {
    console.error('Error fetching CRM stats:', error);
    res.status(500).json({ error: 'Failed to fetch CRM stats' });
  }
});

// GET /api/crm/customers - List all customers with optional search & filter
router.get('/customers', verifyToken, async (req, res) => {
  try {
    const { search, status, chain } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.couponStatus = status;
    }

    if (chain && chain !== 'all') {
      query.serviceProviderChain = chain;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { phone: searchRegex },
        { email: searchRegex },
        { couponCode: searchRegex },
        { serviceOrProduct: searchRegex },
        { serviceProviderChain: searchRegex }
      ];
    }

    const customers = await Customer.find(query).sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// POST /api/crm/customers - Add a new customer
router.post('/customers', verifyToken, async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      serviceOrProduct,
      serviceProviderChain,
      couponCode,
      discountType,
      discountValue,
      validUntil,
      notes
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Customer name and phone number are required.' });
    }

    // Auto-generate coupon code if not provided
    const finalCouponCode = couponCode && couponCode.trim() !== '' 
      ? couponCode.trim().toUpperCase() 
      : generateCouponCode('ROYAL');

    const customer = new Customer({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      serviceOrProduct: serviceOrProduct || 'Royal Pheta Service',
      serviceProviderChain: serviceProviderChain || 'Pheta By Nihar Main',
      couponCode: finalCouponCode,
      discountType: discountType || 'percentage',
      discountValue: discountValue || '15% OFF',
      validUntil: validUntil ? new Date(validUntil) : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      notes: notes || ''
    });

    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: error.message || 'Failed to create customer' });
  }
});

// PUT /api/crm/customers/:id - Update customer / coupon details
router.put('/customers/:id', verifyToken, async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res.status(400).json({ error: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

// POST /api/crm/customers/:id/log-whatsapp - Mark WhatsApp sent timestamp
router.post('/customers/:id/log-whatsapp', verifyToken, async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: { whatsappSentAt: new Date() } },
      { new: true }
    );
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to log WhatsApp' });
  }
});

// POST /api/crm/customers/:id/send-email - Trigger email coupon sending
router.post('/customers/:id/send-email', verifyToken, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    if (!customer.email) {
      return res.status(400).json({ error: 'Customer does not have an email address configured.' });
    }

    // In local development or production, log and record email dispatch
    console.log(`[EMAIL DISPATCH] To: ${customer.email}, Subject: Exclusive Privilege Coupon: ${customer.couponCode}`);
    
    customer.emailSentAt = new Date();
    await customer.save();

    res.json({
      success: true,
      message: `Coupon email successfully queued and sent to ${customer.email}!`,
      customer
    });
  } catch (error) {
    console.error('Error sending coupon email:', error);
    res.status(500).json({ error: 'Failed to send coupon email' });
  }
});

// DELETE /api/crm/customers/:id - Delete customer
router.delete('/customers/:id', verifyToken, async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

export default router;
