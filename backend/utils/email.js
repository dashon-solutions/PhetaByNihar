import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create transporter with SMTP configuration
const createTransporter = () => {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (user && pass) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: user,
        pass: pass
      }
    });
  }
  return null;
};

// Check if logo exists for inline attachment
const getLogoAttachment = () => {
  const logoPath = path.join(__dirname, '..', 'public', 'logo.png');
  if (fs.existsSync(logoPath)) {
    return [
      {
        filename: 'logo.png',
        path: logoPath,
        cid: 'phetalogo'
      }
    ];
  }
  return [];
};

/**
 * 1. Send Royal Confirmation Email to Customer
 */
export const sendCustomerConfirmationEmail = async (inquiryData) => {
  if (!inquiryData.email || !inquiryData.email.includes('@')) {
    return { sent: false, reason: 'No valid customer email provided' };
  }

  const transporter = createTransporter();
  const fromAddress = `"Pheta By Nihar" <${process.env.SMTP_USER || 'info@phetabynihar.com'}>`;
  const subjectLabel = inquiryData.subject || 'Pheta Tying Service';

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inquiry Confirmation - Pheta By Nihar</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #F8F3EC; font-family: 'Georgia', 'Helvetica Neue', serif; color: #2E1A14;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #F8F3EC; padding: 30px 10px;">
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 12px 35px rgba(74, 13, 13, 0.12); border: 2px solid #E8D8C5;">
            
            <!-- Royal Header -->
            <tr>
              <td align="center" style="background: linear-gradient(135deg, #4A0D0D 0%, #6E1E18 50%, #3D0A0A 100%); padding: 40px 25px 30px 25px; border-bottom: 4px solid #D7A65B;">
                <img src="cid:phetalogo" alt="Pheta By Nihar" width="110" style="display: block; margin-bottom: 12px; border-radius: 50%; border: 2px solid #D7A65B; background: #ffffff;" />
                <p style="color: #F3D18A; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 4px 0; font-family: sans-serif; font-weight: bold;">
                  ॥ संस्कृती परमो धर्म: ॥
                </p>
                <h1 style="color: #FFFDFB; font-size: 26px; margin: 0; font-weight: normal; letter-spacing: 1px; font-family: 'Georgia', serif;">
                  Pheta By Nihar
                </h1>
                <p style="color: #E8D8C5; font-size: 12px; margin: 4px 0 0 0; font-family: sans-serif;">
                  Royal Marathi Turban Draping & Heritage Academy
                </p>
              </td>
            </tr>

            <!-- Body Message -->
            <tr>
              <td style="padding: 35px 32px 25px 32px;">
                <h2 style="font-size: 20px; color: #6E1E18; margin-top: 0; margin-bottom: 12px; font-family: 'Georgia', serif;">
                  Namaskar ${inquiryData.name},
                </h2>
                <p style="font-size: 14px; line-height: 1.7; color: #555555; font-family: sans-serif; margin-bottom: 24px;">
                  Thank you for reaching out to <strong>Pheta By Nihar</strong>. We have received your inquiry regarding <strong>${subjectLabel}</strong>. Our styling and event coordination team will review your requirements and connect with you shortly.
                </p>

                <!-- Inquiry Summary Card -->
                <div style="background-color: #FAF6F0; border: 1px solid #E8D8C5; border-radius: 16px; padding: 22px; margin-bottom: 25px;">
                  <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #6E1E18; margin: 0 0 14px 0; font-family: sans-serif; font-weight: bold; border-bottom: 1px solid #E8D8C5; padding-bottom: 8px;">
                    Your Inquiry Summary
                  </h3>
                  
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-family: sans-serif; font-size: 13px;">
                    <tr>
                      <td style="padding: 6px 0; color: #777777; width: 140px; font-weight: bold;">Subject / Item:</td>
                      <td style="padding: 6px 0; color: #4A0D0D; font-weight: bold;">${subjectLabel}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #777777; font-weight: bold;">Inquiry Type:</td>
                      <td style="padding: 6px 0; color: #2E1A14; text-transform: capitalize;">${inquiryData.type || 'General'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #777777; font-weight: bold;">Phone Number:</td>
                      <td style="padding: 6px 0; color: #2E1A14;">${inquiryData.phone}</td>
                    </tr>
                    ${inquiryData.city || inquiryData.address ? `
                    <tr>
                      <td style="padding: 6px 0; color: #777777; font-weight: bold;">Location / City:</td>
                      <td style="padding: 6px 0; color: #2E1A14;">${inquiryData.city || inquiryData.address}</td>
                    </tr>
                    ` : ''}
                    ${inquiryData.preferredBatch ? `
                    <tr>
                      <td style="padding: 6px 0; color: #777777; font-weight: bold;">Preferred Batch:</td>
                      <td style="padding: 6px 0; color: #2E1A14;">${inquiryData.preferredBatch}</td>
                    </tr>
                    ` : ''}
                    ${inquiryData.message ? `
                    <tr>
                      <td style="padding: 6px 0; color: #777777; font-weight: bold; vertical-align: top;">Your Message:</td>
                      <td style="padding: 6px 0; color: #444444; font-style: italic; line-height: 1.5;">"${inquiryData.message}"</td>
                    </tr>
                    ` : ''}
                  </table>
                </div>

                <!-- Studio & Contact Info -->
                <div style="background-color: #ffffff; border: 1px dashed #D7A65B; border-radius: 16px; padding: 20px; margin-bottom: 25px; font-family: sans-serif; font-size: 13px;">
                  <h4 style="margin: 0 0 8px 0; color: #6E1E18; font-size: 13px; text-transform: uppercase; font-weight: bold;">
                    📍 Studio Visit & Direct Support
                  </h4>
                  <p style="margin: 0 0 6px 0; color: #555555; line-height: 1.6;">
                    <strong>Address:</strong> no. 33/J, 9, Mughbhat cross lane Twashta kansar chwal, Girgaon, Mumbai, Maharashtra 400004
                  </p>
                  <p style="margin: 0 0 10px 0; color: #555555;">
                    <strong>Phone / WhatsApp:</strong> +91 98505 04054 / +91 91722 04054
                  </p>
                  <a href="https://share.google/xj6WCITif4HwHcTTn" target="_blank" style="color: #6E1E18; font-weight: bold; text-decoration: underline; font-size: 12px;">
                    🗺️ Open Studio Location on Google Maps
                  </a>
                </div>

                <!-- Instant WhatsApp Help CTA -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center">
                      <a href="https://wa.me/919850504054?text=${encodeURIComponent(
                        `Namaskar Nihar! I submitted an inquiry for '${subjectLabel}' on your website.`
                      )}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #25D366, #128C7E); color: #ffffff; padding: 14px 28px; font-family: sans-serif; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 50px; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);">
                        💬 Need Immediate Assistance? Chat on WhatsApp
                      </a>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Royal Footer -->
            <tr>
              <td align="center" style="background-color: #FAF6F0; padding: 22px; border-top: 1px solid #E8D8C5; font-family: sans-serif; font-size: 11px; color: #777777;">
                <p style="margin: 0 0 6px 0; font-weight: bold; color: #4A0D0D;">Pheta By Nihar &bull; Girgaon, Mumbai, Maharashtra</p>
                <p style="margin: 0; color: #999999;">
                  Designed and Developed by <a href="https://www.dashonsolutions.com/" target="_blank" style="color: #6E1E18; text-decoration: none; font-weight: bold;">Dashon Solutions Pvt. Ltd.</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: fromAddress,
        to: inquiryData.email,
        subject: `👑 Inquiry Received: ${subjectLabel} | Pheta By Nihar`,
        html: htmlContent,
        attachments: getLogoAttachment()
      });
      console.log(`[EMAIL SUCCESS] Confirmation email delivered to customer: ${inquiryData.email}`);
      return { sent: true };
    } catch (err) {
      console.error('[EMAIL ERROR] Failed to send customer confirmation email:', err.message);
      return { sent: false, error: err.message };
    }
  } else {
    console.log(`[EMAIL NOTICE] SMTP not configured. Customer confirmation email skipped for:`, inquiryData.email);
    return { sent: false, note: 'SMTP_USER/PASS not configured in .env' };
  }
};

