import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { WHATSAPP_CHANNEL_LINK } from '../config';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rules', path: '/rules' },
    { name: 'Terms', path: '/terms' },
    { name: 'Register Event', path: '/register' },
    { name: 'Support', path: '/support' }
  ];

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-brand-border bg-brand-glass backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <NavLink to="/" className="flex items-center space-x-3 group">
            <img 
              src={logo} 
              alt="FFM Community TN Logo" 
              className="w-12 h-12 object-contain rounded-md transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-wider text-white group-hover:text-brand-primary transition-colors">
                FFM COMMUNITY
              </span>
              <span className="text-[10px] font-bold text-brand-secondary tracking-widest uppercase">
                TAMIL NADU
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-display text-sm uppercase tracking-wider font-semibold transition-all duration-200 hover:text-brand-primary ${
                    isActive ? 'text-brand-primary border-b-2 border-brand-primary pb-1' : 'text-gray-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            <a
              href={WHATSAPP_CHANNEL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25d366] text-white font-display text-xs uppercase tracking-wider font-bold px-4 py-2.5 rounded-md hover:bg-[#20ba5a] transition-all shadow-glow-green"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Join WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-brand-border transition-all cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-card border-b border-brand-border py-4 px-6 space-y-4 transition-all duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `font-display text-sm uppercase tracking-wider font-semibold py-2 transition-all block ${
                    isActive ? 'text-brand-primary border-l-4 border-brand-primary pl-2' : 'text-gray-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            <a
              href={WHATSAPP_CHANNEL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#25d366] text-white font-display text-sm uppercase tracking-wider font-bold py-3 rounded-md hover:bg-[#20ba5a] transition-all w-full text-center"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Join WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
