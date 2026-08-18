import 'dotenv/config.js';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create transporter with SMTP configuration (Optimized for Render & Cloud deployments)
const createTransporter = () => {
  const user = (process.env.SMTP_USER || '').trim();
  const rawPass = process.env.SMTP_PASS || '';
  const pass = rawPass.replace(/\s+/g, '');

  if (!user || !pass) {
    console.error('❌ [SMTP ERROR] SMTP_USER or SMTP_PASS is missing in environment variables!');
    console.error(`Current env check: SMTP_USER=${user ? 'SET (' + user + ')' : 'MISSING'}, SMTP_PASS=${pass ? 'SET (' + pass.length + ' chars)' : 'MISSING'}`);
    return null;
  }

  // Direct SSL (Port 465) with explicit timeouts - 100% reliable on Render, AWS, and Cloud hosts
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 20000
  });
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
 * 1. Send Royal Confirmation Email to Customer (Fully Responsive for Mobile)
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
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Inquiry Confirmation - Pheta By Nihar</title>
    <style type="text/css">
      /* Reset & Mobile Styles */
      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
      body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #F8F3EC; }
      
      @media screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
          max-width: 100% !important;
          border-radius: 0 !important;
          border-left: none !important;
          border-right: none !important;
        }
        .fluid-padding {
          padding-left: 18px !important;
          padding-right: 18px !important;
          padding-top: 25px !important;
          padding-bottom: 25px !important;
        }
        .header-padding {
          padding: 30px 16px 22px 16px !important;
        }
        .logo-img {
          width: 80px !important;
          height: 80px !important;
        }
        .brand-title {
          font-size: 22px !important;
          line-height: 28px !important;
        }
        .brand-subtitle {
          font-size: 11px !important;
        }
        .greeting-text {
          font-size: 18px !important;
        }
        .body-p {
          font-size: 13.5px !important;
          line-height: 1.65 !important;
        }
        .stack-cell-label {
          display: block !important;
          width: 100% !important;
          padding-bottom: 2px !important;
          font-size: 11px !important;
        }
        .stack-cell-value {
          display: block !important;
          width: 100% !important;
          padding-bottom: 12px !important;
          font-size: 13.5px !important;
        }
        .btn-full {
          display: block !important;
          width: 100% !important;
          box-sizing: border-box !important;
          text-align: center !important;
          padding: 14px 16px !important;
          font-size: 12.5px !important;
        }
        .hide-mobile {
          display: none !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #F8F3EC; font-family: 'Georgia', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #2E1A14;">
    
    <!-- Outer Full Width Wrapper -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8F3EC;">
      <tr>
        <td align="center" style="padding: 20px 0;">
          
          <!-- Inner Centered Card Container (Max 600px) -->
          <table class="email-container" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 35px rgba(74, 13, 13, 0.12); border: 2px solid #E8D8C5;">
            
            <!-- Royal Header Banner -->
            <tr>
              <td class="header-padding" align="center" style="background: linear-gradient(135deg, #4A0D0D 0%, #6E1E18 50%, #3D0A0A 100%); padding: 36px 24px 26px 24px; border-bottom: 4px solid #D7A65B;">
                <img class="logo-img" src="cid:phetalogo" alt="Pheta By Nihar" width="95" height="95" style="display: block; margin: 0 auto 12px auto; border-radius: 50%; border: 2px solid #D7A65B; background: #ffffff;" />
                <p style="color: #F3D18A; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 4px 0; font-family: sans-serif; font-weight: bold;">
                  ॥ संस्कृती परमो धर्म: ॥
                </p>
                <h1 class="brand-title" style="color: #FFFDFB; font-size: 25px; margin: 0; font-weight: bold; letter-spacing: 0.5px; font-family: 'Georgia', serif;">
                  Pheta By Nihar
                </h1>
                <p class="brand-subtitle" style="color: #E8D8C5; font-size: 12px; margin: 4px 0 0 0; font-family: sans-serif;">
                  Royal Marathi Turban Draping & Heritage Academy
                </p>
              </td>
            </tr>

            <!-- Main Body Content -->
            <tr>
              <td class="fluid-padding" style="padding: 32px 28px 24px 28px;">
                <h2 class="greeting-text" style="font-size: 20px; color: #6E1E18; margin-top: 0; margin-bottom: 10px; font-family: 'Georgia', serif;">
                  Namaskar ${inquiryData.name},
                </h2>
                <p class="body-p" style="font-size: 14px; line-height: 1.65; color: #555555; font-family: sans-serif; margin-bottom: 22px;">
                  Thank you for reaching out to <strong>Pheta By Nihar</strong>. We have successfully received your inquiry regarding <strong>${subjectLabel}</strong>. Our styling and event coordination team will connect with you shortly.
                </p>

                <!-- Inquiry Summary Card -->
                <div style="background-color: #FAF6F0; border: 1px solid #E8D8C5; border-radius: 16px; padding: 18px; margin-bottom: 22px;">
                  <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #6E1E18; margin: 0 0 12px 0; font-family: sans-serif; font-weight: bold; border-bottom: 1px solid #E8D8C5; padding-bottom: 8px;">
                    👑 Your Inquiry Summary
                  </h3>
                  
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-family: sans-serif; font-size: 13px;">
                    <tr>
                      <td class="stack-cell-label" style="padding: 5px 0; color: #777777; width: 130px; font-weight: bold;">Subject / Item:</td>
                      <td class="stack-cell-value" style="padding: 5px 0; color: #4A0D0D; font-weight: bold;">${subjectLabel}</td>
                    </tr>
                    <tr>
                      <td class="stack-cell-label" style="padding: 5px 0; color: #777777; font-weight: bold;">Inquiry Type:</td>
                      <td class="stack-cell-value" style="padding: 5px 0; color: #2E1A14; text-transform: capitalize;">${inquiryData.type || 'General'}</td>
                    </tr>
                    <tr>
                      <td class="stack-cell-label" style="padding: 5px 0; color: #777777; font-weight: bold;">Phone Number:</td>
                      <td class="stack-cell-value" style="padding: 5px 0; color: #2E1A14;"><a href="tel:${inquiryData.phone}" style="color: #6E1E18; text-decoration: none; font-weight: bold;">${inquiryData.phone}</a></td>
                    </tr>
                    ${inquiryData.city || inquiryData.address ? `
                    <tr>
                      <td class="stack-cell-label" style="padding: 5px 0; color: #777777; font-weight: bold;">Delivery Location:</td>
                      <td class="stack-cell-value" style="padding: 5px 0; color: #2E1A14;">${inquiryData.city || inquiryData.address}</td>
                    </tr>
                    ` : ''}
                    ${inquiryData.preferredBatch ? `
                    <tr>
                      <td class="stack-cell-label" style="padding: 5px 0; color: #777777; font-weight: bold;">Preferred Batch:</td>
                      <td class="stack-cell-value" style="padding: 5px 0; color: #2E1A14; font-weight: bold;">${inquiryData.preferredBatch}</td>
                    </tr>
                    ` : ''}
                    ${inquiryData.message ? `
                    <tr>
                      <td class="stack-cell-label" style="padding: 5px 0; color: #777777; font-weight: bold; vertical-align: top;">Your Message:</td>
                      <td class="stack-cell-value" style="padding: 5px 0; color: #444444; font-style: italic; line-height: 1.5;">"${inquiryData.message}"</td>
                    </tr>
                    ` : ''}
                  </table>
                </div>

                <!-- Studio & Contact Info Box -->
                <div style="background-color: #ffffff; border: 1px dashed #D7A65B; border-radius: 16px; padding: 18px; margin-bottom: 24px; font-family: sans-serif; font-size: 13px;">
                  <h4 style="margin: 0 0 8px 0; color: #6E1E18; font-size: 12px; text-transform: uppercase; font-weight: bold;">
                    📍 Studio Visit & Contact Details
                  </h4>
                  <p style="margin: 0 0 6px 0; color: #555555; line-height: 1.5; font-size: 12.5px;">
                    <strong>Studio Address:</strong> no. 33/J, 9, Mughbhat cross lane Twashta kansar chwal, Girgaon, Mumbai, Maharashtra 400004
                  </p>
                  <p style="margin: 0 0 10px 0; color: #555555; font-size: 12.5px;">
                    <strong>Phone / WhatsApp:</strong> <a href="tel:+918928563608" style="color: #6E1E18; text-decoration: none; font-weight: bold;">+91 89285 63608</a> / <a href="tel:+918087545175" style="color: #6E1E18; text-decoration: none; font-weight: bold;">+91 80875 45175</a>
                  </p>
                  <a href="https://share.google/xj6WCITif4HwHcTTn" target="_blank" style="display: inline-block; color: #6E1E18; font-weight: bold; text-decoration: underline; font-size: 12px;">
                    🗺️ Open Studio Location on Google Maps &rarr;
                  </a>
                </div>

                <!-- Instant WhatsApp Help CTA Button -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center">
                      <a class="btn-full" href="https://wa.me/918928563608?text=${encodeURIComponent(
                        `Namaskar Nihar! I submitted an inquiry for '${subjectLabel}' on your website.`
                      )}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #25D366, #128C7E); color: #ffffff; padding: 14px 28px; font-family: sans-serif; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; text-decoration: none; border-radius: 50px; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);">
                        💬 Need Fast Assistance? Chat on WhatsApp
                      </a>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Royal Footer -->
            <tr>
              <td align="center" style="background-color: #FAF6F0; padding: 20px 16px; border-top: 1px solid #E8D8C5; font-family: sans-serif; font-size: 11px; color: #777777;">
                <p style="margin: 0 0 6px 0; font-weight: bold; color: #4A0D0D;">Pheta By Nihar &bull; Girgaon, Mumbai, Maharashtra</p>
                <p style="margin: 0; color: #999999; font-size: 10.5px;">
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
      console.log(`\n📤 [DISPATCHING] Customer Confirmation Email -> ${inquiryData.email} (Subject: ${subjectLabel})`);
      const info = await transporter.sendMail({
        from: fromAddress,
        to: inquiryData.email,
        subject: `👑 Inquiry Received: ${subjectLabel} | Pheta By Nihar`,
        html: htmlContent,
        attachments: getLogoAttachment()
      });
      console.log(`🟢 [EMAIL DELIVERED] Customer Confirmation sent to: ${inquiryData.email} (MessageId: ${info.messageId})`);
      return { sent: true, messageId: info.messageId };
    } catch (err) {
      console.error(`❌ [EMAIL FAILED] Could not send customer confirmation to ${inquiryData.email}:`, err.message);
      return { sent: false, error: err.message };
    }
  } else {
    console.log(`⚠️ [EMAIL NOTICE] SMTP not configured. Customer confirmation email skipped for:`, inquiryData.email);
    return { sent: false, note: 'SMTP_USER/PASS not configured in .env' };
  }
};

