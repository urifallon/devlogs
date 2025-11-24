import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CreateLogForm } from './components/CreateLogForm';
import { LogList } from './components/LogList';
import { Search, ChevronDown, Bell } from 'lucide-react';

export type View = 'create' | 'list' | 'settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('list');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">

        {/* Header */}
        <header className="h-20 px-8 flex items-center justify-between bg-[#F8FAFC] sticky top-0 z-10">
          {/* Search Bar */}
          <div className="flex-1 max-w-lg">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search logs..."
                className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block w-full pl-11 p-2.5 transition-all shadow-sm placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-6">
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F8FAFC]"></span>
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-indigo-100 border border-indigo-200 overflow-hidden">
                <img
                  src="https://picsum.photos/100/100"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                <span>User name</span>
                <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 px-8 py-6 overflow-y-auto">
          {currentView === 'create' && (
            <CreateLogForm onSuccess={() => setCurrentView('list')} />
          )}
          {currentView === 'list' && (
            <LogList />
          )}
          {currentView === 'settings' && (
            <div className="flex items-center justify-center h-full text-gray-400">
              Settings page placeholder
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default App;
