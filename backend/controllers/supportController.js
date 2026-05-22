import { sendAdminSupportEmail } from '../services/emailService.js';

export const submitSupportQuery = async (req, res) => {
  try {
    const { name, email, issueType, description } = req.body;

    if (!name || !email || !issueType || !description) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, issue type, description) are required.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address.'
      });
    }

    await sendAdminSupportEmail({ name, email, issueType, description });

    return res.status(200).json({
      success: true,
      message: 'Support ticket submitted successfully. Admin has been notified.'
    });
  } catch (error) {
    console.error('Error handling support ticket:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing support ticket.'
    });
  }
};
