/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutDashboard, Factory, History, Settings, ShieldAlert, Cpu } from 'lucide-react';
import Layout from './components/Layout';
import DashboardView from './components/DashboardView';
import PredictionView from './components/PredictionView';
import HistoryView from './components/HistoryView';
import AuthView from './components/AuthView';

// Mock User for Prototype
const MOCK_USER = {
  displayName: "Dharani Reddy",
  email: "tera.dharanireddy@gmail.com",
  photoURL: "https://picsum.photos/seed/operator/200"
};

export default function App() {
  const [user, setUser] = React.useState<any>(null);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [isInitializing, setIsInitializing] = React.useState(true);

  // Auto-login for demo purposes if needed, 
  // but let's keep the login screen for the "Advanced UI" experience
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1000);
    document.title = "ForgeAI | Advanced Manufacturing System";
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setUser(MOCK_USER);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 text-white">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-industrial-blue rounded-full animate-rotate mb-6"></div>
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold tracking-tight">ForgeAI Manufacturing System</h2>
          <p className="text-slate-500 text-sm font-mono animate-pulse">Initializing Custom Inference Engine...</p>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-rotate { animation: rotate 1s linear infinite; }
        `}} />
      </div>
    );
  }

  if (!user) {
    return <AuthView onLogin={handleLogin} />;
  }

  return (
    <Layout 
      user={user} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      handleLogout={handleLogout}
    >
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'prediction' && <PredictionView />}
      {activeTab === 'history' && <HistoryView />}
      {activeTab === 'settings' && (
        <div className="industrial-card p-12 text-center max-w-2xl mx-auto mt-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <Settings className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">System Preferences</h2>
          <p className="text-slate-500 mb-8">
            Configure industrial thresholds, custom logic sensitivity, and real-time data sync intervals.
          </p>
          <div className="space-y-4 text-left max-w-md mx-auto">
             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
               <span className="text-sm font-bold text-slate-700">Auto-Report Delays</span>
               <div className="w-10 h-6 bg-industrial-blue rounded-full relative">
                 <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
               </div>
             </div>
             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 opacity-50">
               <span className="text-sm font-bold text-slate-700">Edge Computing Sync</span>
               <div className="w-10 h-6 bg-slate-300 rounded-full relative">
                 <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
               </div>
             </div>
          </div>
          <button className="btn-secondary mt-8 w-full max-w-md">Update System Configuration</button>
        </div>
      )}
    </Layout>
  );
}
