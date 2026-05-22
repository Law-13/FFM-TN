import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create SMTP Transporter
export const createTransporter = () => {
  // Fallback to checking variables
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_PASSWORD;

  if (!user || !pass || user === 'yoursmtp@gmail.com') {
    // If not properly configured, log a warning and return a mock/dummy transporter that prints to console,
    // or just let nodemailer try to send so it will log errors instead of crashing the server.
    console.warn("⚠️ SMTP Credentials are not configured or are using placeholder values. Mail delivery might fail.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

/**
 * Generate Esports Styled HTML Email for Admin Event Registration Review
 */
export const generateEventRegistrationEmail = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Event Registration - FFM Community TN</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #070913; color: #e2e8f0; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #0d1124; border: 2px solid #00f0ff; border-radius: 8px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #070913 0%, #1e1b4b 100%); padding: 30px; text-align: center; border-bottom: 2px solid #ff5e00; }
        .header h1 { color: #00f0ff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; }
        .header p { color: #ff5e00; margin: 5px 0 0 0; font-weight: bold; }
        .content { padding: 30px; }
        .section-title { color: #ff5e00; border-bottom: 1px solid #ff5e00; padding-bottom: 8px; margin-top: 25px; margin-bottom: 15px; font-size: 18px; text-transform: uppercase; }
        .field-group { margin-bottom: 12px; display: flex; flex-direction: column; }
        .label { color: #8a99ad; font-size: 12px; text-transform: uppercase; margin-bottom: 4px; }
        .value { color: #f8fafc; font-size: 15px; background: rgba(0, 240, 255, 0.05); padding: 8px 12px; border-radius: 4px; border-left: 3px solid #00f0ff; }
        .footer { background-color: #070913; padding: 20px; text-align: center; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Event Submitted</h1>
          <p>FFM COMMUNITY TN ONBOARDING PORTAL</p>
        </div>
        <div class="content">
          <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
            A new Free Fire Max event has been registered. Please review the details below. Media and PDFs are attached.
          </p>
          
          <div class="section-title">Organizer Information</div>
          <div class="field-group">
            <div class="label">Full Name</div>
            <div class="value">${data.fullName}</div>
          </div>
          <div class="field-group">
            <div class="label">Contact Number (WhatsApp Verified)</div>
            <div class="value">${data.contactNumber}</div>
          </div>
          <div class="field-group">
            <div class="label">Email Address</div>
            <div class="value">${data.email}</div>
          </div>
          <div class="field-group">
            <div class="label">Organization / Channel Name</div>
            <div class="value">${data.organizationName}</div>
          </div>
          <div class="field-group">
            <div class="label">YouTube Channel Link</div>
            <div class="value">${data.youtubeLink || 'N/A'}</div>
          </div>
          ${data.instagramLink ? `
          <div class="field-group">
            <div class="label">Instagram Link</div>
            <div class="value">${data.instagramLink}</div>
          </div>
          ` : ''}

          <div class="section-title">Event Information</div>
          <div class="field-group">
            <div class="label">Event Name</div>
            <div class="value">${data.eventName}</div>
          </div>
          <div class="field-group">
            <div class="label">Event Type</div>
            <div class="value">${data.eventType}</div>
          </div>
          <div class="field-group">
            <div class="label">Tournament Date</div>
            <div class="value">${data.tournamentDate}</div>
          </div>
          <div class="field-group">
            <div class="label">Entry Fee</div>
            <div class="value">${data.entryFee}</div>
          </div>
          <div class="field-group">
            <div class="label">Prize Pool</div>
            <div class="value">${data.prizePool}</div>
          </div>
          <div class="field-group">
            <div class="label">Expected Participants</div>
            <div class="value">${data.expectedParticipants}</div>
          </div>
          ${data.notes ? `
          <div class="field-group">
            <div class="label">Additional Notes</div>
            <div class="value">${data.notes}</div>
          </div>
          ` : ''}

          <div class="section-title">Credibility Section (Previous Experience)</div>
          <div class="field-group">
            <div class="label">Previous Tournament Name</div>
            <div class="value">${data.prevTournamentName || 'N/A'}</div>
          </div>
          <div class="field-group">
            <div class="label">Previous Prize Pool</div>
            <div class="value">${data.prevPrizePool || 'N/A'}</div>
          </div>
          <div class="field-group">
            <div class="label">YouTube Stream Link</div>
            <div class="value">${data.prevStreamLink || 'N/A'}</div>
          </div>
        </div>
        <div class="footer">
          FFM Community TN &bull; Official Tamil Nadu Free Fire Max Community Platform
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate Esports Styled Confirmation HTML Email for Organizer
 */
export const generateOrganizerConfirmationEmail = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Submission Under Review - FFM Community TN</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #070913; color: #e2e8f0; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #0d1124; border: 2px solid #ff5e00; border-radius: 8px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #070913 0%, #1e1b4b 100%); padding: 30px; text-align: center; border-bottom: 2px solid #00f0ff; }
        .header h1 { color: #ff5e00; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; }
        .header p { color: #00f0ff; margin: 5px 0 0 0; font-weight: bold; }
        .content { padding: 30px; line-height: 1.6; }
        .highlight { color: #00f0ff; font-weight: bold; }
        .details-box { background: rgba(0, 240, 255, 0.05); padding: 15px; border-radius: 6px; border-left: 4px solid #ff5e00; margin: 20px 0; }
        .btn { display: inline-block; background-color: #ff5e00; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-top: 15px; }
        .btn:hover { background-color: #e04f00; }
        .footer { background-color: #070913; padding: 20px; text-align: center; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Submission Received</h1>
          <p>FFM COMMUNITY TN</p>
        </div>
        <div class="content">
          <p>Hello <span class="highlight">${data.fullName}</span>,</p>
          <p>Thank you for submitting your event, <span class="highlight">${data.eventName}</span>, on the FFM Community TN platform. We are thrilled to see our esports ecosystem growing!</p>
          
          <div class="details-box">
            <strong>Status:</strong> Under Review<br/>
            <strong>Event Name:</strong> ${data.eventName}<br/>
            <strong>Submission Date:</strong> ${new Date().toLocaleDateString()}<br/>
            <strong>Expected Review Time:</strong> 24-48 Hours
          </div>
          
          <p>Our official verification administrators will verify your details, check the previous tournament background credentials, and contact you on WhatsApp or via Call at <span class="highlight">${data.contactNumber}</span> if further details are needed.</p>
          
          <p>Meanwhile, make sure you are a member of our official WhatsApp channels to stay updated on announcements and rules:</p>
          
          <div style="text-align: center;">
            <a href="${process.env.WHATSAPP_CHANNEL_LINK || '#'}" class="btn" target="_blank">Join WhatsApp Channel</a>
          </div>
        </div>
        <div class="footer">
          FFM Community TN &bull; Official Tamil Nadu Free Fire Max Community Platform
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate Esports Styled Support Ticket Email
 */
export const generateSupportEmail = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Support Ticket - FFM Community TN</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #070913; color: #e2e8f0; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #0d1124; border: 2px solid #00f0ff; border-radius: 8px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #070913 0%, #1e1b4b 100%); padding: 30px; text-align: center; border-bottom: 2px solid #00f0ff; }
        .header h1 { color: #00f0ff; margin: 0; font-size: 24px; text-transform: uppercase; }
        .header p { color: #ff5e00; margin: 5px 0 0 0; font-weight: bold; }
        .content { padding: 30px; }
        .field { margin-bottom: 15px; }
        .label { color: #8a99ad; font-size: 12px; text-transform: uppercase; margin-bottom: 4px; }
        .value { color: #f8fafc; font-size: 15px; background: rgba(0, 240, 255, 0.05); padding: 10px; border-radius: 4px; border-left: 3px solid #00f0ff; }
        .description-box { color: #f8fafc; font-size: 15px; background: rgba(0, 240, 255, 0.05); padding: 15px; border-radius: 4px; line-height: 1.5; border: 1px solid rgba(0, 240, 255, 0.1); }
        .footer { background-color: #070913; padding: 20px; text-align: center; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Support Ticket</h1>
          <p>FFM COMMUNITY TN HELP DESK</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email Address</div>
            <div class="value">${data.email}</div>
          </div>
          <div class="field">
            <div class="label">Issue Type</div>
            <div class="value" style="color: #ff5e00; font-weight: bold;">${data.issueType}</div>
          </div>
          <div class="field">
            <div class="label">Description</div>
            <div class="description-box">${data.description.replace(/\n/g, '<br/>')}</div>
          </div>
        </div>
        <div class="footer">
          FFM Community TN &bull; Official Tamil Nadu Free Fire Max Community Platform
        </div>
      </div>
    </body>
    </html>
  `;
};
