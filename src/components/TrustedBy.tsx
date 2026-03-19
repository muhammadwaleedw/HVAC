import React, { useState, useEffect } from 'react';
import { PartnerLogo } from '../types';
import { subscribeToCollection } from '../services/dataService';
import { motion } from 'motion/react';

export default function TrustedBy() {
  const [logos, setLogos] = useState<PartnerLogo[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCollection<PartnerLogo>('partnerLogos', setLogos);
    return () => unsubscribe();
  }, []);

  const defaultLogos = [
    { id: '1', name: 'LogoIpsum', imageUrl: 'https://picsum.photos/seed/logo1/200/80' },
    { id: '2', name: 'LogoIpsum', imageUrl: 'https://picsum.photos/seed/logo2/200/80' },
    { id: '3', name: 'LogoIpsum', imageUrl: 'https://picsum.photos/seed/logo3/200/80' },
    { id: '4', name: 'LogoIpsum', imageUrl: 'https://picsum.photos/seed/logo4/200/80' },
    { id: '5', name: 'LogoIpsum', imageUrl: 'https://picsum.photos/seed/logo5/200/80' },
  ];

  const displayLogos = logos.length > 0 ? logos : defaultLogos;

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Partnered With</h3>
            <p className="text-slate-900 font-bold text-lg leading-tight">Industry Leading Brands</p>
          </div>
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {displayLogos.map((logo, index) => (
                <motion.div 
                  key={logo.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex justify-center"
                >
                  <img 
                    src={logo.imageUrl} 
                    alt={logo.name} 
                    className="h-8 md:h-10 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
