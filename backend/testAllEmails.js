import 'dotenv/config.js';
import { sendCustomerConfirmationEmail, sendAdminInquiryNotification } from './utils/email.js';

const TEST_EMAIL = 'surwaseonkar8999@gmail.com';

async function testAllEmailTemplates() {
  console.log(`\n======================================================`);
  console.log(`👑 TESTING ALL PHETA BY NIHAR EMAIL TEMPLATES`);
  console.log(`🎯 Target Recipient: ${TEST_EMAIL}`);
  console.log(`======================================================\n`);

  try {
    // 1. Buy / Product Order Confirmation
    console.log('1️⃣ Sending Customer Confirmation: Buy / Product Order...');
    const res1 = await sendCustomerConfirmationEmail({
      type: 'buy',
      subject: 'Wagh Nakh (वाघनख)',
      name: 'Onkar Surwase',
      phone: '+91 86520 28136',
      email: TEST_EMAIL,
      city: 'Girgaon, Mumbai',
      message: 'Interested in purchasing 2 handcrafted Wagh Nakh heritage replicas.'
    });
    console.log('✔ Result 1 (Buy Confirmation):', res1);

    // 2. Academy Masterclass Enrollment Confirmation
    console.log('\n2️⃣ Sending Customer Confirmation: Academy Masterclass...');
    const res2 = await sendCustomerConfirmationEmail({
      type: 'class',
      subject: '2-Day Professional Pheta Tying Masterclass',
      name: 'Onkar Surwase',
      phone: '+91 80875 45175',
      email: TEST_EMAIL,
      preferredBatch: 'Weekend Certified Batch (Saturday & Sunday, 10 AM - 5 PM)',
      message: 'Kindly send seat confirmation and syllabus outline.'
    });
    console.log('✔ Result 2 (Class Confirmation):', res2);

    // 3. Cultural Event Booking Confirmation
    console.log('\n3️⃣ Sending Customer Confirmation: Cultural Event Booking...');
    const res3 = await sendCustomerConfirmationEmail({
      type: 'event',
      subject: 'Grand Shobha Yatra & Heritage Pheta Workshop',
      name: 'Onkar Surwase',
      phone: '+91 86520 28136',
      email: TEST_EMAIL,
      city: 'Pune',
      message: 'Booking 10 slots for family attendees.'
    });
    console.log('✔ Result 3 (Event Confirmation):', res3);

    // 4. Contact Us Inquiry Confirmation
    console.log('\n4️⃣ Sending Customer Confirmation: Contact Us Form...');
    const res4 = await sendCustomerConfirmationEmail({
      type: 'contact',
      subject: 'Groom & Wedding Guest Styling Consultation',
      name: 'Onkar Surwase',
      phone: '+91 86520 28136',
      email: TEST_EMAIL,
      city: 'Mumbai',
      message: 'Looking for on-site groom styling for a royal wedding.'
    });
    console.log('✔ Result 4 (Contact Confirmation):', res4);

    // 5. Admin / Self Notification Email (Overriding owner email to send directly to TEST_EMAIL for testing)
    console.log('\n5️⃣ Sending Admin / Self Alert Email (New Lead Alert)...');
    process.env.OWNER_EMAIL = TEST_EMAIL;
    const res5 = await sendAdminInquiryNotification({
      type: 'buy',
      subject: 'Royal Groom Shahi Pheta Set + Kalgi',
      name: 'Priya & Rahul Sharma',
      phone: '+91 86520 28136',
      email: 'customer.sample@gmail.com',
      city: 'Marine Lines, Mumbai',
      message: 'Urgent inquiry for wedding date: 15th November 2026. Please call back.'
    });
    console.log('✔ Result 5 (Admin Alert Email):', res5);

    console.log(`\n🎉 ALL 5 TEST EMAILS HAVE BEEN DELIVERED DIRECTLY TO: ${TEST_EMAIL}`);
    console.log(`Please check your inbox (and Spam/Promotions folder just in case).\n`);
  } catch (error) {
    console.error('❌ Error testing emails:', error);
  }
}

testAllEmailTemplates();
