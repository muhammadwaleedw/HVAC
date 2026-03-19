import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SiteSettings } from '../types';
import { subscribeToSettings } from '../services/dataService';
import { cn } from '../lib/utils';

export default function Header({ onAdminClick }: { onAdminClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToSettings(setSettings);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {settings?.logoUrl ? (
              <img src={settings.logoUrl} alt={settings.siteName} className="h-10 w-auto object-contain" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-teal-200">
                <span className="font-bold text-xl">{settings?.siteName?.charAt(0) || 'C'}</span>
              </div>
            )}
            <span className={cn("font-bold text-xl tracking-tight", scrolled ? "text-slate-900" : "text-white")}>
              {settings?.siteName || 'Coolin'}
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-teal-600",
                  scrolled ? "text-slate-600" : "text-white/90"
                )}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href={`tel:${settings?.phone}`}
              className={cn(
                "flex items-center gap-2 text-sm font-semibold",
                scrolled ? "text-teal-600" : "text-white"
              )}
            >
              <Phone size={16} />
              {settings?.phone || '(629) 555-0129'}
            </a>
            <button 
              onClick={onAdminClick}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
              title="Admin Dashboard"
            >
              <User size={20} />
            </button>
            <button className="bg-teal-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-teal-200 hover:bg-teal-700 transition-all active:scale-95">
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} className={scrolled ? "text-slate-900" : "text-white"} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-600 font-medium hover:text-teal-600"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-slate-100" />
              <div className="flex flex-col gap-4">
                <a href={`tel:${settings?.phone}`} className="flex items-center gap-2 text-teal-600 font-semibold">
                  <Phone size={18} />
                  {settings?.phone || '(629) 555-0129'}
                </a>
                <button className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-teal-200">
                  Get Started
                </button>
                <button 
                  onClick={() => { onAdminClick(); setIsOpen(false); }}
                  className="flex items-center gap-2 text-slate-600 font-medium"
                >
                  <User size={18} />
                  Admin Dashboard
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
