import React from 'react';
import { User } from 'firebase/auth';
import { LogOut, ChevronLeft, LayoutDashboard } from 'lucide-react';
import { cn } from '../lib/utils';

interface Tab {
  id: string;
  label: string;
  icon: any;
}

export default function AdminSidebar({ 
  tabs, 
  activeTab, 
  setActiveTab, 
  onLogout, 
  onBack,
  user 
}: { 
  tabs: Tab[]; 
  activeTab: string; 
  setActiveTab: (id: string) => void;
  onLogout: () => void;
  onBack: () => void;
  user: User;
}) {
  return (
    <aside className="w-72 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0">
      <div className="p-8 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-teal-200">
            <LayoutDashboard size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Admin Panel
          </span>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
          <img 
            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            alt="User"
          />
          <div className="overflow-hidden">
            <div className="font-bold text-sm text-slate-900 truncate">{user.displayName}</div>
            <div className="text-xs text-slate-500 truncate">{user.email}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all",
              activeTab === tab.id 
                ? "bg-teal-50 text-teal-600 shadow-sm" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <tab.icon size={20} className={activeTab === tab.id ? "text-teal-600" : "text-slate-400"} />
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-2">
        <button 
          onClick={onBack}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
        >
          <ChevronLeft size={20} />
          Back to Website
        </button>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
