import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import About from './components/About';
import Services from './components/Services';
import Features from './components/Features';
import Projects from './components/Projects';
import Map from './components/Map';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Blog from './components/Blog';
import Footer from './components/Footer';
import AdminDashboard from './admin/AdminDashboard';
import { motion, AnimatePresence } from 'motion/react';
import { subscribeToSettings } from './services/dataService';
import { SiteSettings } from './types';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToSettings(setSettings);
    return () => unsubscribe();
  }, []);

  // Update document title and meta description
  useEffect(() => {
    if (settings) {
      document.title = settings.siteName || 'Coolin HVAC Services';
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', settings.siteDescription || 'Professional HVAC services with 24/7 support.');
    }
  }, [settings]);

  // Scroll to top when switching modes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isAdminMode]);

  return (
    <div className="min-h-screen font-sans selection:bg-teal-100 selection:text-teal-900">
      <AnimatePresence mode="wait">
        {isAdminMode ? (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AdminDashboard onBack={() => setIsAdminMode(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="website"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Header onAdminClick={() => setIsAdminMode(true)} />
            <main>
              <Hero />
              <TrustedBy />
              <About />
              <Services />
              <Features />
              <Projects />
              <Map />
              <Testimonials />
              <CTA />
              <Blog />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
