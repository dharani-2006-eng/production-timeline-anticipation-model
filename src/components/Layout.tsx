import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Settings, 
  History, 
  Factory, 
  LogOut, 
  Menu, 
  X,
  Bell,
  User
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
  handleLogout: () => void;
}

export default function Layout({ children, activeTab, setActiveTab, user, handleLogout }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'prediction', name: 'Predictive Analysis', icon: Factory },
    { id: 'history', name: 'Production Logs', icon: History },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white h-screen sticky top-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-industrial-amber rounded-lg flex items-center justify-center font-bold text-slate-900 text-xl">
            F
          </div>
          <span className="text-xl font-bold tracking-tight">ForgeAI</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeTab === item.id 
                  ? "bg-industrial-blue text-white" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
               {user?.photoURL ? (
                 <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
               ) : (
                 <User className="w-5 h-5 text-slate-400" />
               )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.displayName || 'Operator'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email || 'System User'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-industrial-amber rounded-md flex items-center justify-center font-bold text-slate-900">
            F
          </div>
          <span className="font-bold tracking-tight">ForgeAI</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden fixed inset-0 z-40 bg-slate-900 pt-20"
        >
          <nav className="p-6 space-y-4">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium",
                  activeTab === item.id 
                    ? "bg-industrial-blue text-white" 
                    : "text-slate-400"
                )}
              >
                <item.icon className="w-6 h-6" />
                {item.name}
              </button>
            ))}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium text-red-400"
            >
              <LogOut className="w-6 h-6" />
              Logout
            </button>
          </nav>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                {navigation.find(n => n.id === activeTab)?.name}
              </h1>
              <p className="text-slate-500">
                Manufacturing Line Monitoring & Anticipation
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 bg-white rounded-lg border border-slate-200 text-slate-600 hover:text-industrial-blue relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 bg-industrial-blue rounded-full"></div>
                Backend Online
              </div>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-industrial-emerald/10 text-industrial-emerald rounded-full text-xs font-bold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 bg-industrial-emerald rounded-full animate-pulse"></div>
                System Live
              </div>
            </div>
          </header>

          {children}
        </div>
      </main>
    </div>
  );
}
