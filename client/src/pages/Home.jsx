import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Trophy, Users, Tv, Play, ArrowRight, Zap, Award } from 'lucide-react';

export default function Home({ whatsappLink }) {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // High performance Canvas spark particle animation representing Free Fire fires
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const colors = ['#ff5e00', '#00f0ff', '#f59e0b', '#0ea5e9'];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.7 + 0.3;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.opacity -= this.fadeSpeed;

        if (this.opacity <= 0) {
          this.y = height + Math.random() * 50;
          this.x = Math.random() * width;
          this.opacity = Math.random() * 0.7 + 0.3;
          this.size = Math.random() * 3 + 1;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      const particleCount = Math.min(Math.floor(width / 15), 80);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-45"
      />

      {/* Radiant Background Overlays */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-esports-cyan/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-esports-orange/5 blur-3xl pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Tag Alert */}
          <div className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-esports-card border border-esports-cyan/25 text-xs text-esports-cyan tracking-wider font-semibold uppercase">
            <Zap size={12} className="animate-bounce" />
            <span>Tamil Nadu's Official Hub</span>
          </div>

          {/* Title */}
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-tight">
            Tamil Nadu’s Official<br/>
            <span className="bg-gradient-to-r from-esports-cyan via-amber-400 to-esports-orange bg-clip-text text-transparent filter drop-shadow-[0_2px_15px_rgba(0,240,255,0.2)]">
              Free Fire Max
            </span><br/>
            Community Platform
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Uniting professional tournament organizers, YouTubers, guild clans, and players across Tamil Nadu. Build your legacy, verify your events, and dominate the local esports arena.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto text-center py-4 px-8 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-slate-950 font-bold uppercase tracking-wider rounded-2xl shadow-xl shadow-green-500/10 cursor-pointer text-sm"
            >
              Join WhatsApp Community
            </motion.a>

            <motion.button
              onClick={() => navigate('/register')}
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto py-4 px-8 bg-esports-card hover:bg-slate-800 text-esports-cyan font-bold uppercase tracking-wider rounded-2xl border border-esports-cyan/30 shadow-xl cursor-pointer text-sm flex items-center justify-center space-x-2"
            >
              <span>Register Your Event</span>
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Highlight/Introduction Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Card Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-2.5 text-esports-orange font-bold uppercase tracking-wider text-sm">
              <Award size={18} className="animate-spin-slow" />
              <span>Esports Credibility</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-100 uppercase leading-snug">
              Uniting Tamil Nadu’s Competitive Ecosystem
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We empower tournament organizers, players, and content creators with centralized infrastructure. Our custom verification onboarding prevents fraudulent events and supports tournament credibility through previous achievements, legal-style liability agreements, and WhatsApp community reach.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-esports-cyan mt-2" />
                <span className="text-xs text-slate-300 font-medium">Anti-Cheat verified integrations</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-esports-orange mt-2" />
                <span className="text-xs text-slate-300 font-medium">Active creator verification</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-esports-cyan mt-2" />
                <span className="text-xs text-slate-300 font-medium">Verified prize pool disbursements</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-esports-orange mt-2" />
                <span className="text-xs text-slate-300 font-medium">Official local clan matchups</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Graphic Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-esports-orange/10 rounded-full blur-2xl group-hover:bg-esports-orange/20 transition-all" />
            <h3 className="font-display font-extrabold text-slate-100 uppercase tracking-wide text-lg border-b border-white/5 pb-3">
              Official Platform Rules Snapshot
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-300 uppercase tracking-wide">1. Zero Tolerance Hack Policy</span>
                <span className="text-[10px] bg-red-500/10 text-red-400 font-bold px-2 py-0.5 rounded-full uppercase border border-red-500/20">Permanent Ban</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-300 uppercase tracking-wide">2. Organizer Accountability</span>
                <span className="text-[10px] bg-esports-orange/10 text-esports-orange font-bold px-2 py-0.5 rounded-full uppercase border border-esports-orange/20">Verified Info</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-300 uppercase tracking-wide">3. Fair Play Conduct</span>
                <span className="text-[10px] bg-esports-cyan/10 text-esports-cyan font-bold px-2 py-0.5 rounded-full uppercase border border-esports-cyan/20">Esports Code</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/rules')}
              className="w-full py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold uppercase text-xs tracking-wider rounded-xl cursor-pointer transition-colors border border-white/5 flex items-center justify-center space-x-2"
            >
              <span>Read Full Rulebook</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
