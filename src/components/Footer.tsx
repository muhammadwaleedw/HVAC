import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { SiteSettings } from '../types';
import { subscribeToSettings } from '../services/dataService';

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToSettings(setSettings);
    return () => unsubscribe();
  }, []);

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              {settings?.logoUrl ? (
                <img src={settings.logoUrl} alt={settings.siteName} className="h-10 w-auto object-contain" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-teal-900/40">
                  <span className="font-bold text-xl">{settings?.siteName?.charAt(0) || 'C'}</span>
                </div>
              )}
              <span className="font-bold text-xl tracking-tight text-white">
                {settings?.siteName || 'Coolin'}
              </span>
            </div>
            <p className="text-white/60 mb-8 leading-relaxed">
              {settings?.siteDescription || 'Professional AC & HVAC services with 24/7 support and certified technicians. Your comfort is our priority.'}
            </p>
            <div className="flex items-center gap-4">
              {settings?.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all">
                  <Facebook size={18} />
                </a>
              )}
              {settings?.twitterUrl && (
                <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all">
                  <Twitter size={18} />
                </a>
              )}
              {settings?.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all">
                  <Instagram size={18} />
                </a>
              )}
              {settings?.linkedinUrl && (
                <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all">
                  <Linkedin size={18} />
                </a>
              )}
              {!settings?.facebookUrl && !settings?.twitterUrl && !settings?.instagramUrl && !settings?.linkedinUrl && (
                [Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all">
                    <Icon size={18} />
                  </a>
                ))
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Pricing', 'Projects'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-teal-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Support</h4>
            <ul className="space-y-4">
              {['FAQ', 'Service Areas', 'Blog', 'Emergency Support', 'Get a Free Estimate'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-teal-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Newsletter</h4>
            <p className="text-white/60 mb-6 leading-relaxed">
              Subscribe to our newsletter for tips and exclusive offers.
            </p>
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-500 transition-colors"
              />
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-teal-900/40">
                Get Started
              </button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 py-12 border-y border-white/10 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400">
              <Mail size={20} />
            </div>
            <div>
              <div className="text-xs text-white/40 font-bold uppercase tracking-widest">Email</div>
              <div className="font-bold">{settings?.email || 'hello@acool.com'}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400">
              <Phone size={20} />
            </div>
            <div>
              <div className="text-xs text-white/40 font-bold uppercase tracking-widest">Phone</div>
              <div className="font-bold">{settings?.phone || '(310) 123-44567'}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400">
              <MapPin size={20} />
            </div>
            <div>
              <div className="text-xs text-white/40 font-bold uppercase tracking-widest">Office Address</div>
              <div className="font-bold">{settings?.address || '775 Rolling Green Rd.'}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400">
              <Clock size={20} />
            </div>
            <div>
              <div className="text-xs text-white/40 font-bold uppercase tracking-widest">Monday - Saturday</div>
              <div className="font-bold">{settings?.workingHours || '08:00 - 20:00'}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} {settings?.siteName || 'Coolin'}. All Rights Reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
