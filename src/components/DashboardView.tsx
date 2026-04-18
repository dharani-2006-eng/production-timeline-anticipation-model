import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  AlertOctagon, 
  CheckCircle, 
  ArrowUpRight,
  Zap,
  Box,
  Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

const weeklyData = [
  { day: 'Mon', planned: 400, actual: 420, delays: 2 },
  { day: 'Tue', planned: 300, actual: 350, delays: 5 },
  { day: 'Wed', planned: 500, actual: 510, delays: 1 },
  { day: 'Thu', planned: 280, actual: 270, delays: 0 },
  { day: 'Fri', planned: 590, actual: 650, delays: 8 },
  { day: 'Sat', planned: 400, actual: 405, delays: 1 },
];

const machineEfficiency = [
  { name: 'M01', value: 92, status: 'stable' },
  { name: 'M02', value: 85, status: 'warning' },
  { name: 'M03', value: 98, status: 'stable' },
  { name: 'M04', value: 72, status: 'critical' },
  { name: 'M05', value: 89, status: 'stable' },
];

const delayReasons = [
  { name: 'Maintenance', value: 45, color: '#3b82f6' },
  { name: 'Energy Surge', value: 25, color: '#f59e0b' },
  { name: 'Material Shortage', value: 20, color: '#10b981' },
  { name: 'Human Factor', value: 10, color: '#6366f1' },
];

export default function DashboardView() {
  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Avg. Processing Time" 
          value="42.5m" 
          trend="+5.2%" 
          trendUp={false} 
          icon={Clock}
          color="blue"
        />
        <StatCard 
          title="Daily Delay Risk" 
          value="12%" 
          trend="-2.1%" 
          trendUp={true} 
          icon={AlertOctagon}
          color="amber"
        />
        <StatCard 
          title="Units Produced" 
          value="1,284" 
          trend="+18.4%" 
          trendUp={true} 
          icon={Box}
          color="emerald"
        />
        <StatCard 
          title="System Confidence" 
          value="94.2%" 
          trend="+0.6%" 
          trendUp={true} 
          icon={CheckCircle}
          color="indigo"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-8 industrial-card p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-sans">Production Efficiency Line</h3>
              <p className="text-sm text-slate-500">Planned vs Actual operational time (minutes)</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-industrial-blue"></div>
                <span className="text-xs font-bold text-slate-500 uppercase">Planned</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <span className="text-xs font-bold text-slate-500 uppercase">Actual</span>
              </div>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="planned" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorPlanned)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Chart */}
        <div className="lg:col-span-4 industrial-card p-6">
           <h3 className="text-lg font-bold text-slate-900 mb-2">Delay Attribution</h3>
           <p className="text-sm text-slate-500 mb-8">Primary factors for timeline deviation</p>
           
           <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={delayReasons}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {delayReasons.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-3xl font-black text-slate-900 tracking-tighter">84</span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Audit Total</span>
              </div>
           </div>

           <div className="mt-6 space-y-3">
              {delayReasons.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="industrial-card p-6">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-bold text-slate-900">Machine Health Monitor</h3>
               <button className="text-xs font-bold text-industrial-blue hover:underline">Full Diagnostic</button>
            </div>
            <div className="space-y-6">
               {machineEfficiency.map((machine) => (
                 <div key={machine.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-700">{machine.name}</span>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            machine.status === 'stable' ? "bg-emerald-100 text-emerald-600" :
                            machine.status === 'warning' ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600"
                          )}>
                            {machine.status}
                          </span>
                       </div>
                       <span className="text-sm font-mono font-bold text-slate-500">{machine.value}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${machine.value}%` }}
                         transition={{ duration: 1, ease: "easeOut" }}
                         className={cn(
                           "h-full rounded-full",
                           machine.status === 'stable' ? "bg-industrial-emerald" :
                           machine.status === 'warning' ? "bg-industrial-amber" : "bg-red-500"
                         )}
                       />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="industrial-card p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Live Schedule Status</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                     <Zap className={cn("w-5 h-5", i === 2 ? "text-red-500" : "text-industrial-blue")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">
                      {i === 2 ? "Potential Delay Detected" : "On Track - Optimizing"}
                    </p>
                    <p className="text-xs text-slate-500">Machine M-0{i+2} • Entry #042{i}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-slate-400">{i*5}m ago</p>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-industrial-blue transition-all">
               View Full History
            </button>
         </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon: Icon, color }: any) {
  const colorMap: any = {
    blue: "text-industrial-blue bg-blue-50",
    amber: "text-industrial-amber bg-amber-50",
    emerald: "text-industrial-emerald bg-emerald-50",
    indigo: "text-indigo-600 bg-indigo-50"
  };

  return (
    <div className="industrial-card p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colorMap[color])}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
          trendUp ? "text-emerald-600 bg-emerald-50" : "text-red-500 bg-red-50"
        )}>
          {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <p className="text-3xl font-black text-slate-900 tracking-tighter">{value}</p>
      </div>
    </div>
  );
}
