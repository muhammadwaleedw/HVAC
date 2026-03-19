import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShieldCheck, Clock, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { SiteSettings } from '../types';
import { subscribeToSettings } from '../services/dataService';

export default function About() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToSettings(setSettings);
    return () => unsubscribe();
  }, []);

  const highlights = [
    { icon: <Clock className="text-teal-600" />, title: "24/7 Available", text: "Round-the-clock emergency services for your peace of mind." },
    { icon: <ShieldCheck className="text-teal-600" />, title: "Licensed & Insured", text: "Professional technicians you can trust with your home." },
    { icon: <Award className="text-teal-600" />, title: "Expert Support", text: "Years of experience in handling complex HVAC systems." },
    { icon: <CheckCircle2 className="text-teal-600" />, title: "Free Estimates", text: "Transparent pricing with no hidden costs or surprises." },
  ];

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/about-hvac/800/1000" 
                alt={settings?.siteName || "Professional HVAC Expert"} 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-10 -right-10 z-20 bg-teal-600 text-white p-8 rounded-3xl shadow-2xl hidden md:block">
              <div className="text-5xl font-bold mb-1">15+</div>
              <div className="text-sm font-semibold uppercase tracking-widest opacity-80">Years of<br />Experience</div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-100 rounded-full -z-10 blur-3xl opacity-50" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-teal-600 font-bold uppercase tracking-widest text-xs mb-4">
              <div className="w-8 h-[2px] bg-teal-600" />
              About {settings?.siteName || 'Us'}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-8">
              Professional HVAC Experts You Can Depend On
            </h2>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              We are a team of dedicated professionals committed to providing top-notch heating, ventilation, and air conditioning services. Our mission is to ensure your indoor comfort throughout the year with efficient, reliable, and affordable solutions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {highlights.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-teal-50 transition-colors group">
                  <div className="mt-1 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-snug">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Experience Convenience, Safety, and Expert Support</h3>
                <p className="text-white/70 mb-6">Our technicians are trained to handle all major brands and models with precision and care.</p>
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95">
                  Learn More About {settings?.siteName || 'Us'}
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
