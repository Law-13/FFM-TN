import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldAlert, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

export default function Navbar({ whatsappLink }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Rules', path: '/rules' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Event Registration', path: '/register' },
    { name: 'Support', path: '/support' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full glass-nav shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.img
              src={logo}
              alt="FFM Community TN Logo"
              className="h-11 w-11 object-contain rounded-lg border border-esports-cyan/20 group-hover:border-esports-cyan/50 transition-all duration-300"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            />
            <div className="flex flex-col">
              <span className="font-display font-black text-base md:text-lg tracking-wider text-slate-100 uppercase">
                FFM Community <span className="text-esports-cyan">TN</span>
              </span>
              <span className="text-[9px] text-esports-orange tracking-widest font-semibold uppercase -mt-1">
                Free Fire Max Tamil Nadu
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative px-4 py-2 text-sm font-medium tracking-wide text-slate-300 hover:text-slate-100 transition-colors uppercase"
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-esports-cyan to-esports-orange"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Link */}
          <div className="hidden lg:block">
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-xl bg-gradient-to-r from-esports-cyan to-esports-cyan/80 text-slate-950 text-sm font-bold uppercase tracking-wider hover:shadow-cyan-glow transition-all cursor-pointer"
            >
              <Users size={16} />
              <span>Join WhatsApp</span>
            </motion.a>
          </div>

          {/* Mobile Hamburger Menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 bg-slate-900/50 hover:bg-slate-900 border border-white/5 transition-all cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950/95 border-b border-white/5"
          >
            <div className="px-3 pt-2 pb-6 space-y-1.5 sm:px-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium tracking-wide uppercase transition-all ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-esports-cyan/15 to-esports-orange/15 text-esports-cyan border-l-2 border-esports-cyan'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-white/5">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-esports-cyan to-esports-orange hover:from-esports-cyan hover:to-esports-cyan text-slate-950 text-sm font-bold uppercase tracking-wider"
                >
                  <Users size={16} />
                  <span>Join WhatsApp Channel</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
