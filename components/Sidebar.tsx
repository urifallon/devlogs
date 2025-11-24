import React from 'react';
import { LayoutDashboard, FileText, Folder, Settings, Search, PlusCircle, Bug } from 'lucide-react';
import { View } from '../App';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const navItemClass = (view: View) => `
    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group cursor-pointer
    ${currentView === view
      ? 'bg-orange-50 text-orange-600 font-medium'
      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
  `;

  const iconClass = (view: View) => `
    transition-colors
    ${currentView === view ? 'text-orange-500' : 'group-hover:text-orange-500'}
  `;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 z-10">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
          <Bug size={20} />
        </div>
        <div>
          <h1 className="font-bold text-gray-900 text-lg leading-tight">DevLog</h1>
          <p className="text-xs text-gray-500 font-medium">Error Dashboard</p>
        </div>
      </div>

      {/* Primary Action */}
      <div className="px-6 mb-6">
        <button
          onClick={() => onNavigate('create')}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <PlusCircle size={20} />
          New Log Entry
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <div onClick={() => onNavigate('list')} className={navItemClass('list')}>
          <Search size={20} className={iconClass('list')} />
          <span className="font-medium">Log Explorer</span>
        </div>

        {/* Placeholder links */}
        <div className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors group cursor-pointer">
          <Folder size={20} className="group-hover:text-orange-500 transition-colors" />
          <span className="font-medium">Projects</span>
        </div>

        <div onClick={() => onNavigate('settings')} className={navItemClass('settings')}>
          <Settings size={20} className={iconClass('settings')} />
          <span className="font-medium">Settings</span>
        </div>
      </nav>

      {/* Bottom info */}
      <div className="p-6 border-t border-gray-100">
        <div className="bg-orange-50 p-4 rounded-xl">
          <p className="text-xs text-orange-800 font-semibold mb-1">Pro Tip</p>
          <p className="text-xs text-orange-600/80 leading-relaxed">
            Logs are saved locally to your project folder.
          </p>
        </div>
      </div>
    </aside>
  );
};
