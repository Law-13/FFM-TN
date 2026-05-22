import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

// Setup email transporter
const createTransporter = () => {
  // If SMTP configurations are not fully set, return a mock transporter
  if (!config.smtp.email || !config.smtp.password) {
    console.warn('⚠️ SMTP credentials missing in .env. Email service will run in simulated development mode.');
    return {
      sendMail: async (mailOptions) => {
        console.log('--- [SIMULATED EMAIL SENT] ---');
        console.log(`To: ${mailOptions.to}`);
        console.log(`Subject: ${mailOptions.subject}`);
        console.log(`Attachments: ${mailOptions.attachments?.map(a => a.filename).join(', ') || 'None'}`);
        console.log('------------------------------');
        return { messageId: 'simulated-id-' + Date.now() };
      }
    };
  }

  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465, // true for 465, false for other ports
    auth: {
      user: config.smtp.email,
      pass: config.smtp.password
    }
  });
};

const transporter = createTransporter();

/**
 * Send event registration email to Admin
 */
export const sendAdminRegistrationEmail = async (data, files) => {
  const attachments = files.map(file => ({
    filename: file.originalname,
    path: file.path
  }));

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f111a; color: #e2e8f0; padding: 30px; border-radius: 12px; max-width: 650px; margin: 0 auto; border: 1px solid #1f2937;">
      <div style="text-align: center; border-bottom: 2px solid #ef4444; padding-bottom: 20px; margin-bottom: 25px;">
        <h1 style="color: #ffffff; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; margin: 0;">FFM Community TN</h1>
        <p style="color: #ef4444; font-size: 14px; font-weight: bold; margin: 5px 0 0 0;">NEW EVENT REGISTRATION SUBMISSION</p>
      </div>

      <h2 style="color: #f3f4f6; font-size: 18px; border-left: 4px solid #3b82f6; padding-left: 10px; margin-bottom: 15px;">Organizer Information</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr style="background-color: #161b26;">
          <td style="padding: 10px; font-weight: bold; width: 40%; color: #9ca3af;">Full Name</td>
          <td style="padding: 10px; color: #ffffff;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">Contact Number</td>
          <td style="padding: 10px; color: #ffffff;">${data.contactNumber}</td>
        </tr>
        <tr style="background-color: #161b26;">
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">WhatsApp Number</td>
          <td style="padding: 10px; color: #ffffff;">${data.whatsAppNumber}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">Email Address</td>
          <td style="padding: 10px; color: #ffffff;">${data.emailAddress}</td>
        </tr>
        <tr style="background-color: #161b26;">
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">Organization / Channel</td>
          <td style="padding: 10px; color: #ffffff;">${data.orgChannelName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">YouTube Channel Link</td>
          <td style="padding: 10px; color: #ffffff;"><a href="${data.youtubeLink}" target="_blank" style="color: #3b82f6; text-decoration: none;">${data.youtubeLink}</a></td>
        </tr>
        ${data.instagramLink ? `
        <tr style="background-color: #161b26;">
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">Instagram Link</td>
          <td style="padding: 10px; color: #ffffff;"><a href="${data.instagramLink}" target="_blank" style="color: #3b82f6; text-decoration: none;">${data.instagramLink}</a></td>
        </tr>` : ''}
      </table>

      <h2 style="color: #f3f4f6; font-size: 18px; border-left: 4px solid #ef4444; padding-left: 10px; margin-bottom: 15px;">Event Details</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr style="background-color: #161b26;">
          <td style="padding: 10px; font-weight: bold; width: 40%; color: #9ca3af;">Event Name</td>
          <td style="padding: 10px; color: #ffffff;">${data.eventName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">Event Type</td>
          <td style="padding: 10px; color: #ffffff;">${data.eventType}</td>
        </tr>
        <tr style="background-color: #161b26;">
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">Tournament Date</td>
          <td style="padding: 10px; color: #ffffff;">${data.tournamentDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">Entry Fee</td>
          <td style="padding: 10px; color: #ffffff;">${data.entryFee}</td>
        </tr>
        <tr style="background-color: #161b26;">
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">Prize Pool</td>
          <td style="padding: 10px; color: #ffffff;">${data.prizePool}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">Expected Participants</td>
          <td style="padding: 10px; color: #ffffff;">${data.expectedParticipants}</td>
        </tr>
      </table>

      <h2 style="color: #f3f4f6; font-size: 18px; border-left: 4px solid #10b981; padding-left: 10px; margin-bottom: 15px;">Credibility / Experience</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr style="background-color: #161b26;">
          <td style="padding: 10px; font-weight: bold; width: 40%; color: #9ca3af;">Previous Tournament Name</td>
          <td style="padding: 10px; color: #ffffff;">${data.prevTournamentName || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">Previous Prize Pool</td>
          <td style="padding: 10px; color: #ffffff;">${data.prevPrizePool || 'N/A'}</td>
        </tr>
        ${data.prevStreamLink ? `
        <tr style="background-color: #161b26;">
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">YouTube Stream Link</td>
          <td style="padding: 10px; color: #ffffff;"><a href="${data.prevStreamLink}" target="_blank" style="color: #3b82f6; text-decoration: none;">${data.prevStreamLink}</a></td>
        </tr>` : ''}
      </table>

      ${data.additionalNotes ? `
      <div style="background-color: #161b26; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
        <h4 style="margin: 0 0 5px 0; color: #9ca3af; font-size: 14px;">Additional Notes:</h4>
        <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.5;">${data.additionalNotes}</p>
      </div>` : ''}

      <div style="text-align: center; border-top: 1px solid #1f2937; padding-top: 20px; font-size: 12px; color: #6b7280;">
        <p>This registration is currently pending admin approval. Please review attachments for verification.</p>
        <p>© FFM Community TN Portal</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"FFM Community TN" <${config.smtp.email || 'noreply@ffmcommunitytn.com'}>`,
    to: config.adminEmail,
    subject: `🏆 New Event Registration: ${data.eventName} (${data.orgChannelName})`,
    html,
    attachments
  });
};

/**
 * Send event registration confirmation email to Organizer
 */
export const sendOrganizerConfirmationEmail = async (data) => {
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f111a; color: #e2e8f0; padding: 30px; border-radius: 12px; max-width: 650px; margin: 0 auto; border: 1px solid #1f2937;">
      <div style="text-align: center; border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 25px;">
        <h1 style="color: #ffffff; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; margin: 0;">FFM Community TN</h1>
        <p style="color: #10b981; font-size: 14px; font-weight: bold; margin: 5px 0 0 0;">REGISTRATION RECEIVED</p>
      </div>

      <p style="font-size: 16px; line-height: 1.6; color: #f3f4f6;">Hi <strong>${data.fullName}</strong>,</p>
      
      <p style="font-size: 15px; line-height: 1.6; color: #d1d5db;">
        Thank you for submitting your event registration request on the FFM Community TN platform. Your tournament <strong>"${data.eventName}"</strong> is currently under review by our official administration team.
      </p>

      <div style="background-color: #161b26; border-left: 4px solid #10b981; padding: 15px; border-radius: 0 6px 6px 0; margin: 25px 0;">
        <h4 style="margin: 0 0 5px 0; color: #10b981; font-size: 14px; font-weight: bold;">Status: Under Review</h4>
        <p style="margin: 0; color: #9ca3af; font-size: 13px;">Our administrators check listings for legitimacy, compliance with general conduct rules, and correct file attachments. This process usually takes 24-48 hours.</p>
      </div>

      <h3 style="color: #ffffff; font-size: 16px; margin-bottom: 10px;">Submission Overview</h3>
      <ul style="padding-left: 20px; line-height: 1.8; color: #d1d5db; font-size: 14px;">
        <li><strong>Organization:</strong> ${data.orgChannelName}</li>
        <li><strong>Event Name:</strong> ${data.eventName}</li>
        <li><strong>Event Type:</strong> ${data.eventType}</li>
        <li><strong>Date:</strong> ${data.tournamentDate}</li>
        <li><strong>Prize Pool:</strong> ${data.prizePool}</li>
      </ul>

      <p style="font-size: 14px; line-height: 1.6; color: #9ca3af;">
        If we require any additional verification or changes, our support representatives will contact you directly via WhatsApp at <strong>${data.contactNumber}</strong>.
      </p>

      <div style="text-align: center; margin-top: 30px;">
        <a href="${config.whatsappChannelLink}" style="display: inline-block; background-color: #25d366; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; text-transform: uppercase; font-size: 14px; letter-spacing: 0.5px;">Join WhatsApp Community</a>
      </div>

      <div style="text-align: center; border-top: 1px solid #1f2937; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #6b7280;">
        <p>This is an automated confirmation email. Please do not reply directly.</p>
        <p>© FFM Community TN. All Rights Reserved.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"FFM Community TN" <${config.smtp.email || 'noreply@ffmcommunitytn.com'}>`,
    to: data.emailAddress,
    subject: `🎮 Event Registration Submitted: ${data.eventName}`,
    html
  });
};

/**
 * Send Support Request Email to Admin
 */
export const sendAdminSupportEmail = async (data) => {
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f111a; color: #e2e8f0; padding: 30px; border-radius: 12px; max-width: 650px; margin: 0 auto; border: 1px solid #1f2937;">
      <div style="text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 25px;">
        <h1 style="color: #ffffff; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; margin: 0;">FFM Community TN</h1>
        <p style="color: #3b82f6; font-size: 14px; font-weight: bold; margin: 5px 0 0 0;">NEW SUPPORT TICKET</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr style="background-color: #161b26;">
          <td style="padding: 10px; font-weight: bold; width: 30%; color: #9ca3af;">Name</td>
          <td style="padding: 10px; color: #ffffff;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">Email</td>
          <td style="padding: 10px; color: #ffffff;"><a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr style="background-color: #161b26;">
          <td style="padding: 10px; font-weight: bold; color: #9ca3af;">Issue Type</td>
          <td style="padding: 10px; color: #3b82f6; font-weight: bold; text-transform: uppercase;">${data.issueType}</td>
        </tr>
      </table>

      <div style="background-color: #161b26; padding: 15px; border-radius: 6px; margin-bottom: 25px; border-left: 3px solid #3b82f6;">
        <h4 style="margin: 0 0 5px 0; color: #9ca3af; font-size: 14px;">Issue Description:</h4>
        <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${data.description}</p>
      </div>

      <div style="text-align: center; border-top: 1px solid #1f2937; padding-top: 20px; font-size: 12px; color: #6b7280;">
        <p>Please reply directly to ${data.name} at ${data.email} to resolve the issue.</p>
        <p>© FFM Community TN Portal</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"FFM Community TN Support" <${config.smtp.email || 'support@ffmcommunitytn.com'}>`,
    to: config.adminEmail,
    subject: `🆘 [${data.issueType}] New Support Ticket from ${data.name}`,
    html
  });
};
