import React from 'react';
import { ShieldCheck, DollarSign, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

export default function Features() {
  const benefits = [
    { icon: <ShieldCheck size={32} />, title: "Licensed Technicians", text: "Our team consists of fully certified and background-checked experts." },
    { icon: <DollarSign size={32} />, title: "Transparent Pricing", text: "Upfront quotes with no hidden fees. We value your trust." },
    { icon: <HeartHandshake size={32} />, title: "100% Satisfaction", text: "We're not happy until you are. Guaranteed quality service." },
  ];

  return (
    <section className="py-24 bg-white">
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
                src="https://picsum.photos/seed/happy-customer/800/1000" 
                alt="Happy Customer" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -left-8 z-20 bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-100 hidden md:flex">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white">
                <HeartHandshake size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">450+</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Trusted Partners</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-teal-600 font-bold uppercase tracking-widest text-xs mb-4">
              <div className="w-8 h-[2px] bg-teal-600" />
              Why Choose Us
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-8">
              Quality Service That Speaks for Itself
            </h2>
            
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              We understand that HVAC issues can be stressful. That's why we've built our reputation on reliability, expertise, and exceptional customer care.
            </p>

            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all group"
                >
                  <div className="w-16 h-16 shrink-0 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{benefit.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
