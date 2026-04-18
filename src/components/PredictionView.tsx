import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCcw,
  ArrowRight,
  Cpu,
  Flame,
  Gauge,
  Factory,
  Settings
} from 'lucide-react';
import { predictProductionOutcome, PredictionInput, PredictionResult } from '../lib/gemini';
import { cn, formatDuration } from '../lib/utils';

export default function PredictionView() {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<PredictionResult | null>(null);
  
  const [formData, setFormData] = React.useState<PredictionInput>({
    machineId: 'M01',
    operationType: 'Grinding',
    materialUsed: 50,
    energyConsumption: 120,
    machineAvailability: 95,
    plannedTime: 60
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const outcome = await predictProductionOutcome(formData);
    
    // Artificial delay to feel like "calculating"
    setTimeout(() => {
      setResult(outcome);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-5">
        <div className="industrial-card p-6 h-full">
          <div className="flex items-center gap-2 mb-6 text-slate-800">
            <Settings className="w-5 h-5 text-industrial-blue" />
            <h2 className="text-lg font-bold">Line Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Machine</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-industrial-blue outline-none"
                  value={formData.machineId}
                  onChange={e => setFormData({...formData, machineId: e.target.value})}
                >
                  {['M01', 'M02', 'M03', 'M04', 'M05'].map(id => (
                    <option key={id} value={id}>{id}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Operation</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-industrial-blue outline-none"
                  value={formData.operationType}
                  onChange={e => setFormData({...formData, operationType: e.target.value})}
                >
                  {['Grinding', 'Additive', 'Lathe', 'Milling', 'Drilling'].map(op => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Material Used (kg)</label>
                <span className="text-xs font-mono text-industrial-blue font-bold">{formData.materialUsed} kg</span>
              </div>
              <input 
                type="range" min="1" max="500" 
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-industrial-blue"
                value={formData.materialUsed}
                onChange={e => setFormData({...formData, materialUsed: parseInt(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Energy Consumption</label>
                <span className="text-xs font-mono text-industrial-blue font-bold">{formData.energyConsumption} kWh</span>
              </div>
              <input 
                type="range" min="10" max="1000" 
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-industrial-blue"
                value={formData.energyConsumption}
                onChange={e => setFormData({...formData, energyConsumption: parseInt(e.target.value)})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Availability</label>
                <div className="relative">
                  <input 
                    type="number" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm focus:ring-2 focus:ring-industrial-blue outline-none"
                    value={formData.machineAvailability}
                    onChange={e => setFormData({...formData, machineAvailability: parseInt(e.target.value)})}
                  />
                  <span className="absolute right-3 top-2 text-slate-400 text-xs">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Planned Time</label>
                <div className="relative">
                  <input 
                    type="number" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm focus:ring-2 focus:ring-industrial-blue outline-none"
                    value={formData.plannedTime}
                    onChange={e => setFormData({...formData, plannedTime: parseInt(e.target.value)})}
                  />
                  <span className="absolute right-3 top-2 text-slate-400 text-xs text-[10px]">MINS</span>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary h-12 mt-4 text-base disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCcw className="w-5 h-5 animate-spin" />
                  Analyzing Production Line...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-industrial-amber fill-industrial-amber" />
                  Anticipate Timeline
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-7">
        <div className="relative h-full min-h-[400px]">
          <AnimatePresence mode="wait">
            {!loading && !result && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-xl"
              >
                <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                  <Factory className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Ready for Analysis</h3>
                <p className="text-slate-500 max-w-xs mx-auto">
                  Enter the production details on the left and click "Anticipate Timeline" to get ML-powered insights.
                </p>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="h-full industrial-card flex flex-col items-center justify-center gap-8 p-12 overflow-hidden"
              >
                 <div className="relative w-32 h-32">
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-slate-100 border-t-industrial-blue rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Cpu className="w-12 h-12 text-industrial-blue animate-pulse" />
                    </div>
                 </div>
                 <div className="space-y-4 text-center">
                   <h3 className="text-xl font-bold text-slate-800">ML Engine Processing</h3>
                   <div className="flex gap-2 justify-center">
                     {[0, 1, 2].map(i => (
                       <motion.div 
                         key={i}
                         animate={{ opacity: [0.3, 1, 0.3] }}
                         transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                         className="w-2 h-2 bg-industrial-blue rounded-full"
                       />
                     ))}
                   </div>
                 </div>
              </motion.div>
            )}

            {result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className={cn(
                  "industrial-card overflow-hidden border-t-4",
                  result.delayRisk === 'LOW' ? "border-t-industrial-emerald" : "border-t-red-500"
                )}>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Prediction Result</span>
                          <span className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold rounded text-slate-600">CONFIDENCE: {Math.round(result.confidence * 100)}%</span>
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
                          {result.delayRisk === 'Low Risk' ? 'ON SCHEDULE' : 'DELAY ALERT'}
                        </h2>
                      </div>
                      
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center",
                        result.delayRisk === 'Low Risk' ? "bg-industrial-emerald/10 text-industrial-emerald" : "bg-red-500/10 text-red-500"
                      )}>
                        {result.delayRisk === 'Low Risk' ? (
                          <CheckCircle2 className="w-10 h-10" />
                        ) : (
                          <AlertTriangle className="w-10 h-10" />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-wider">Est. Duration</span>
                        </div>
                        <p className="text-2xl font-bold font-mono text-slate-800">{formatDuration(result.processingTime)}</p>
                      </div>
                      <div className="space-y-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-1.5 text-slate-500">
                          <Activity className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-wider">Timeline Risk</span>
                        </div>
                        <p className={cn(
                          "text-2xl font-bold",
                          result.delayRisk === 'Low Risk' ? "text-industrial-emerald" : "text-red-500"
                        )}>
                          {result.delayRisk}
                        </p>
                      </div>
                      <div className="space-y-1 col-span-2 md:col-span-1">
                         <div className="flex items-center justify-center md:justify-start gap-1.5 text-slate-500">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-wider">Line Health</span>
                        </div>
                        <p className="text-xl font-bold text-slate-800 truncate">
                          {result.delayRisk === 'Low Risk' ? 'Stable' : 'Unstable'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge className="w-4 h-4 text-industrial-blue" />
                        <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Optimization Category</span>
                      </div>
                      <p className="text-lg font-bold text-slate-900 tracking-tight">
                        {result.optimizationCategory}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">ML Reason Analysis</span>
                      </div>
                      <div className="space-y-3">
                        <p className="text-slate-700 leading-relaxed font-medium">
                          {result.delayReason}
                        </p>
                        
                        {(result.delayReason.toLowerCase().includes('availability') || result.delayReason.toLowerCase().includes('maintain')) && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-100/50">
                            <Gauge className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-bold text-amber-700">Actual Availability: {formData.machineAvailability}%</span>
                          </div>
                        )}
                        
                        {(result.delayReason.toLowerCase().includes('energy') || result.delayReason.toLowerCase().includes('power') || result.delayReason.toLowerCase().includes('strain')) && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100/50">
                            <Flame className="w-4 h-4 text-industrial-blue" />
                            <span className="text-xs font-bold text-industrial-blue">Detected Energy: {formData.energyConsumption} units</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="industrial-card p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-industrial-blue rounded-lg flex items-center justify-center">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Load Density</p>
                      <p className="text-lg font-bold">{(formData.energyConsumption / formData.plannedTime).toFixed(1)} <span className="text-xs font-normal opacity-50">kW/m</span></p>
                    </div>
                  </div>
                  <div className="industrial-card p-4 flex items-center gap-4">
                     <div className="w-10 h-10 bg-amber-50 text-industrial-amber rounded-lg flex items-center justify-center">
                      <Gauge className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Util Rate</p>
                      <p className="text-lg font-bold">{formData.machineAvailability}%</p>
                    </div>
                  </div>
                  <div className="industrial-card p-4 flex items-center gap-4">
                     <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Predict Gap</p>
                      <p className="text-lg font-bold">+{Math.round(result.processingTime - formData.plannedTime)} <span className="text-xs font-normal opacity-50">MINS</span></p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