/**
 * 2. Send Alert Notification Email to Owner / Admin (Fully Responsive for Mobile)
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
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${title}</title>
    <style type="text/css">
      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #F8F3EC; }
      
      @media screen and (max-width: 600px) {
        .admin-container {
          width: 100% !important;
          max-width: 100% !important;
          border-radius: 0 !important;
          border-left: none !important;
          border-right: none !important;
        }
        .fluid-padding {
          padding-left: 18px !important;
          padding-right: 18px !important;
          padding-top: 22px !important;
          padding-bottom: 22px !important;
        }
        .header-padding {
          padding: 26px 16px 20px 16px !important;
        }
        .brand-title {
          font-size: 20px !important;
        }
        .stack-cell-label {
          display: block !important;
          width: 100% !important;
          padding-bottom: 2px !important;
          font-size: 11px !important;
        }
        .stack-cell-value {
          display: block !important;
          width: 100% !important;
          padding-bottom: 12px !important;
          font-size: 13.5px !important;
        }
        .btn-full {
          display: block !important;
          width: 100% !important;
          box-sizing: border-box !important;
          text-align: center !important;
          padding: 14px 16px !important;
          font-size: 13px !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Georgia', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8F3EC; color: #2E1A14;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8F3EC;">
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table class="admin-container" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(74, 13, 13, 0.12); border: 2px solid #E8D8C5;">
            
            <!-- Header Banner -->
            <tr>
              <td class="header-padding" align="center" style="background: linear-gradient(135deg, #4A0D0D 0%, #6E1E18 50%, #4A0D0D 100%); padding: 30px 20px 22px 20px; border-bottom: 4px solid #D7A65B;">
                <img src="cid:phetalogo" alt="Pheta By Nihar" width="75" height="75" style="display: block; margin: 0 auto 8px auto; border-radius: 50%; border: 2px solid #D7A65B; background: #ffffff;" />
                <h1 class="brand-title" style="color: #FFFDFB; font-size: 22px; margin: 0; font-weight: bold; font-family: 'Georgia', serif;">
                  Pheta By Nihar - Admin Alert
                </h1>
                <p style="color: #F3D18A; font-size: 10.5px; text-transform: uppercase; letter-spacing: 2.5px; margin: 5px 0 0 0; font-family: sans-serif; font-weight: bold;">
                  ${isClass ? 'ACADEMY ENROLLMENT ALERT' : 'CUSTOMER INQUIRY ALERT'}
                </p>
              </td>
            </tr>

            <!-- Content Area -->
            <tr>
              <td class="fluid-padding" style="padding: 28px 24px 20px 24px;">
                <h2 style="font-size: 18px; color: #4A0D0D; margin-top: 0; margin-bottom: 8px; font-family: 'Georgia', serif;">
                  ${title}
                </h2>
                <p style="font-size: 13.5px; line-height: 1.6; color: #666666; font-family: sans-serif; margin-bottom: 20px;">
                  A new prospect has submitted an inquiry on your website:
                </p>

                <!-- Customer Details Card -->
                <div style="background-color: #FDFBF7; border: 1px solid #E8D8C5; border-radius: 14px; padding: 18px; margin-bottom: 22px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-family: sans-serif; font-size: 13.5px;">
                    <tr>
                      <td class="stack-cell-label" style="padding: 6px 0; color: #888888; font-weight: bold; width: 135px; text-transform: uppercase; font-size: 11px;">Customer Name:</td>
                      <td class="stack-cell-value" style="padding: 6px 0; color: #4A0D0D; font-weight: bold; font-size: 15px;">${inquiryData.name}</td>
                    </tr>
                    <tr>
                      <td class="stack-cell-label" style="padding: 6px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Phone / WhatsApp:</td>
                      <td class="stack-cell-value" style="padding: 6px 0; color: #2E1A14;">
                        <a href="tel:${inquiryData.phone}" style="color: #6E1E18; font-weight: bold; text-decoration: none;">${inquiryData.phone}</a>
                      </td>
                    </tr>
                    ${inquiryData.email ? `
                    <tr>
                      <td class="stack-cell-label" style="padding: 6px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Email Address:</td>
                      <td class="stack-cell-value" style="padding: 6px 0; color: #2E1A14;"><a href="mailto:${inquiryData.email}" style="color: #6E1E18; text-decoration: none;">${inquiryData.email}</a></td>
                    </tr>
                    ` : ''}
                    <tr>
                      <td class="stack-cell-label" style="padding: 6px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Selected Item:</td>
                      <td class="stack-cell-value" style="padding: 6px 0; color: #6E1E18; font-weight: bold;">${inquiryData.subject}</td>
                    </tr>
                    <tr>
                      <td class="stack-cell-label" style="padding: 6px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Inquiry Type:</td>
                      <td class="stack-cell-value" style="padding: 6px 0; color: #2E1A14; text-transform: capitalize;">${inquiryData.type || 'General'}</td>
                    </tr>
                    ${inquiryData.city || inquiryData.address ? `
                    <tr>
                      <td class="stack-cell-label" style="padding: 6px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">City / Address:</td>
                      <td class="stack-cell-value" style="padding: 6px 0; color: #2E1A14;">${inquiryData.city || inquiryData.address}</td>
                    </tr>
                    ` : ''}
                    ${inquiryData.preferredBatch ? `
                    <tr>
                      <td class="stack-cell-label" style="padding: 6px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Preferred Batch:</td>
                      <td class="stack-cell-value" style="padding: 6px 0; color: #2E1A14; font-weight: bold;">${inquiryData.preferredBatch}</td>
                    </tr>
                    ` : ''}
                    ${inquiryData.message ? `
                    <tr>
                      <td class="stack-cell-label" style="padding: 6px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px; vertical-align: top;">Customer Note:</td>
                      <td class="stack-cell-value" style="padding: 6px 0; color: #2E1A14; line-height: 1.5; font-style: italic;">"${inquiryData.message}"</td>
                    </tr>
                    ` : ''}
                  </table>
                </div>

                <!-- 1-Click WhatsApp Quick Action -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center">
                      <a class="btn-full" href="${whatsappUrl}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 14px 28px; font-family: sans-serif; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; text-decoration: none; border-radius: 50px; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);">
                        💬 1-Click WhatsApp Reply
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background-color: #FDFBF7; padding: 18px 16px; border-top: 1px solid #E8D8C5; font-family: sans-serif; font-size: 11px; color: #999999;">
                <p style="margin: 0;">Pheta By Nihar &bull; Real-time Inquiry Notification System &bull; Girgaon, Mumbai</p>
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
      console.log(`\n📤 [DISPATCHING] Owner / Admin Lead Alert -> ${adminEmail} (From: ${inquiryData.name} - ${inquiryData.subject})`);
      const info = await transporter.sendMail({
        from: `"Pheta By Nihar Portal" <${process.env.SMTP_USER || 'no-reply@phetabynihar.com'}>`,
        to: adminEmail,
        subject: `🚨 [INQUIRY ALERT] ${inquiryData.name} - ${inquiryData.subject}`,
        html: htmlContent,
        attachments: getLogoAttachment()
      });
      console.log(`🟢 [EMAIL DELIVERED] Owner Alert sent to: ${adminEmail} (MessageId: ${info.messageId})`);
      return { sent: true, messageId: info.messageId };
    } catch (err) {
      console.error(`❌ [EMAIL FAILED] Could not send owner alert to ${adminEmail}:`, err.message);
      return { sent: false, error: err.message };
    }
  } else {
    console.log(`⚠️ [EMAIL NOTICE] SMTP not configured. Logged inquiry for admin:`, {
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
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n======================================================`);
  console.log(`👑 [${timestamp}] INCOMING INQUIRY DISPATCH`);
  console.log(`👤 Customer: ${inquiryData.name} | 📞 Phone: ${inquiryData.phone}`);
  console.log(`📧 Customer Email: ${inquiryData.email || 'None'}`);
  console.log(`🏷️ Subject / Item: ${inquiryData.subject} (Type: ${inquiryData.type || 'general'})`);
  console.log(`📍 Location: ${inquiryData.city || inquiryData.address || 'None'}`);
  if (inquiryData.message) console.log(`💬 Message: "${inquiryData.message}"`);
  console.log(`======================================================`);

  try {
    await Promise.allSettled([
      sendAdminInquiryNotification(inquiryData),
      sendCustomerConfirmationEmail(inquiryData)
    ]);
    console.log(`✔ [EMAIL DISPATCH FINISHED] Both notification tasks completed.\n`);
  } catch (error) {
    console.warn('⚠️ [EMAIL WARNING] sendDualInquiryEmails encountered an error:', error);
  }
};
