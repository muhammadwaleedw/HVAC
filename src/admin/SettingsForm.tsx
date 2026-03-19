import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle, Globe, Layout, Phone, Share2, Image as ImageIcon } from 'lucide-react';
import { subscribeToSettings, updateSettings } from '../services/dataService';
import { SiteSettings } from '../types';

type TabType = 'general' | 'contact' | 'social';

export default function SettingsForm() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: '',
    siteDescription: '',
    logoUrl: '',
    heroHeadline: '',
    heroSubtext: '',
    heroCtaText: '',
    heroBadgeText: '',
    heroImageUrl: '',
    heroCard1Text: '',
    heroCard2Text: '',
    phone: '',
    email: '',
    address: '',
    workingHours: '',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    linkedinUrl: ''
  });
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToSettings((data) => {
      if (data) {
        setSettings(prev => ({ ...prev, ...data }));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await updateSettings(settings);
      setStatus({ type: 'success', message: 'Settings updated successfully!' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="py-20 flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin" />
      <p className="text-slate-400 font-medium">Loading settings...</p>
    </div>
  );

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'social', label: 'Social Media', icon: Share2 },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Tabs Header */}
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-8 py-5 text-sm font-bold transition-all relative ${
                activeTab === tab.id 
                  ? 'text-teal-600' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600" />
              )}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10">
          {status && (
            <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
              status.type === 'success' 
                ? 'bg-teal-50 text-teal-600 border border-teal-100' 
                : 'bg-red-50 text-red-600 border border-red-100'
            }`}>
              {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              {status.message}
            </div>
          )}

          {/* General Info */}
          {activeTab === 'general' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Site Name</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="e.g. Coolin HVAC"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Site Description (SEO)</label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 min-h-[100px] transition-colors"
                    placeholder="Brief description for search engines"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Logo URL</label>
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={settings.logoUrl}
                        onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                    {settings.logoUrl && (
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                        <img src={settings.logoUrl} alt="Logo preview" className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Info */}
          {activeTab === 'contact' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="e.g. (629) 555-0129"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="e.g. hello@acool.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Physical Address</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="e.g. 775 Rolling Green Rd."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Working Hours</label>
                  <input
                    type="text"
                    value={settings.workingHours}
                    onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="e.g. Monday - Saturday 08:00 - 20:00"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Links */}
          {activeTab === 'social' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Facebook URL</label>
                  <input
                    type="text"
                    value={settings.facebookUrl}
                    onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Twitter URL</label>
                  <input
                    type="text"
                    value={settings.twitterUrl}
                    onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Instagram URL</label>
                  <input
                    type="text"
                    value={settings.instagramUrl}
                    onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="https://instagram.com/yourprofile"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">LinkedIn URL</label>
                  <input
                    type="text"
                    value={settings.linkedinUrl}
                    onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6 border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="bg-teal-600 text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={20} />
              )}
              Save All Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
