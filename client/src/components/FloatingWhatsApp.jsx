import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingWhatsApp({ inviteLink = 'https://chat.whatsapp.com/0029VaF7rC1H3PVS8jLzQ72L' }) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds, then auto-hide after 8 seconds
    const showTimer = setTimeout(() => setShowTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 11000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 mr-1 bg-slate-900 border border-green-500/30 text-slate-100 py-2.5 px-4 rounded-xl shadow-2xl max-w-xs text-xs relative glass-panel-glow"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-1 -right-1 p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              <X size={10} />
            </button>
            <p className="font-semibold text-green-400 mb-0.5">💬 FFM Community TN</p>
            <p className="text-slate-300">Join our WhatsApp channel for instant game updates, rules, & custom room matches!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={inviteLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 6 }}
        whileTap={{ scale: 0.9 }}
        className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer border-2 border-white/10 relative"
        aria-label="Join WhatsApp Community"
      >
        <span className="absolute -inset-0.5 rounded-full bg-green-400 opacity-75 animate-ping z-[-1]" />
        <MessageCircle size={24} className="fill-current" />
      </motion.a>
    </div>
  );
}
