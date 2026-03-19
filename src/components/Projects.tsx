import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { subscribeToCollection } from '../services/dataService';
import { ArrowUpRight } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCollection<Project>('projects', setProjects);
    return () => unsubscribe();
  }, []);

  const defaultProjects = [
    { id: '1', title: '3-Bedroom Home AC Installation', category: 'Residential', imageUrl: 'https://picsum.photos/seed/proj1/800/600', order: 1 },
    { id: '2', title: 'Restaurant Kitchen Ventilation', category: 'Commercial', imageUrl: 'https://picsum.photos/seed/proj2/800/600', order: 2 },
    { id: '3', title: 'Office Building HVAC Upgrade', category: 'Commercial', imageUrl: 'https://picsum.photos/seed/proj3/800/600', order: 3 },
    { id: '4', title: 'Smart Home Climate Control', category: 'Residential', imageUrl: 'https://picsum.photos/seed/proj4/800/600', order: 4 },
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-teal-600 font-bold uppercase tracking-widest text-xs mb-4">
              <div className="w-8 h-[2px] bg-teal-600" />
              Our Projects
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              See Our Professional HVAC Work in Action
            </h2>
          </div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-bold transition-all active:scale-95 whitespace-nowrap">
            View All Projects
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {displayProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg"
            >
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="text-teal-400 font-bold text-xs uppercase tracking-widest mb-2">{project.category}</div>
                <h3 className="text-2xl font-bold text-white mb-6 leading-tight">{project.title}</h3>
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:bg-teal-600 hover:text-white transition-colors">
                  <ArrowUpRight size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
