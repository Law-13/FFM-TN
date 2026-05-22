import { ShieldAlert, Scale, CheckSquare } from 'lucide-react';

export default function Terms() {
  return (
    <div className="relative w-full min-h-screen bg-brand-bg py-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient glow */}
      <div className="absolute top-[30%] left-[-5%] w-[250px] h-[250px] bg-brand-secondary opacity-5 blur-[80px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white text-glow-blue uppercase tracking-wide">
            Terms & Conditions
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-brand-muted font-medium">
            Review the legal framework, disclaimers, and agreements that govern event registrations and community interactions.
          </p>
        </div>

        {/* Agreement Box */}
        <div className="glass-panel border-l-4 border-brand-primary p-6 rounded-r-lg bg-brand-card/40 flex items-start gap-4">
          <div className="p-2 rounded bg-brand-bg text-brand-primary">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white uppercase text-sm tracking-wider">
              Mandatory Statement
            </h3>
            <p className="text-sm text-gray-300 mt-1 leading-relaxed font-semibold">
              By registering an event, you agree to all community terms, guidelines, disclaimers, and policies. Non-compliance results in immediate blacklisting.
            </p>
          </div>
        </div>

        {/* Legal Sections */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-brand-muted font-sans">
          
          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-lg font-display font-bold text-white uppercase flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-secondary" />
              1. Event Promotion Policies
            </h2>
            <p className="text-gray-300">
              Only verified event registrations submitted via the official onboarding portal will be advertised across FFM Community TN channels. Organizers must submit accurate tournament details, rules PDFs, and official graphics. FFM Community TN reserves the right to decline or take down promotional posts without prior notification if any details are discovered to be misleading, inaccurate, or fraudulent.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-lg font-display font-bold text-white uppercase flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-brand-secondary" />
              2. Community Liability Disclaimer
            </h2>
            <p className="text-gray-300">
              FFM Community TN serves strictly as a facilitator, moderator, and verification board for events. We are not liable or legally responsible for any financial losses, prize distribution failures, disputes, server issues, or organizational misconduct during tournaments hosted by independent third-party organizers. Participating players and teams register at their own risk.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-lg font-display font-bold text-white uppercase flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-secondary" />
              3. Organizer Accountability
            </h2>
            <p className="text-gray-300">
              Organizers are fully accountable for the integrity of their tournaments. This includes guaranteeing fair tournament brackets, deploying effective anti-cheat monitoring, resolving participant disputes transparently, and ensuring that all announced cash prizes are disbursed in full to the winners. Any proven instance of prize pool embezzlement or favoritism will lead to an immediate ban and public blacklisting of the organizing group.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-lg font-display font-bold text-white uppercase flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-secondary" />
              4. Player Responsibility
            </h2>
            <p className="text-gray-300">
              Players registering for events must represent themselves and their teams honestly. Use of cheats, smurfing, game client modification, or engaging in harassment is a direct violation of community terms. Players are expected to inspect and verify event credentials before paying any entry fees to third-party organizers.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="text-lg font-display font-bold text-white uppercase flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-secondary" />
              5. Privacy Policy
            </h2>
            <p className="text-gray-300">
              FFM Community TN values user privacy. Personal details provided during onboarding (such as email addresses, contact numbers, and WhatsApp numbers) are stored securely and used solely for admin validation, event checking, and official communication. Uploaded media assets (posters, banners, and rules sheets) will be hosted or utilized for promotional media. We do not sell or lease your personal information to third-party marketing networks.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3">
            <h2 className="text-lg font-display font-bold text-white uppercase flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-secondary" />
              6. Fair Play Agreement
            </h2>
            <p className="text-gray-300">
              Both organizers and players agree to cooperate with FFM Community TN administrators during random checks or disputes. Organizers agree to provide game room records, match scoreboard snapshots, or gameplay screen recordings when requested. Refusal to supply evidence is grounds for listing the event as fraudulent.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-3">
            <h2 className="text-lg font-display font-bold text-white uppercase flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-secondary" />
              7. Content Moderation Policy
            </h2>
            <p className="text-gray-300">
              All promotional details, YouTube links, stream titles, and custom event names submitted must adhere to family-friendly standards. Profanity, political/religious references, hate speech, or adult materials are strictly prohibited. The administration reserves the right to edit or sanitize any promotional details prior to publication.
            </p>
          </div>

        </div>

        {/* Footer Reminder */}
        <div className="border-t border-brand-border/40 pt-6 text-center text-xs text-brand-muted">
          <p>Last updated: May 22, 2026. FFM Community TN Administration.</p>
        </div>

      </div>
    </div>
  );
}
