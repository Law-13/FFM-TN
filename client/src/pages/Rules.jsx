import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Flame, Sword, Eye, Award, Hammer, Ban, AlertCircle, ChevronDown, BookOpen } from 'lucide-react';

export default function Rules() {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const ruleSections = [
    {
      title: 'General Community Rules',
      icon: Flame,
      color: 'text-esports-cyan border-esports-cyan/20',
      rules: [
        'Every member of FFM Community TN must be respectful. Mutual respect is mandatory across all discord, whatsapp channels, and events.',
        'Promo materials, links, or advertising for external leagues/clans without direct admin authorization is strictly forbidden.',
        'Spamming, tag spamming, or sharing NSFW content in community channels will attract an immediate permanent kick.',
        'Official match announcers or hosts must use English or Tamil professionally. Defamatory speech is restricted.'
      ]
    },
    {
      title: 'Tournament Conduct Rules',
      icon: Sword,
      color: 'text-esports-orange border-esports-orange/20',
      rules: [
        'Team rosters must be submitted exactly 2 hours prior to the match. Late adjustments are denied.',
        'Team teaming, alignment with opposing players, or deliberate feeding will lead to immediate clan disqualification.',
        'All players must use official Free Fire Max clients. Customized game modifications or file swaps are illegal.',
        'Emote spamming, toxic toxicity in public match chat, or visual taunts are punishable by a points deduction.'
      ]
    },
    {
      title: 'Anti-Cheat Policy',
      icon: Shield,
      color: 'text-esports-cyan border-esports-cyan/20',
      rules: [
        'Use of mod menus, ESP, aimbots, recoil controllers, or macro scripts will lead to a lifetime device/IP ban from FFM TN.',
        'Spectator delays of at least 90 seconds are mandatory for all streamed community tournament lobbies.',
        'Administrators reserve the right to request real-time camera/device logs or recording playbacks from any suspicious player.',
        'Participating with a banned player on a secondary account results in automatic disqualification of the entire roster.'
      ]
    },
    {
      title: 'Organizer Responsibilities',
      icon: Award,
      color: 'text-esports-orange border-esports-orange/20',
      rules: [
        'Organizers must guarantee the declared prize pool. Prize payouts must happen within 7 business days of event completion.',
        'Branded assets (banners, posters) must use compliant esports templates and display the FFM Community TN verified badge.',
        'All rules, bracket lists, and points table allocations must be kept public and updated transparently.',
        'Organizers are accountable for checking player UID authenticity and ensuring matches run on schedule.'
      ]
    },
    {
      title: 'Player Responsibilities',
      icon: Eye,
      color: 'text-esports-cyan border-esports-cyan/20',
      rules: [
        'Players must ensure their internet and power configurations are stable. Rematches due to disconnects are not allowed.',
        'Maintaining the security of individual Free Fire Max credentials is the responsibility of the player.',
        'Verifying that individual UIDs match the roster sheet prior to starting lobby entry is mandatory.',
        'Players are expected to display sportsmanship and accept referee decisions as final.'
      ]
    },
    {
      title: 'Punishment System',
      icon: Hammer,
      color: 'text-esports-orange border-esports-orange/20',
      rules: [
        'First Offense (Minor): Verbal warning & official record entry.',
        'Second Offense (Minor) / First Offense (Major): 1-match clan suspension or 50% points penalty deduction.',
        'Third Offense (Minor) / Second Offense (Major): Complete tournament disqualification and 3-month ban.',
        'Organizer failures to disburse rewards: Immediate cancellation of tournament status and blacklist from organizing events.'
      ]
    },
    {
      title: 'Account Ban Policy',
      icon: Ban,
      color: 'text-esports-cyan border-esports-cyan/20',
      rules: [
        'Any user account linked to active in-game Free Fire anti-cheat logs is permanently restricted.',
        'Banned organizers cannot re-verify under an alternate entity or channel name.',
        'All banned players, organizer blacklists, and clan restrictions will be logged publicly inside our official database.',
        'Appeals against ban structures must be submitted formally to the support channel within 48 hours of enforcement.'
      ]
    },
    {
      title: 'Toxicity & Abuse Policy',
      icon: AlertCircle,
      color: 'text-esports-orange border-esports-orange/20',
      rules: [
        'Hate speech, racial slurs, local community insults, or religious slander is met with an immediate permanent ban.',
        'Targeted harassment, threats, or cyberbullying of other players/organizers will result in law enforcement cooperation.',
        'Stream sniping, chat toxicity on official streams, or fake reports are strictly punishable.',
        'We promote an inclusive, respectful, and safe esports environment for everyone across Tamil Nadu.'
      ]
    }
  ];

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-esports-card border border-esports-orange/25 text-xs text-esports-orange tracking-wider font-semibold uppercase">
          <BookOpen size={12} className="animate-pulse" />
          <span>Community Rulebook</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          OFFICIAL LEAGUE <span className="text-esports-cyan">RULES</span>
        </h1>
        <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm">
          To maintain integrity and fair play within the Free Fire Max Tamil Nadu esports ecosystem, all participants must strictly adhere to the guidelines below.
        </p>
      </div>

      {/* Accordion Layout */}
      <div className="space-y-4 relative z-10">
        {ruleSections.map((section, idx) => {
          const Icon = section.icon;
          const isOpen = activeAccordion === idx;

          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-panel rounded-2xl overflow-hidden border border-white/5 shadow-lg"
            >
              <button
                onClick={() => setActiveAccordion(isOpen ? -1 : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between hover:bg-slate-900/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-slate-900 border ${section.color}`}>
                    <Icon size={20} />
                  </div>
                  <span className="font-display font-extrabold text-slate-100 uppercase tracking-wide text-sm sm:text-base">
                    {section.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-slate-400"
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 bg-slate-950/40 border-t border-white/5 space-y-3.5">
                      {section.rules.map((rule, ruleIdx) => (
                        <div key={ruleIdx} className="flex items-start space-x-3 text-slate-300 text-xs sm:text-sm">
                          <span className="font-display font-bold text-esports-orange shrink-0 mt-0.5">
                            {(ruleIdx + 1).toString().padStart(2, '0')}.
                          </span>
                          <p className="leading-relaxed">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Accordion Warning Footer */}
      <div className="glass-panel p-6 rounded-2xl border border-red-500/25 bg-red-500/5 flex items-start space-x-3 max-w-2xl mx-auto">
        <AlertCircle size={22} className="text-red-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-display font-bold text-slate-200 uppercase text-xs tracking-wider">
            Important Notice for Organizers
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
            Failing to enforce these community policies during a registered tournament will lead to an immediate ban, removal from official calendars, and revocation of YouTube/WhatsApp promotions.
          </p>
        </div>
      </div>

    </div>
  );
}
