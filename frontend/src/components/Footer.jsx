import { NavLink } from 'react-router-dom';
import { MessageCircle, Youtube, Instagram, ShieldAlert } from 'lucide-react';
import { WHATSAPP_CHANNEL_LINK } from '../config';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-brand-card border-t border-brand-border text-gray-400 font-sans mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="FFM Community TN Logo" className="w-10 h-10 object-contain rounded-md" />
              <div>
                <h3 className="font-display text-white font-bold tracking-wider uppercase text-sm">
                  FFM Community TN
                </h3>
                <p className="text-[10px] text-brand-secondary font-semibold uppercase tracking-widest">
                  Tamil Nadu's Free Fire Max Hub
                </p>
              </div>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed max-w-sm">
              The official hub for Free Fire Max tournament organizers, content creators, and players in Tamil Nadu. We regulate, support, and highlight standard community activities across the state.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-white font-semibold uppercase tracking-wider text-xs">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/" className="hover:text-brand-primary transition-colors">Home</NavLink>
              </li>
              <li>
                <NavLink to="/rules" className="hover:text-brand-primary transition-colors">Community Rules</NavLink>
              </li>
              <li>
                <NavLink to="/terms" className="hover:text-brand-primary transition-colors">Terms & Policies</NavLink>
              </li>
              <li>
                <NavLink to="/register" className="hover:text-brand-primary transition-colors">Event Onboarding</NavLink>
              </li>
              <li>
                <NavLink to="/support" className="hover:text-brand-primary transition-colors">Player Support</NavLink>
              </li>
            </ul>
          </div>

          {/* WhatsApp & Social Connection */}
          <div className="space-y-4">
            <h4 className="font-display text-white font-semibold uppercase tracking-wider text-xs">
              Connect With Us
            </h4>
            <div className="flex space-x-3 mb-4">
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-brand-border hover:bg-brand-primary hover:text-white rounded-md transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-brand-border hover:bg-brand-primary hover:text-white rounded-md transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-brand-border hover:bg-brand-primary hover:text-white rounded-md transition-colors"
                aria-label="Discord"
              >
                <ShieldAlert className="w-4 h-4" />
              </a>
            </div>
            
            <a
              href={WHATSAPP_CHANNEL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25d366] text-white font-display text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-md hover:bg-[#20ba5a] transition-all shadow-glow-green w-full"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              WhatsApp Channel
            </a>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-brand-border mt-8 pt-8 text-center text-xs text-brand-muted space-y-2">
          <p className="font-display font-semibold text-white">
            FFM Community TN – Official Tamil Nadu Free Fire Max Community Platform
          </p>
          <p>© {new Date().getFullYear()} FFM Community TN. All rights reserved. This site is a community initiative and is not officially affiliated with Garena.</p>
        </div>
      </div>
    </footer>
  );
}
