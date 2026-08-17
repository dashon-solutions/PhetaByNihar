import nodemailer from 'nodemailer';

// Create transporter with optional SMTP config
const createTransporter = () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return null;
};

/**
 * Send Royal Self Notification Email for Class/Product Inquiry
 */
export const sendAdminInquiryNotification = async (inquiryData) => {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER || 'info@phetabynihar.com';
  const isClass = inquiryData.type === 'class';
  const title = isClass ? '🎓 New Pheta Academy Class Enrollment Inquiry!' : '👑 New Product Rental / Service Inquiry!';

  const cleanPhone = (inquiryData.phone || '').replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
  const whatsappUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `👑 Namaskar ${inquiryData.name}! Thank you for inquiring about ${inquiryData.subject} at Pheta By Nihar.`
  )}`;

  const htmlContent = `
  <!DOCTYPE html>
  <html>
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
                <div style="font-size: 26px; color: #D7A65B; margin-bottom: 5px;">👑</div>
                <h1 style="color: #FFFDFB; font-size: 24px; margin: 0; font-weight: normal; letter-spacing: 1px; font-family: 'Georgia', serif;">
                  Pheta By Nihar
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
                  A new prospect has submitted an inquiry through the official website. Here are the complete details:
                </p>

                <!-- Details Card -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FDFBF7; border: 1px solid #E8D8C5; border-radius: 14px; padding: 20px; margin-bottom: 25px; font-family: sans-serif; font-size: 14px;">
                  <tr>
                    <td style="padding: 8px 0; color: #888888; font-weight: bold; width: 130px; text-transform: uppercase; font-size: 11px;">Candidate Name:</td>
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
                    <td style="padding: 8px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Selected Program:</td>
                    <td style="padding: 8px 0; color: #6E1E18; font-weight: bold;">${inquiryData.subject}</td>
                  </tr>
                  ${inquiryData.preferredBatch ? `
                  <tr>
                    <td style="padding: 8px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Preferred Batch:</td>
                    <td style="padding: 8px 0; color: #2E1A14; font-weight: bold;">${inquiryData.preferredBatch}</td>
                  </tr>
                  ` : ''}
                  ${inquiryData.city ? `
                  <tr>
                    <td style="padding: 8px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">City / Location:</td>
                    <td style="padding: 8px 0; color: #2E1A14;">${inquiryData.city}</td>
                  </tr>
                  ` : ''}
                  ${inquiryData.address && !inquiryData.city ? `
                  <tr>
                    <td style="padding: 8px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Address:</td>
                    <td style="padding: 8px 0; color: #2E1A14;">${inquiryData.address}</td>
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
                        💬 Reply via WhatsApp Now
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background-color: #FDFBF7; padding: 20px; border-top: 1px solid #E8D8C5; font-family: sans-serif; font-size: 11px; color: #999999;">
                <p style="margin: 0;">Pheta By Nihar &bull; Administration Notification System &bull; Pune, Maharashtra</p>
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
        subject: `[INQUIRY ALERT] ${inquiryData.name} - ${inquiryData.subject}`,
        html: htmlContent
      });
      console.log(`[EMAIL SUCCESS] Admin notification email sent to ${adminEmail}`);
      return { sent: true };
    } catch (err) {
      console.error('[EMAIL ERROR] Failed to send email via SMTP:', err.message);
      return { sent: false, error: err.message };
    }
  } else {
    console.log(`[EMAIL NOTICE] SMTP not configured. Logged Inquiry Notification for Admin:`, {
      to: adminEmail,
      subject: `[INQUIRY ALERT] ${inquiryData.name} - ${inquiryData.subject}`,
      candidate: inquiryData.name,
      phone: inquiryData.phone,
      classOrSubject: inquiryData.subject
    });
    return { sent: false, note: 'SMTP_USER/PASS not configured in .env' };
  }
};
