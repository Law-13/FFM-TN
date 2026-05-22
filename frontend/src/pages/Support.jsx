import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  MessageCircle, 
  ShieldCheck, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL, WHATSAPP_CHANNEL_LINK } from '../config';

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: 'general',
    description: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [faqActive, setFaqActive] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/support`, formData);
      if (response.data.success) {
        showToast('Support ticket sent successfully! Admin will review it.');
        setFormData({ name: '', email: '', issueType: 'general', description: '' });
      } else {
        showToast(response.data.message || 'Failed to submit ticket.', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || 'Error communicating with server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (idx) => {
    setFaqActive(faqActive === idx ? null : idx);
  };

  const faqs = [
    {
      q: "How long does it take for my tournament to get approved?",
      a: "Our administration team reviews submissions manually to check rules and credentials. Approval or requests for adjustments usually take between 24 and 48 hours."
    },
    {
      q: "Can I edit event details after submitting?",
      a: "Once submitted, the details cannot be modified directly. However, you can open a support ticket under the 'Event Modification' category or message our WhatsApp moderators to update details."
    },
    {
      q: "Are cash tournaments allowed on FFM Community TN?",
      a: "Yes, cash prize tournaments are permitted. However, organizers must verify previous hostings, supply a clear payouts timeline in their rules PDF, and submit verified prize distributions."
    },
    {
      q: "What should I do if an organizer doesn't pay the prize money?",
      a: "If an organizer blackmails or fails to distribute cash rewards, collect screenshot proofs and transaction records, and file a ticket under the 'Report Dispute' category immediately. We black-list fraudulent organizations."
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-brand-bg py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Ambience */}
      <div className="absolute top-[20%] right-[-5%] w-[300px] h-[300px] bg-brand-primary opacity-5 blur-[100px] pointer-events-none"></div>

      {/* Toast Alert */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-24 right-6 z-[9999] px-6 py-4 rounded-md shadow-2xl border text-sm font-semibold flex items-center gap-3 ${
              toast.type === 'error' 
                ? 'bg-red-950/80 border-red-500 text-red-200' 
                : 'bg-green-950/80 border-green-500 text-green-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`} />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white text-glow-red uppercase tracking-wide">
            Support Center
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-brand-muted font-medium">
            Having trouble registering an event or spotted a guidelines violation? Get in touch with our team.
          </p>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Support Ticket Form (Left Column) */}
          <div className="lg:col-span-7 glass-panel rounded-xl border border-brand-border/60 p-8 space-y-6">
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-primary" />
              Submit Support Ticket
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                  Full Name <span className="text-brand-primary">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  className="w-full bg-brand-bg border border-brand-border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                  Email Address <span className="text-brand-primary">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-brand-bg border border-brand-border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                  Issue Type <span className="text-brand-primary">*</span>
                </label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleInputChange}
                  className="w-full bg-brand-bg border border-brand-border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all"
                >
                  <option value="general">General Inquiry</option>
                  <option value="registration">Event Onboarding Help</option>
                  <option value="modification">Event Modification</option>
                  <option value="dispute">Report Dispute/Cheating</option>
                  <option value="feedback">Community Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                  Detailed Description <span className="text-brand-primary">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide complete details about your issue, tournament name if applicable, or links to cheating records."
                  required
                  rows={5}
                  className="w-full bg-brand-bg border border-brand-border rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all placeholder:text-gray-600 resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-display text-xs uppercase tracking-wider font-extrabold py-4 px-6 rounded-md hover:bg-red-600 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none transition-all shadow-glow-red cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Ticket...
                  </>
                ) : (
                  <>
                    Submit Ticket
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ & Support Cards (Right Column) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Cards */}
            <div className="grid grid-cols-1 gap-4">
              {/* WhatsApp Card */}
              <a
                href={WHATSAPP_CHANNEL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-6 rounded-xl border border-brand-border/60 hover:border-green-500/40 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-950/60 border border-green-500/30 text-green-400">
                    <MessageCircle className="w-6 h-6 fill-green-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white uppercase text-sm tracking-wider">
                      WhatsApp Escalation
                    </h3>
                    <p className="text-xs text-brand-muted mt-0.5">
                      Chat directly with community group moderators.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-muted group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
              </a>

              {/* Discord Card */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-6 rounded-xl border border-brand-border/60 hover:border-brand-secondary/40 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-950/60 border border-blue-500/30 text-brand-secondary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white uppercase text-sm tracking-wider">
                      Discord Ticket Lobby
                    </h3>
                    <p className="text-xs text-brand-muted mt-0.5">
                      File formal discord support tickets for fair play disputes.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-muted group-hover:text-brand-secondary group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            {/* FAQs Accordion */}
            <div className="glass-panel rounded-xl border border-brand-border/60 p-6 space-y-4">
              <h2 className="text-lg font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-secondary" />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isActive = faqActive === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-brand-border/50 rounded-md overflow-hidden bg-brand-bg/25"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between p-4 text-left font-display font-semibold text-xs sm:text-sm text-white hover:bg-brand-border/20 transition-all cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-brand-muted transition-transform duration-200 ${isActive ? 'rotate-180 text-brand-primary' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-4 pb-4 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-brand-border/20 pt-3"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
