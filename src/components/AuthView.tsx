import React from 'react';
import { motion } from 'motion/react';
import { Factory, LogIn, ShieldCheck, Cpu } from 'lucide-react';

interface AuthViewProps {
  onLogin: () => void;
}

export default function AuthView({ onLogin }: AuthViewProps) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-industrial-blue rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-industrial-amber rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-morphism p-8 rounded-3xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-industrial-amber rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-industrial-amber/20">
            <Factory className="w-12 h-12 text-slate-900" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">ProSync Industrial AI</h1>
          <p className="text-slate-500 font-medium">Production Timeline Anticipation Engine</p>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-4">
            <div className="w-10 h-10 bg-blue-100 text-industrial-blue rounded-lg flex items-center justify-center shrink-0">
               <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Secure Access</p>
              <p className="text-xs text-slate-500">ML models protected by enterprise-grade security protocols.</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-4">
            <div className="w-10 h-10 bg-amber-100 text-industrial-amber rounded-lg flex items-center justify-center shrink-0">
               <Cpu className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Advanced Inference</p>
              <p className="text-xs text-slate-500">Real-time predictive analytics for timeline optimization.</p>
            </div>
          </div>

          <button 
            onClick={onLogin}
            className="w-full btn-primary h-14 text-lg font-bold shadow-xl shadow-slate-900/20"
          >
            <LogIn className="w-6 h-6" />
            Sign in with Google
          </button>

          <p className="text-center text-xs text-slate-400">
            Authorized Personnel Only. System activity is logged under industrial compliance standards.
          </p>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 left-0 right-0 text-center opacity-30">
        <p className="text-white text-xs font-mono tracking-widest uppercase italic">Project Submission: ProSync ML v2.4</p>
      </div>
    </div>
  );
}
