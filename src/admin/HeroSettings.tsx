import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle, Layout, Image as ImageIcon } from 'lucide-react';
import { subscribeToSettings, updateSettings } from '../services/dataService';
import { SiteSettings } from '../types';

export default function HeroSettings() {
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
      setStatus({ type: 'success', message: 'Hero settings updated successfully!' });
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

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-10 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 text-teal-600">
            <Layout size={24} />
            <h2 className="text-xl font-bold">Hero Section Configuration</h2>
          </div>
          <p className="text-slate-500 mt-1">Customize the main landing area of your website.</p>
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

          <div className="grid md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Hero Headline</label>
              <input
                type="text"
                value={settings.heroHeadline}
                onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="e.g. Expert Air Conditioning & Heating Repair Services"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Hero Subtext</label>
              <textarea
                value={settings.heroSubtext}
                onChange={(e) => setSettings({ ...settings, heroSubtext: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 min-h-[100px] transition-colors"
                placeholder="Brief description for the hero section"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Hero Badge Text</label>
              <input
                type="text"
                value={settings.heroBadgeText}
                onChange={(e) => setSettings({ ...settings, heroBadgeText: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="e.g. Expert Heating & Cooling Specialists"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Hero CTA Button Text</label>
              <input
                type="text"
                value={settings.heroCtaText}
                onChange={(e) => setSettings({ ...settings, heroCtaText: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="e.g. Schedule Now"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Hero Image URL</label>
              <div className="space-y-4">
                <input
                  type="text"
                  value={settings.heroImageUrl}
                  onChange={(e) => setSettings({ ...settings, heroImageUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="https://example.com/hero-image.jpg"
                />
                {settings.heroImageUrl && (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-video max-w-md bg-slate-50">
                    <img src={settings.heroImageUrl} alt="Hero preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                      <ImageIcon className="text-white/50" size={48} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Floating Card 1 Text</label>
              <input
                type="text"
                value={settings.heroCard1Text}
                onChange={(e) => setSettings({ ...settings, heroCard1Text: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="e.g. 100% Guaranteed"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Floating Card 2 Text</label>
              <input
                type="text"
                value={settings.heroCard2Text}
                onChange={(e) => setSettings({ ...settings, heroCard2Text: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="e.g. 24/7 Support"
              />
            </div>
          </div>

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
              Save Hero Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
