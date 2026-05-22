import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, MessageSquare, ShieldAlert, Award } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer({ whatsappLink }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 mt-auto text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={logo}
                alt="FFM Community TN Logo"
                className="h-10 w-10 object-contain rounded-lg border border-esports-cyan/20"
              />
              <div className="flex flex-col">
                <span className="font-display font-black text-slate-100 uppercase tracking-wider text-base">
                  FFM Community <span className="text-esports-cyan">TN</span>
                </span>
                <span className="text-[8px] text-esports-orange tracking-widest font-semibold uppercase -mt-0.5">
                  Free Fire Max Tamil Nadu
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Tamil Nadu's official Free Fire Max community. We foster a competitive environment for organizers, esports teams, and content creators. Verify events, access official rules, and join community rooms.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-red-600 hover:text-white transition-all border border-white/5 cursor-pointer"
                aria-label="YouTube Channel"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-pink-600 hover:text-white transition-all border border-white/5 cursor-pointer"
                aria-label="Instagram Profile"
              >
                <Instagram size={18} />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-green-600 hover:text-white transition-all border border-white/5 cursor-pointer"
                aria-label="WhatsApp Channel"
              >
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="font-display font-bold text-slate-200 uppercase tracking-wider text-sm mb-4">
              Quick Nav
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-esports-cyan transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-esports-cyan transition-colors">Official Rules</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-esports-cyan transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-esports-cyan transition-colors">Event Registration</Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-esports-cyan transition-colors">Support Desk</Link>
              </li>
            </ul>
          </div>

          {/* Security & Responsibility Callout */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-slate-200 uppercase tracking-wider text-sm">
              Trust & Fair Play
            </h3>
            <div className="flex items-start space-x-2 text-xs leading-relaxed bg-slate-900/50 p-3.5 rounded-xl border border-white/5">
              <ShieldAlert className="text-esports-orange shrink-0 mt-0.5" size={16} />
              <span>
                Every tournament undergoes rigorous credibility checks. Violators of the anti-cheat or toxicity agreements face permanent community banishment.
              </span>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center space-x-2 py-2 px-4 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
            >
              <span>Join WhatsApp Group</span>
            </a>
          </div>

        </div>

        {/* Legal Credits */}
        <div className="border-t border-slate-900 mt-12 pt-8 text-center text-xs space-y-2">
          <p className="font-medium text-slate-400">
            FFM Community TN &ndash; Official Tamil Nadu Free Fire Max Community Platform.
          </p>
          <p className="text-slate-600">
            &copy; {new Date().getFullYear()} FFM Community TN. All rights reserved. This platform is an independent gaming community portal.
          </p>
        </div>
      </div>
    </footer>
  );
}
