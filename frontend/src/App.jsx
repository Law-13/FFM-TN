import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import FloatingWhatsApp from './components/FloatingWhatsApp';

import Home from './pages/Home';
import Rules from './pages/Rules';
import Terms from './pages/Terms';
import EventRegistration from './pages/EventRegistration';
import Support from './pages/Support';

import logo from './assets/logo.png';

// Scroll to top on navigation change helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief application initial loading screen for branding
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (appLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-bg text-white">
        <div className="relative flex flex-col items-center space-y-6">
          {/* Animated pulsing outer rings */}
          <div className="absolute w-32 h-32 rounded-full border-2 border-brand-primary/20 animate-ping duration-1000" />
          <div className="absolute w-32 h-32 rounded-full border border-brand-secondary/40 animate-pulse duration-700" />
          
          <img 
            src={logo} 
            alt="FFM Community TN logo" 
            className="w-24 h-24 object-contain rounded-lg animate-bounce z-10 shadow-glow-red"
          />
          
          <div className="text-center">
            <h1 className="font-display font-black text-xl tracking-widest text-glow-red">
              FFM COMMUNITY TN
            </h1>
            <p className="text-[10px] text-brand-muted uppercase tracking-widest mt-1">
              Loading Official Esports Platform
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <ScrollProgress />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        {/* Main content grows to push footer down */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/register" element={<EventRegistration />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </main>

        <Footer />
      </div>
      <BackToTop />
      <FloatingWhatsApp />
    </Router>
  );
}
