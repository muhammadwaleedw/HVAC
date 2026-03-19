import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { subscribeToAbout, updateAbout } from '../services/dataService';
import { AboutSection } from '../types';

const DEFAULT_ABOUT: AboutSection = {
  title: 'About Us',
  subtitle: 'Professional HVAC Experts You Can Depend On',
  description: 'We are a team of dedicated professionals committed to providing top-notch heating, ventilation, and air conditioning services. Our mission is to ensure your indoor comfort throughout the year with efficient, reliable, and affordable solutions.',
  videoUrl: 'https://videos.pexels.com/video-files/12542931/12542931-uhd_2160_3840_25fps.mp4',
  videoPoster: 'https://images.pexels.com/photos/12542931/pexels-photo-12542931.jpeg?auto=compress&cs=tinysrgb&w=800',
  experienceYears: 15,
  experienceLabel: 'Years of Experience',
  highlights: [
    { icon: 'Clock', title: "24/7 Available", text: "Round-the-clock emergency services for your peace of mind." },
    { icon: 'ShieldCheck', title: "Licensed & Insured", text: "Professional technicians you can trust with your home." },
    { icon: 'Award', title: "Expert Support", text: "Years of experience in handling complex HVAC systems." },
    { icon: 'CheckCircle2', title: "Free Estimates", text: "Transparent pricing with no hidden costs or surprises." },
  ]
};

export default function AboutForm() {
  const [about, setAbout] = useState<AboutSection>(DEFAULT_ABOUT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAbout((data) => {
      if (data) {
        setAbout(data);
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
      await updateAbout(about);
      setStatus({ type: 'success', message: 'About section updated successfully!' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const addHighlight = () => {
    setAbout({
      ...about,
      highlights: [...about.highlights, { icon: 'CheckCircle2', title: '', text: '' }]
    });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = [...about.highlights];
    newHighlights.splice(index, 1);
    setAbout({ ...about, highlights: newHighlights });
  };

  const updateHighlight = (index: number, field: string, value: string) => {
    const newHighlights = [...about.highlights];
    (newHighlights[index] as any)[field] = value;
    setAbout({ ...about, highlights: newHighlights });
  };

  if (loading) return <div className="py-20 text-center text-slate-400">Loading about section...</div>;

  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
      <form onSubmit={handleSubmit} className="space-y-8">
        {status && (
          <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-teal-50 text-teal-600 border border-teal-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {status.message}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Section Title</label>
            <input
              type="text"
              value={about.title}
              onChange={(e) => setAbout({ ...about, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
              placeholder="e.g. About Us"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Subtitle</label>
            <input
              type="text"
              value={about.subtitle}
              onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
              placeholder="Main headline for the section"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Description</label>
            <textarea
              value={about.description}
              onChange={(e) => setAbout({ ...about, description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 min-h-[120px] transition-colors"
              placeholder="Main content for the about section"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Video URL (MP4)</label>
            <input
              type="text"
              value={about.videoUrl}
              onChange={(e) => setAbout({ ...about, videoUrl: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
              placeholder="Direct link to MP4 video"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Video Poster URL</label>
            <input
              type="text"
              value={about.videoPoster}
              onChange={(e) => setAbout({ ...about, videoPoster: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
              placeholder="Image to show while video loads"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Experience Years</label>
            <input
              type="number"
              value={about.experienceYears}
              onChange={(e) => setAbout({ ...about, experienceYears: parseInt(e.target.value) || 0 })}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Experience Label</label>
            <input
              type="text"
              value={about.experienceLabel}
              onChange={(e) => setAbout({ ...about, experienceLabel: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
              placeholder="e.g. Years of Experience"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Highlights</h3>
            <button
              type="button"
              onClick={addHighlight}
              className="flex items-center gap-2 text-teal-600 font-bold hover:text-teal-700 transition-colors"
            >
              <Plus size={18} />
              Add Highlight
            </button>
          </div>

          <div className="grid gap-6">
            {about.highlights.map((item, index) => (
              <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Icon (Lucide Name)</label>
                    <input
                      type="text"
                      value={item.icon}
                      onChange={(e) => updateHighlight(index, 'icon', e.target.value)}
                      className="w-full bg-white border border-slate-100 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 transition-colors"
                      placeholder="e.g. Clock"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateHighlight(index, 'title', e.target.value)}
                      className="w-full bg-white border border-slate-100 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 transition-colors"
                      placeholder="Highlight title"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Text</label>
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => updateHighlight(index, 'text', e.target.value)}
                      className="w-full bg-white border border-slate-100 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 transition-colors"
                      placeholder="Highlight description"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={saving}
            className="bg-teal-600 text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save size={20} />
            )}
            Save About Section
          </button>
        </div>
      </form>
    </div>
  );
}
