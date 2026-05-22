import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { MessageCircle, Trophy, Users, Tv, ShieldCheck } from 'lucide-react';
import { WHATSAPP_CHANNEL_LINK } from '../config';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
  };

  const stats = [
    { label: 'Active Players', value: '25,000+', icon: Users, color: 'text-brand-secondary', glow: 'shadow-glow-blue' },
    { label: 'Verified Tournaments', value: '450+', icon: Trophy, color: 'text-brand-primary', glow: 'shadow-glow-red' },
    { label: 'Partner Creators', value: '80+', icon: Tv, color: 'text-brand-gold', glow: 'shadow-glow-gold' },
    { label: 'Fair Play Verified', value: '100%', icon: ShieldCheck, color: 'text-brand-accent', glow: 'shadow-glow-green' }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-brand-bg">
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-brand-primary opacity-10 blur-[80px] sm:blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-brand-secondary opacity-10 blur-[80px] sm:blur-[120px] animate-pulse-slow"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-card border border-brand-border">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
            <span className="text-xs font-semibold text-brand-primary uppercase tracking-widest font-display">
              Official Hub of Free Fire Max TN
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-none text-white text-glow-red"
          >
            Tamil Nadu’s Official <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-brand-primary via-brand-gold to-brand-secondary bg-clip-text text-transparent">
              Free Fire Max
            </span> <br />
            Community Platform
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-brand-muted font-medium leading-relaxed"
          >
            Connecting Tamil Nadu’s elite tournament organizers, content creators, and competitive players. Empowering fair play, direct admin backing, and seamless registrations.
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a
              href={WHATSAPP_CHANNEL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25d366] text-white font-display text-sm uppercase tracking-wider font-extrabold px-8 py-4 rounded-md hover:bg-[#20ba5a] hover:scale-105 transition-all w-full sm:w-auto shadow-glow-green"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Join WhatsApp Community
            </a>
            
            <NavLink
              to="/register"
              className="flex items-center justify-center gap-3 bg-brand-card border border-brand-border text-white hover:text-brand-primary hover:border-brand-primary font-display text-sm uppercase tracking-wider font-extrabold px-8 py-4 rounded-md hover:scale-105 transition-all w-full sm:w-auto"
            >
              <Trophy className="w-5 h-5" />
              Register Your Event
            </NavLink>
          </motion.div>
        </motion.div>
      </div>

      {/* Community Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 border-t border-brand-border/40">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`glass-panel p-6 rounded-lg border border-brand-border/60 text-center flex flex-col items-center justify-center space-y-3 hover:border-brand-border transition-all duration-300 hover:shadow-2xl`}
              >
                <div className={`p-3.5 rounded-full bg-brand-bg border border-brand-border/80 ${stat.color} shadow-inner`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-brand-muted tracking-wide uppercase">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Community Introduction Details */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-xl border border-brand-border/80 p-8 md:p-12 space-y-6">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white border-b-2 border-brand-primary pb-4 inline-block">
            Our Core Objective
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-brand-muted leading-relaxed">
            <div className="space-y-4">
              <p>
                <strong>FFM Community TN</strong> is the primary infrastructure regulating Free Fire Max tournament ecosystems in Tamil Nadu. We provide tournament organizers, YouTuber communities, and professional teams with the onboarding tools, certification layers, and player support channels necessary to host official-grade tournaments.
              </p>
              <p>
                By validating the organizers' previous experience and requiring rules compliance documents (PDFs), we ensure that every tournament advertised through our channels is legitimate, properly managed, and completely secure.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                As a normal player, you can use FFM Community TN to stay updated on ongoing community championships, study official community conduct and tournament guidelines, and request dispute mediation via our support desk.
              </p>
              <ul className="space-y-2 list-disc list-inside text-white/90 pl-2">
                <li>Strict fair play and anti-cheat policies</li>
                <li>Direct support ticket escalation to admins</li>
                <li>WhatsApp updates for upcoming tourneys</li>
                <li>Organizer vetting and credibility system</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
