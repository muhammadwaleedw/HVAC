import React, { useState, useEffect } from 'react';
import { auth, loginWithGoogle, logout } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Settings, 
  Layout,
  Wrench, 
  Briefcase, 
  MessageSquare, 
  FileText, 
  Image as ImageIcon, 
  MapPin,
  LogOut,
  ChevronLeft,
  Lock
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import SettingsForm from './SettingsForm';
import HeroSettings from './HeroSettings';
import AdminSection from './AdminSection';
import { cn } from '../lib/utils';

export default function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('settings');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = user?.email === "muhammadwaleedw@gmail.com";

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mx-auto mb-8">
            <Lock size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Admin Access</h2>
          <p className="text-slate-600 mb-10 leading-relaxed">
            Please sign in with your authorized Google account to access the dashboard.
          </p>
          <button 
            onClick={loginWithGoogle}
            className="w-full bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-200"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            Sign in with Google
          </button>
          <button 
            onClick={onBack}
            className="mt-6 text-slate-400 font-bold hover:text-slate-600 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <ChevronLeft size={18} />
            Back to Website
          </button>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mx-auto mb-8">
            <Lock size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Access Denied</h2>
          <p className="text-slate-600 mb-10">
            Your account ({user.email}) is not authorized to access this dashboard.
          </p>
          <button 
            onClick={logout}
            className="w-full bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'settings', label: 'Site Settings', icon: Settings },
    { id: 'hero', label: 'Hero Section', icon: Layout },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'blogPosts', label: 'Blog Posts', icon: FileText },
    { id: 'partnerLogos', label: 'Partner Logos', icon: ImageIcon },
    { id: 'locations', label: 'Locations', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar 
        tabs={tabs} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={logout}
        onBack={onBack}
        user={user}
      />
      
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <header className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                {tabs.find(t => t.id === activeTab)?.label}
              </h1>
              <p className="text-slate-500">Manage your website content and configuration.</p>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'settings' && <SettingsForm />}
              {activeTab === 'hero' && <HeroSettings />}
              {activeTab === 'services' && (
                <AdminSection 
                  collectionName="services" 
                  title="Services"
                  fields={[
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'description', label: 'Description', type: 'textarea' },
                    { name: 'icon', label: 'Icon Name (Lucide)', type: 'text' },
                    { name: 'order', label: 'Display Order', type: 'number' },
                  ]}
                />
              )}
              {activeTab === 'projects' && (
                <AdminSection 
                  collectionName="projects" 
                  title="Projects"
                  fields={[
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'category', label: 'Category', type: 'text' },
                    { name: 'imageUrl', label: 'Image URL', type: 'text' },
                    { name: 'order', label: 'Display Order', type: 'number' },
                  ]}
                />
              )}
              {activeTab === 'testimonials' && (
                <AdminSection 
                  collectionName="testimonials" 
                  title="Testimonials"
                  fields={[
                    { name: 'name', label: 'Customer Name', type: 'text' },
                    { name: 'role', label: 'Role/Location', type: 'text' },
                    { name: 'content', label: 'Review Content', type: 'textarea' },
                    { name: 'rating', label: 'Rating (1-5)', type: 'number' },
                    { name: 'imageUrl', label: 'Avatar URL', type: 'text' },
                  ]}
                />
              )}
              {activeTab === 'blogPosts' && (
                <AdminSection 
                  collectionName="blogPosts" 
                  title="Blog Posts"
                  fields={[
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
                    { name: 'content', label: 'Full Content (Markdown)', type: 'textarea' },
                    { name: 'imageUrl', label: 'Featured Image URL', type: 'text' },
                    { name: 'date', label: 'Date', type: 'text' },
                    { name: 'author', label: 'Author', type: 'text' },
                  ]}
                />
              )}
              {activeTab === 'partnerLogos' && (
                <AdminSection 
                  collectionName="partnerLogos" 
                  title="Partner Logos"
                  fields={[
                    { name: 'name', label: 'Partner Name', type: 'text' },
                    { name: 'imageUrl', label: 'Logo URL', type: 'text' },
                    { name: 'order', label: 'Display Order', type: 'number' },
                  ]}
                />
              )}
              {activeTab === 'locations' && (
                <AdminSection 
                  collectionName="locations" 
                  title="Locations"
                  fields={[
                    { name: 'name', label: 'Location Name', type: 'text' },
                    { name: 'lat', label: 'Latitude', type: 'number' },
                    { name: 'lng', label: 'Longitude', type: 'number' },
                  ]}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