/**
 * 2. Send Alert Notification Email to Owner / Admin
 */
export const sendAdminInquiryNotification = async (inquiryData) => {
  const adminEmail = process.env.OWNER_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER || 'phetabynihar@gmail.com';
  const isClass = inquiryData.type === 'class';
  const title = isClass ? '🎓 New Academy Masterclass Inquiry!' : '👑 New Customer Booking & Inquiry!';

  const cleanPhone = (inquiryData.phone || '').replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
  const whatsappUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Namaskar ${inquiryData.name}! Thank you for your inquiry about ${inquiryData.subject} at Pheta By Nihar.`
  )}`;

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Georgia', 'Helvetica Neue', serif; background-color: #F8F3EC; color: #2E1A14;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #F8F3EC; padding: 30px 10px;">
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(74, 13, 13, 0.12); border: 2px solid #E8D8C5;">
            
            <!-- Royal Header -->
            <tr>
              <td align="center" style="background: linear-gradient(135deg, #4A0D0D 0%, #6E1E18 50%, #4A0D0D 100%); padding: 35px 25px; border-bottom: 4px solid #D7A65B;">
                <img src="cid:phetalogo" alt="Pheta By Nihar" width="90" style="display: block; margin-bottom: 10px; border-radius: 50%; border: 2px solid #D7A65B; background: #ffffff;" />
                <h1 style="color: #FFFDFB; font-size: 24px; margin: 0; font-weight: normal; letter-spacing: 1px; font-family: 'Georgia', serif;">
                  Pheta By Nihar - Admin Portal
                </h1>
                <p style="color: #F3D18A; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin: 6px 0 0 0; font-family: sans-serif; font-weight: bold;">
                  ${isClass ? 'ACADEMY ENROLLMENT ALERT' : 'CUSTOMER INQUIRY ALERT'}
                </p>
              </td>
            </tr>

            <!-- Content Area -->
            <tr>
              <td style="padding: 35px 30px 25px 30px;">
                <h2 style="font-size: 20px; color: #4A0D0D; margin-top: 0; margin-bottom: 8px; font-family: 'Georgia', serif;">
                  ${title}
                </h2>
                <p style="font-size: 14px; line-height: 1.6; color: #666666; font-family: sans-serif; margin-bottom: 25px;">
                  A new prospect has submitted an inquiry on your website. Here are the complete details:
                </p>

                <!-- Details Card -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FDFBF7; border: 1px solid #E8D8C5; border-radius: 14px; padding: 20px; margin-bottom: 25px; font-family: sans-serif; font-size: 14px;">
                  <tr>
                    <td style="padding: 8px 0; color: #888888; font-weight: bold; width: 140px; text-transform: uppercase; font-size: 11px;">Customer Name:</td>
                    <td style="padding: 8px 0; color: #4A0D0D; font-weight: bold; font-size: 15px;">${inquiryData.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Phone / WhatsApp:</td>
                    <td style="padding: 8px 0; color: #2E1A14;">
                      <a href="tel:${inquiryData.phone}" style="color: #6E1E18; font-weight: bold; text-decoration: none;">${inquiryData.phone}</a>
                    </td>
                  </tr>
                  ${inquiryData.email ? `
                  <tr>
                    <td style="padding: 8px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Email Address:</td>
                    <td style="padding: 8px 0; color: #2E1A14;"><a href="mailto:${inquiryData.email}" style="color: #6E1E18; text-decoration: none;">${inquiryData.email}</a></td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Selected Item / Topic:</td>
                    <td style="padding: 8px 0; color: #6E1E18; font-weight: bold;">${inquiryData.subject}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Inquiry Type:</td>
                    <td style="padding: 8px 0; color: #2E1A14; text-transform: capitalize;">${inquiryData.type || 'General'}</td>
                  </tr>
                  ${inquiryData.city || inquiryData.address ? `
                  <tr>
                    <td style="padding: 8px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">City / Address:</td>
                    <td style="padding: 8px 0; color: #2E1A14;">${inquiryData.city || inquiryData.address}</td>
                  </tr>
                  ` : ''}
                  ${inquiryData.preferredBatch ? `
                  <tr>
                    <td style="padding: 8px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Preferred Batch:</td>
                    <td style="padding: 8px 0; color: #2E1A14; font-weight: bold;">${inquiryData.preferredBatch}</td>
                  </tr>
                  ` : ''}
                  ${inquiryData.message ? `
                  <tr>
                    <td style="padding: 8px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px; vertical-align: top;">Message / Notes:</td>
                    <td style="padding: 8px 0; color: #2E1A14; line-height: 1.5; font-style: italic;">"${inquiryData.message}"</td>
                  </tr>
                  ` : ''}
                </table>

                <!-- Action Button -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center">
                      <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 14px 28px; font-family: sans-serif; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 50px; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);">
                        💬 1-Click WhatsApp Reply
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background-color: #FDFBF7; padding: 20px; border-top: 1px solid #E8D8C5; font-family: sans-serif; font-size: 11px; color: #999999;">
                <p style="margin: 0;">Pheta By Nihar &bull; Automated Inquiry Notification System &bull; Girgaon, Mumbai</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  const transporter = createTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Pheta By Nihar Portal" <${process.env.SMTP_USER || 'no-reply@phetabynihar.com'}>`,
        to: adminEmail,
        subject: `🚨 [INQUIRY ALERT] ${inquiryData.name} - ${inquiryData.subject}`,
        html: htmlContent,
        attachments: getLogoAttachment()
      });
      console.log(`[EMAIL SUCCESS] Admin notification email delivered to: ${adminEmail}`);
      return { sent: true };
    } catch (err) {
      console.error('[EMAIL ERROR] Failed to send admin notification email:', err.message);
      return { sent: false, error: err.message };
    }
  } else {
    console.log(`[EMAIL NOTICE] SMTP not configured. Logged inquiry for admin:`, {
      to: adminEmail,
      candidate: inquiryData.name,
      phone: inquiryData.phone,
      subject: inquiryData.subject
    });
    return { sent: false, note: 'SMTP_USER/PASS not configured in .env' };
  }
};

/**
 * 3. Master function to dispatch both emails safely
 */
export const sendDualInquiryEmails = async (inquiryData) => {
  try {
    // Send in parallel without blocking
    await Promise.allSettled([
      sendAdminInquiryNotification(inquiryData),
      sendCustomerConfirmationEmail(inquiryData)
    ]);
  } catch (error) {
    console.warn('[EMAIL WARNING] Exception during email dispatch:', error.message);
  }
};
