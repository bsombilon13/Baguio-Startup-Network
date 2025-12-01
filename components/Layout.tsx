import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, Megaphone, Plus } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  // Using the new Wix static image logo
  const logoUrl = "https://static.wixstatic.com/media/85ce0b_a34fd67effbb4a4b932c2791821103a3~mv2.png";

  const navItems = [
    { path: '/', icon: Home, label: 'Hub' },
    { path: '/ecosystem', icon: Users, label: 'Ecosystem' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/funding', icon: Megaphone, label: 'Announcements' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-white/80 backdrop-blur-lg border-b border-slate-200 p-4 sticky top-0 z-50 flex justify-between items-center">
        <img src={logoUrl} alt="BSN Logo" className="h-10 w-auto object-contain" />
        <a href="http://m.me/baguiostartup" target="_blank" rel="noopener noreferrer" className="p-2 bg-brand-accent/10 rounded-full text-brand-accent">
           <Plus className="w-5 h-5" />
        </a>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-20 lg:w-64 bg-white border-r border-slate-200 p-6 sticky top-0 h-screen z-40 shadow-sm">
        <div className="mb-10 flex items-center justify-center lg:justify-start">
          {/* Logo - Handle wide aspect ratio */}
          <img src={logoUrl} alt="BSN Logo" className="h-14 w-auto object-contain hidden lg:block" />
          <img src={logoUrl} alt="BSN Logo" className="h-10 w-auto object-contain lg:hidden" /> 
        </div>

        <div className="space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-brand-accent text-white shadow-md font-semibold' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-brand-accent transition-colors'}`} />
                <span className="hidden lg:block">{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        <div className="mt-auto">
             <div className="p-4 bg-gradient-to-br from-brand-accent to-[#4a45a8] rounded-2xl border border-transparent hidden lg:block text-white shadow-lg shadow-brand-accent/20">
                <p className="text-xs text-white/80 mb-2 font-medium">Build your dream</p>
                <button className="w-full py-2 bg-white text-brand-accent rounded-lg font-bold text-sm hover:bg-slate-50 hover:shadow-md transition-all border border-transparent shadow-sm">
                    Join Community
                </button>
             </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-2 z-50 flex justify-around items-center safe-area-pb shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
             <NavLink
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                  isActive ? 'text-brand-accent font-semibold' : 'text-slate-400'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-[10px]">{item.label}</span>
              </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Layout;