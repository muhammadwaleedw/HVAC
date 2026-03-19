import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Star } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { SiteSettings } from '../types';
import { subscribeToSettings } from '../services/dataService';

export default function Hero() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  
  // Mouse tracking for background effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform mouse position to subtle movement offsets
  const bgX1 = useTransform(smoothX, [-500, 500], [-30, 30]);
  const bgY1 = useTransform(smoothY, [-500, 500], [-30, 30]);
  
  const bgX2 = useTransform(smoothX, [-500, 500], [40, -40]);
  const bgY2 = useTransform(smoothY, [-500, 500], [40, -40]);

  useEffect(() => {
    const unsubscribe = subscribeToSettings(setSettings);
    return () => unsubscribe();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate normalized position from center (-0.5 to 0.5)
    const x = (clientX / innerWidth - 0.5) * 1000;
    const y = (clientY / innerHeight - 0.5) * 1000;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const headline = settings?.heroHeadline || "Expert Air Conditioning & Heating Repair Services";
  const subtext = settings?.heroSubtext || `Professional HVAC solutions for your home and business. Experience convenience, safety, and expert support with ${settings?.siteName || 'Coolin'}.`;
  const ctaText = settings?.heroCtaText || "Schedule Now";
  const badgeText = settings?.heroBadgeText || "Expert Heating & Cooling Specialists";
  const heroImage = settings?.heroImageUrl || "https://picsum.photos/seed/hvac-tech/800/600";
  const card1Text = settings?.heroCard1Text || "100% Guaranteed";
  const card2Text = settings?.heroCard2Text || "24/7 Support";

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950"
    >
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main Gradients with Mouse Interaction */}
        <motion.div 
          style={{ x: bgX1, y: bgY1 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-teal-600/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          style={{ x: bgX2, y: bgY2 }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full" 
        />

        {/* Floating Glow Orbs with Mouse Interaction */}
        <motion.div 
          style={{ x: useTransform(smoothX, [-500, 500], [20, -20]), y: useTransform(smoothY, [-500, 500], [20, -20]) }}
          animate={{ 
            y: [0, -100, 0],
            x: [0, 50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-teal-400/10 blur-[80px] rounded-full"
        />
        <motion.div 
          style={{ x: useTransform(smoothX, [-500, 500], [-50, 50]), y: useTransform(smoothY, [-500, 500], [-50, 50]) }}
          animate={{ 
            y: [0, 120, 0],
            x: [0, -80, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-400/10 blur-[100px] rounded-full"
        />
        
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Star size={14} fill="currentColor" />
              {badgeText}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
              {headline}
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-lg">
              {subtext}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-teal-900/40 transition-all flex items-center justify-center gap-2 group">
                {ctaText}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a 
                href={`tel:${settings?.phone}`}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white font-semibold"
              >
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
                  <Phone size={20} />
                </div>
                <div className="text-left">
                  <div className="text-xs text-white/50 font-medium uppercase tracking-wider">Call Us Now</div>
                  <div className="text-lg font-bold">{settings?.phone || '(629) 555-0129'}</div>
                </div>
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6 text-white/60">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    alt="User" 
                    className="w-10 h-10 rounded-full border-2 border-slate-900"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-yellow-400 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="font-medium text-white">4.9/5</span> from 2,000+ happy customers
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:ml-auto max-w-xl"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 aspect-[4/3]">
              <img 
                src={heroImage} 
                alt={`${settings?.siteName || 'Coolin'} HVAC Technician`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            </div>

            {/* Floating Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 z-20 bg-white p-5 rounded-2xl shadow-2xl hidden sm:block border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Satisfaction</div>
                  <div className="text-base font-bold text-slate-900">{card1Text}</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 z-20 bg-white p-5 rounded-2xl shadow-2xl hidden sm:block border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Available</div>
                  <div className="text-base font-bold text-slate-900">{card2Text}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
