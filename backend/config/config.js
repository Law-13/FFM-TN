import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  adminEmail: process.env.ADMIN_EMAIL || 'admin@ffmcommunitytn.com',
  whatsappChannelLink: process.env.WHATSAPP_CHANNEL_LINK || 'https://chat.whatsapp.com/Jd87fh93Kks82Fsh',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    email: process.env.SMTP_EMAIL || '',
    password: process.env.SMTP_PASSWORD || ''
  }
};
