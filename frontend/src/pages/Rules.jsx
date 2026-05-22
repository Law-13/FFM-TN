import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Trophy, 
  Flame, 
  UserCheck, 
  Users, 
  Skull, 
  Ban, 
  Megaphone,
  ChevronDown 
} from 'lucide-react';

export default function Rules() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const sections = [
    {
      title: "General Community Rules",
      icon: Users,
      color: "text-blue-400",
      content: [
        "Respect all community members, players, and moderators. Discriminations of any form are strictly prohibited.",
        "Refrain from sharing unsolicited spam, advertisement links, or irrelevant media in official community groups.",
        "Official communication must be maintained in English or Tamil. Keep discussions gaming-centric and productive.",
        "Impersonation of FFM Community TN admins, staff members, or verified content creators will lead to an immediate ban."
      ]
    },
    {
      title: "Tournament Conduct Rules",
      icon: Trophy,
      color: "text-red-400",
      content: [
        "All participating squads must register with correct details matching their game account IDs.",
        "Teaming up with opposing squads, sharing resources, or match-fixing is strictly forbidden.",
        "Strict adherence to event schedules is required. Teams failing to report within the designated check-in window will forfeit their matches.",
        "Exploiting standard game bugs or map glitches to gain tactical advantages is illegal and results in match disqualification."
      ]
    },
    {
      title: "Anti-Cheat Policy",
      icon: Shield,
      color: "text-green-400",
      content: [
        "Zero-tolerance policy towards hacking, scripts, config files, or external modification applications.",
        "All players are required to run standard security/anti-cheat protocols requested by the event organizers.",
        "In cases of suspicious gameplay, players must submit raw screen recordings (handcam + device capture) when requested by admins.",
        "Any player caught using third-party modifications will face a permanent lifetime ban from all FFM Community TN sanctioned tournaments."
      ]
    },
    {
      title: "Organizer Responsibilities",
      icon: Megaphone,
      color: "text-yellow-400",
      content: [
        "Organizers must maintain complete transparency regarding entry fees, match schedules, and prize distributions.",
        "Prize payouts must be completed within the promised timeline. Failure to pay prizes will black-list the organizer.",
        "Provide clear match logs, scores, and support channels for participant issues.",
        "Register events with valid documentation including official rules PDF and tournament posters."
      ]
    },
    {
      title: "Player Responsibilities",
      icon: UserCheck,
      color: "text-purple-400",
      content: [
        "Ensure your device and internet connections are stable during matches.",
        "Update the game client to the latest version before tournament start times.",
        "Report toxic behavior, hacking, or rule violations directly to tournament moderators with screen-recorded evidence.",
        "Review and agree to the event-specific rules uploaded by the organizer before entering."
      ]
    },
    {
      title: "Punishment System",
      icon: Skull,
      color: "text-pink-400",
      content: [
        "Level 1: Minor offenses (toxicity/delaying matches) result in warning cards or point deductions.",
        "Level 2: Major offenses (bug exploitation/teaming) lead to match disqualification and temporary 30-day bans.",
        "Level 3: Severe offenses (hacking/prize fraud) result in permanent bans and community blacklist."
      ]
    },
    {
      title: "Account Ban Policy",
      icon: Ban,
      color: "text-orange-400",
      content: [
        "Players with active in-game bans from Garena Free Fire/Free Fire Max are ineligible to register for any events.",
        "If a player is banned mid-tournament, the entire squad is disqualified, and all accumulated points are cleared.",
        "Hardware IDs and WhatsApp numbers linked to cheating accounts are logged and restricted permanently."
      ]
    },
    {
      title: "Toxicity & Abuse Policy",
      icon: Flame,
      color: "text-amber-400",
      content: [
        "Hate speech, verbal abuse, slurs, or harassment towards other players or staff is strictly forbidden.",
        "This policy covers in-game chats, WhatsApp community groups, streams, and social media comments.",
        "Toxic teams or organizations will face media blackouts, sponsorship disqualification, and immediate community suspension."
      ]
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-brand-bg py-16 px-4 sm:px-6 lg:px-8">
      {/* Background elements */}
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-brand-primary opacity-5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-brand-secondary opacity-5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white text-glow-red uppercase tracking-wide">
            Official Community Rules
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-brand-muted font-medium">
            Read carefully and understand the standards expected of every player, squad, and tournament organizer on our platform.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            const isOpen = activeIndex === idx;

            return (
              <div 
                key={idx}
                className="glass-panel rounded-lg border border-brand-border/60 overflow-hidden transition-all duration-300"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm sm:text-base text-white hover:bg-brand-border/20 transition-all cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-3.5">
                    <span className={`p-2 rounded-md bg-brand-bg border border-brand-border ${sec.color}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <span>{sec.title}</span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-brand-muted transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180 text-brand-primary' : ''
                    }`} 
                  />
                </button>

                {/* Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="p-6 border-t border-brand-border/40 bg-brand-bg/40 text-sm sm:text-base text-brand-muted space-y-3">
                        {sec.content.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start space-x-3">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                            <p className="leading-relaxed text-gray-300">{bullet}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
