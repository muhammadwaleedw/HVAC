import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BlogPost } from '../types';
import { subscribeToCollection } from '../services/dataService';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCollection<BlogPost>('blogPosts', setPosts, 'date');
    return () => unsubscribe();
  }, []);

  const defaultPosts = [
    { id: '1', title: 'The Benefits of Smart Thermostat Technology', excerpt: 'Learn how upgrading to a smart thermostat can save you money and improve comfort.', date: 'August 25, 2025', author: 'Admin', imageUrl: 'https://picsum.photos/seed/blog1/800/600' },
    { id: '2', title: 'How to Lower Your Energy Bills This Summer', excerpt: 'Practical tips to keep your home cool without breaking the bank on electricity.', date: 'August 25, 2025', author: 'Admin', imageUrl: 'https://picsum.photos/seed/blog2/800/600' },
    { id: '3', title: 'The Complete Guide to HVAC Maintenance', excerpt: 'Everything you need to know about keeping your heating and cooling system in top shape.', date: 'August 25, 2025', author: 'Admin', imageUrl: 'https://picsum.photos/seed/blog3/800/600' },
  ];

  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-teal-600 font-bold uppercase tracking-widest text-xs mb-4">
            <div className="w-8 h-[2px] bg-teal-600" />
            Our Blog
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Stay Informed With Our HVAC Blog
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    {post.author}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-teal-600 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-600 mb-8 line-clamp-2">
                  {post.excerpt}
                </p>
                <button className="flex items-center gap-2 text-teal-600 font-bold text-sm uppercase tracking-wider group/btn">
                  Read More
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
