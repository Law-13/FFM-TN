import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Scale, UserCheck, ShieldAlert } from 'lucide-react';

export default function Terms() {
  const terms = [
    {
      title: '1. Event Promotion Policies',
      icon: ShieldCheck,
      desc: 'All tournaments registered on FFM Community TN are entitled to community channels visibility, provided they display approved FFM branding. We reserve the right to suspend or block promotions if event brackets, schedules, or verified UIDs violate standard league protocols or appear misleading.'
    },
    {
      title: '2. Community Liability Disclaimer',
      icon: ShieldAlert,
      desc: 'FFM Community TN is an independent matchmaking/promotional platform and holds no direct responsibility for rewards, prize pools, custom lobby crashes, server network latency issues, or financial transactions arranged between organizers, sponsors, and players. All participation is at the individual participant’s risk.'
    },
    {
      title: '3. Organizer Accountability',
      icon: Scale,
      desc: 'Tournament organizers must provide authentic KYC/WhatsApp details during event onboarding. Any organizer found defaulting on prize pools, hosting rigged custom rooms, showing extreme bias, or using deceptive statistics will face a lifetime ban from holding tournaments and will be listed on our public ban directory.'
    },
    {
      title: '4. Player Responsibility & Fair Play',
      icon: UserCheck,
      desc: 'Players must abide by the official Free Fire Max fair play agreement. The use of script modifiers, external macro software, toxic slurs in match comments, or false report campaigns is strictly forbidden. Players are solely responsible for keeping their UIDs updated and verifying match schedules.'
    },
    {
      title: '5. Content Moderation & Privacy',
      icon: FileText,
      desc: 'We are committed to securing organizer and YouTuber registration logs. Details are used solely for verification. By uploading posters, PDFs, banners, or streaming links, users grant FFM Community TN authorization to host, scale, and feature these files in promotional calendars across all linked socials.'
    }
  ];

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-esports-card border border-esports-cyan/25 text-xs text-esports-cyan tracking-wider font-semibold uppercase">
          <Scale size={12} className="animate-pulse" />
          <span>Legal Framework</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          TERMS & <span className="text-esports-cyan">CONDITIONS</span>
        </h1>
        <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm">
          Please review the official agreements, disclaimers, and legal clauses governing registrations and event listings on FFM Community TN.
        </p>
      </div>

      {/* Grid Layout of Cards */}
      <div className="space-y-6 relative z-10">
        {terms.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group shadow-lg"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-esports-cyan to-esports-orange opacity-40" />
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-esports-cyan shrink-0">
                  <Icon size={22} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-slate-100 uppercase tracking-wide text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Acknowledgment Agreement Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-esports-orange/20 bg-esports-orange/5 text-center max-w-2xl mx-auto space-y-4 shadow-xl"
      >
        <h4 className="font-display font-black text-slate-100 text-base sm:text-lg uppercase tracking-wider">
          Binding Acceptance Agreement
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
          💡 By registering an event or submitting YouTuber onboarding applications on this portal, you explicitly agree to all community terms, liability policies, anti-cheat regulations, and fair play agreements.
        </p>
      </motion.div>

    </div>
  );
}
