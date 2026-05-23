import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Component imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollProgress from './components/ScrollProgress';

// Pages imports
import Home from './pages/Home';
import Rules from './pages/Rules';
import Terms from './pages/Terms';
import EventRegistration from './pages/EventRegistration';
import Support from './pages/Support';

// Assets
import logo from './assets/logo.png';

export default function App() {
  const [loading, setLoading] = useState(true);

  // Editable configuration links
  const WHATSAPP_CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbCoU6s1CYoRjeXGvA2y';

  useEffect(() => {
    // 1.5 seconds premium loading screen overlay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading ? (
          /* Premium Loading Screen */
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-[#070913] flex flex-col items-center justify-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: [0.7, 1.1, 1], opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              <img
                src={logo}
                alt="FFM Community TN Loading..."
                className="h-28 w-28 object-contain rounded-2xl border-2 border-esports-cyan shadow-cyan-glow relative z-10 animate-float"
              />
              <div className="absolute inset-0 bg-esports-cyan/20 blur-2xl rounded-full scale-125 z-0" />
            </motion.div>

            <div className="text-center space-y-2">
              <h2 className="font-display font-black text-xl tracking-wider text-slate-100 uppercase">
                FFM Community <span className="text-esports-cyan">TN</span>
              </h2>
              <p className="text-[10px] text-esports-orange tracking-widest font-bold uppercase">
                Free Fire Max Tamil Nadu
              </p>
            </div>

            {/* Micro loader progress bar */}
            <div className="w-48 h-1 bg-slate-900 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-esports-cyan to-esports-orange"
              />
            </div>
          </motion.div>
        ) : (
          /* Core Platform Layout */
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col min-h-screen relative z-10"
          >
            {/* Global Utility Progress Tracker & Back-to-Top button */}
            <ScrollProgress />

            {/* Global sticky Navbar */}
            <Navbar whatsappLink={WHATSAPP_CHANNEL_LINK} />

            {/* Platform Pages */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home whatsappLink={WHATSAPP_CHANNEL_LINK} />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/register" element={<EventRegistration />} />
                <Route path="/support" element={<Support whatsappLink={WHATSAPP_CHANNEL_LINK} />} />
              </Routes>
            </main>

            {/* Global WhatsApp Hover Badge */}
            <FloatingWhatsApp inviteLink={WHATSAPP_CHANNEL_LINK} />

            {/* Global Footer */}
            <Footer whatsappLink={WHATSAPP_CHANNEL_LINK} />
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}
