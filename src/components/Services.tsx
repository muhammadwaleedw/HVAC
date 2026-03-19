import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Service } from '../types';
import { subscribeToCollection } from '../services/dataService';
import { Icon } from './Icon';
import { ArrowRight } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCollection<Service>('services', setServices);
    return () => unsubscribe();
  }, []);

  const defaultServices = [
    { id: '1', title: 'AC Repair & Fix', description: 'Expert diagnostic and repair services for all air conditioning models.', icon: 'Wind', order: 1 },
    { id: '2', title: 'Heater Repair', description: 'Reliable heating system repairs to keep you warm during winter.', icon: 'Flame', order: 2 },
    { id: '3', title: 'New Installation', description: 'Professional installation of energy-efficient HVAC systems.', icon: 'Settings', order: 3 },
    { id: '4', title: 'Regular Tune-Ups', description: 'Preventative maintenance to extend the life of your equipment.', icon: 'Wrench', order: 4 },
    { id: '5', title: 'Air Duct Cleaning', description: 'Improve indoor air quality with thorough duct cleaning services.', icon: 'AirVent', order: 5 },
    { id: '6', title: 'Heat Pump Service', description: 'Specialized maintenance and repair for heat pump systems.', icon: 'Thermometer', order: 6 },
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-teal-600 font-bold uppercase tracking-widest text-xs mb-4">
            <div className="w-8 h-[2px] bg-teal-600" />
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Comprehensive Air Conditioning & Heating Care
          </h2>
          <p className="text-lg text-slate-600">
            From emergency repairs to regular maintenance, we provide a full range of HVAC services to keep your home or business comfortable year-round.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100"
            >
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                <Icon name={service.icon} size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-teal-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {service.description}
              </p>
              <button className="flex items-center gap-2 text-teal-600 font-bold text-sm uppercase tracking-wider group/btn">
                Learn More
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
