import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, HelpCircle, Send, CheckCircle2, ChevronDown, Mail, AlertTriangle } from 'lucide-react';
import Toast from '../components/Toast';

export default function Support({ whatsappLink }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: 'Tournament Bug',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeFaq, setActiveFaq] = useState(-1);

  const faqs = [
    {
      q: 'How do I verify my registered tournament?',
      a: 'After you submit the event registration form containing your YouTube stream link and previous poster proofs, our administrators will verify the details. A verified status badge along with WhatsApp promos will be issued within 24 to 48 hours.'
    },
    {
      q: 'What happens if a player is caught hacking?',
      a: 'Any player flagged by our anti-cheat moderators or documented with hard video proofs is instantly banned. The player UIDs are permanently blacklisted across all future FFM TN tournaments, and their clans may face points deductions.'
    },
    {
      q: 'Can I update event details after registration?',
      a: 'Yes. You can contact support by submitting a ticket on this page with the subject "Roster / Event Edit" or directly messaging an admin on the official WhatsApp support channel. Make sure to provide the registration name.'
    },
    {
      q: 'Are custom lobby settings standardized?',
      a: 'Yes. General regulations dictate that match settings must remain competitive (e.g. Standard Deflection, competitive gun assets, disabled generic map scripts). Specific tournament variations must be listed clearly in your Rules PDF.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      setErrorMsg('Please fill in all fields before submitting.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch('/api/support/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSuccessMsg('Your support ticket has been submitted successfully!');
        setFormData({
          name: '',
          email: '',
          issueType: 'Tournament Bug',
          description: ''
        });
      } else {
        setErrorMsg(resData.message || 'Failed to submit support ticket.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to reach backend server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      
      {/* Toast Alert Notifications */}
      <AnimatePresence>
        {successMsg && (
          <Toast message={successMsg} type="success" onClose={() => setSuccessMsg('')} />
        )}
        {errorMsg && (
          <Toast message={errorMsg} type="error" onClose={() => setErrorMsg('')} />
        )}
      </AnimatePresence>

      {/* Left Column: Support info, cards, FAQs */}
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-esports-card border border-esports-cyan/25 text-xs text-esports-cyan tracking-wider font-semibold uppercase">
            <HelpCircle size={12} className="animate-pulse" />
            <span>Community Help Desk</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
            PLAYER & ORGANIZER <span className="text-esports-cyan">SUPPORT</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Need help verifying your YouTuber channel status, correcting registration logs, reporting custom room toxicity, or lodging an anti-cheat ban appeal? We are here to assist!
          </p>
        </div>

        {/* Support Link Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel p-5 rounded-2xl border border-green-500/25 bg-green-500/5 hover:bg-green-500/10 transition-colors flex items-start space-x-4 cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-slate-900 border border-green-500/30 text-green-400">
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-slate-100 uppercase text-xs tracking-wider">WhatsApp Support</h3>
              <p className="text-[11px] text-slate-400 mt-1">Get instant answers from official chat admins.</p>
            </div>
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel p-5 rounded-2xl border border-indigo-500/25 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors flex items-start space-x-4 cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-slate-900 border border-indigo-500/30 text-indigo-400">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-slate-100 uppercase text-xs tracking-wider">Discord Support</h3>
              <p className="text-[11px] text-slate-400 mt-1">Raise support tickets directly in official channels.</p>
            </div>
          </a>
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-4">
          <h2 className="font-display font-extrabold text-slate-200 uppercase tracking-wider text-sm border-b border-white/5 pb-2">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="glass-panel rounded-xl overflow-hidden border border-white/5">
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-900/20 cursor-pointer"
                  >
                    <span className="font-display font-bold text-slate-200 text-xs sm:text-sm tracking-wide">
                      {faq.q}
                    </span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="p-4 bg-slate-950/30 border-t border-white/5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Support Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-white/5 relative shadow-2xl space-y-6"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-esports-cyan to-esports-orange" />
        
        <div>
          <h2 className="font-display font-extrabold text-slate-100 uppercase tracking-wide text-lg sm:text-xl">
            Submit a Support Ticket
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Fill out the form below. Your ticket details are sent straight to our admin reviewers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Your Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="E.g. Akash Kumar"
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm transition-all"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="yourname@gmail.com"
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm transition-all"
            />
          </div>

          {/* Issue Type Selector */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Select Issue Type</label>
            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 text-sm transition-all cursor-pointer"
            >
              <option value="Tournament Bug">Tournament Verification Issue</option>
              <option value="Anti-Cheat Ban Appeal">Anti-Cheat / Roster Appeal</option>
              <option value="YouTuber Verification">YouTuber Registration Issue</option>
              <option value="General Query">General Community Inquiry</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">Detailed Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Describe your issue in detail. Make sure to list links or player UIDs if relevant..."
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl focus:border-esports-cyan focus:outline-none text-slate-100 placeholder-slate-500 text-sm transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-esports-cyan to-esports-cyan/80 text-slate-950 font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-lg flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Submit Ticket</span>
                <Send size={15} />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

    </div>
  );
}
