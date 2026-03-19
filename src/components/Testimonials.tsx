import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Testimonial } from '../types';
import { subscribeToCollection } from '../services/dataService';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToCollection<Testimonial>('testimonials', setTestimonials);
    return () => unsubscribe();
  }, []);

  const defaultTestimonials = [
    { id: '1', name: 'Jerome Bell', role: 'Riverside District', content: 'Michael and his team installed a new Carrier system for us in two days, reducing our energy bills by 35% in the first month. Professional, clean and knowledgeable. Highly recommend.', rating: 5, imageUrl: 'https://picsum.photos/seed/user1/100/100' },
    { id: '2', name: 'Eleanor Pena', role: 'Downtown Area', content: 'Incredible service! Our AC broke down in the middle of a heatwave and they were here within 2 hours. Fixed the issue quickly and at a very fair price.', rating: 5, imageUrl: 'https://picsum.photos/seed/user2/100/100' },
    { id: '3', name: 'Robert Fox', role: 'Oakwood Business Park', content: 'Best HVAC company we have ever used for our office building. Their regular tune-ups have saved us thousands in potential repair costs.', rating: 5, imageUrl: 'https://picsum.photos/seed/user3/100/100' },
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const next = () => setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-teal-600 font-bold uppercase tracking-widest text-xs mb-4">
            <div className="w-8 h-[2px] bg-teal-600" />
            Testimonial
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Success Stories From Happy Homeowners
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  {/* We'll show 3 at a time on desktop, or 1 on mobile */}
                  {displayTestimonials.map((item, idx) => (
                    <div 
                      key={item.id}
                      className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative group hover:bg-teal-50 transition-colors"
                    >
                      <div className="flex items-center gap-1 text-yellow-400 mb-6">
                        {[...Array(item.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                      </div>
                      <p className="text-slate-600 leading-relaxed mb-8 italic">
                        "{item.content}"
                      </p>
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{item.name}</div>
                          <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{item.role}</div>
                        </div>
                      </div>
                      <div className="absolute top-8 right-8 text-teal-100 group-hover:text-teal-200 transition-colors">
                        <Quote size={48} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
