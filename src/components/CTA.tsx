import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SiteSettings } from '../types';
import { subscribeToSettings } from '../services/dataService';

export default function CTA() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToSettings(setSettings);
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/hvac-bg/1920/1080" 
          alt="HVAC Background" 
          className="w-full h-full object-cover brightness-[0.3]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-teal-900/40 mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Get Started With Professional HVAC Care
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Don't wait for a breakdown. Schedule your professional maintenance or repair service today and ensure your comfort all year round with {settings?.siteName || 'Coolin'}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-2xl shadow-teal-900/50 transition-all flex items-center justify-center gap-2 group">
                Get Started
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href={`mailto:${settings?.email}`}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-xl font-bold text-lg transition-all flex items-center justify-center"
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
