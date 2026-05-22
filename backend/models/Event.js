// Event Schema Skeleton (Future MongoDB integration)
/*
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  // Organizer Info
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  orgChannelName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  whatsAppNumber: { type: String, required: true },
  youtubeLink: { type: String, required: true },
  instagramLink: { type: String },

  // Event Specs
  eventName: { type: String, required: true },
  eventType: { type: String, required: true },
  tournamentDate: { type: Date, required: true },
  entryFee: { type: String, required: true },
  prizePool: { type: String, required: true },
  expectedParticipants: { type: String, required: true },
  additionalNotes: { type: String },

  // Credibility Specs
  prevTournamentName: { type: String, required: true },
  prevPrizePool: { type: String, required: true },
  prevStreamLink: { type: String },

  // Media S3/Cloudinary links
  eventPosterUrl: { type: String },
  eventBannerUrl: { type: String },
  rulesPdfUrl: { type: String },
  prevTournamentPosterUrl: { type: String },

  // Admin approval states
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adminFeedback: { type: String },
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', eventSchema);
*/

console.log('ℹ️ Event schema skeleton initialized.');
