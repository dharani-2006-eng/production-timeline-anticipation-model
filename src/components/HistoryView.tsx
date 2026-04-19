import React from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  History as HistoryIcon,
  Activity
} from 'lucide-react';
import { format } from 'date-fns';
import { cn, formatDuration } from '../lib/utils';

const initialLogs = [
  { id: 'LOG-4210', date: new Date(), machine: 'M01', op: 'Milling', result: 'ON SCHEDULE', time: 65, risk: 'Low Risk' },
  { id: 'LOG-4209', date: new Date(Date.now() - 3600000), machine: 'M04', op: 'Drilling', result: 'DELAY ALERT', time: 88, risk: 'High Risk' },
  { id: 'LOG-4208', date: new Date(Date.now() - 7200000), machine: 'M02', op: 'Lathe', result: 'ON SCHEDULE', time: 120, risk: 'Low Risk' },
  { id: 'LOG-4207', date: new Date(Date.now() - 10800000), machine: 'M01', op: 'Milling', result: 'ON SCHEDULE', time: 62, risk: 'Low Risk' },
  { id: 'LOG-4206', date: new Date(Date.now() - 14400000), machine: 'M05', op: 'Drilling', result: 'DELAY ALERT', time: 75, risk: 'High Risk' },
  { id: 'LOG-4205', date: new Date(Date.now() - 18000000), machine: 'M03', op: 'Grinding', result: 'ON SCHEDULE', time: 115, risk: 'Low Risk' },
];

export default function HistoryView() {
  const [logs, setLogs] = React.useState(initialLogs);
  const [isExportingCsv, setIsExportingCsv] = React.useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = React.useState(false);
  const [lastSync, setLastSync] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      // Logic for simulating a new log entry every minute
      const nextIdNum = parseInt(logs[0].id.split('-')[1]) + 1;
      const newLog = {
        id: `LOG-${nextIdNum}`,
        date: new Date(),
        machine: ['M01', 'M02', 'M03', 'M04', 'M05'][Math.floor(Math.random() * 5)],
        op: ['Milling', 'Drilling', 'Lathe', 'Grinding', 'Additive'][Math.floor(Math.random() * 5)],
        result: Math.random() > 0.8 ? 'DELAY ALERT' : 'ON SCHEDULE' as "DELAY ALERT" | "ON SCHEDULE",
        time: Math.floor(Math.random() * 60) + 40,
        risk: (Math.random() > 0.8 ? 'High Risk' : 'Low Risk') as "Low Risk" | "High Risk"
      };
      
      setLogs(prev => [newLog, ...prev].slice(0, 50)); 
      setLastSync(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, [logs]);

  const handleExportCsv = () => {
    setIsExportingCsv(true);
    setTimeout(() => {
      setIsExportingCsv(false);
      alert('CSV Data Exported successfully to your local drive.');
    }, 1500);
  };

  const handleGeneratePdf = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      setIsGeneratingPdf(false);
      alert('Production Summary PDF generated! Ready for download.');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-industrial-emerald/5 px-2.5 py-1 rounded-full border border-industrial-emerald/10">
          <div className="w-1.5 h-1.5 bg-industrial-emerald rounded-full animate-pulse"></div>
          <span className="text-[9px] font-black text-industrial-emerald uppercase tracking-widest">Live Feed Active</span>
          <span className="text-[9px] text-slate-400 font-mono ml-1">Synced @ {lastSync.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Top Stats for History */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="industrial-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
            <HistoryIcon className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Entries</p>
            <p className="text-xl font-black text-slate-900 leading-none">{logs.length}</p>
          </div>
        </div>
        <div className="industrial-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">High Risk</p>
            <p className="text-xl font-black text-red-600 leading-none">
              {logs.filter(l => l.risk === 'High Risk').length}
            </p>
          </div>
        </div>
        <div className="industrial-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-industrial-blue" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg. Time</p>
            <p className="text-xl font-black text-slate-900 leading-none">
              {Math.round(logs.reduce((acc, l) => acc + l.time, 0) / logs.length)}m
            </p>
          </div>
        </div>
        <div className="industrial-card p-4 flex items-center gap-4 border-l-4 border-l-industrial-emerald">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-industrial-emerald" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Line Success</p>
            <p className="text-xl font-black text-industrial-emerald leading-none">
              {Math.round((logs.filter(l => l.risk === 'Low Risk').length / logs.length) * 100)}%
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search logs by ID, machine, or operation..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-industrial-blue"
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none btn-secondary border-none bg-slate-100">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button 
            onClick={handleExportCsv}
            disabled={isExportingCsv}
            className={cn(
              "flex-1 md:flex-none btn-secondary",
              isExportingCsv && "opacity-50"
            )}
          >
            {isExportingCsv ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Export CSV
          </button>
        </div>
      </div>

      <div className="industrial-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Log ID</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Unit Info</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Risk Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Scheduled Time</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-slate-900">{log.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">{format(log.date, 'MMM dd, yyyy')}</span>
                      <span className="text-xs text-slate-400">{format(log.date, 'HH:mm:ss')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{log.machine}</span>
                      <span className="text-xs text-slate-500">{log.op}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-tight",
                      log.risk === 'Low Risk' 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-red-100 text-red-700"
                    )}>
                      {log.risk === 'Low Risk' ? 'On Schedule' : 'Delay Risk'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-700 font-mono">{formatDuration(log.time)}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-slate-400 hover:text-industrial-blue">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-industrial-blue">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
           <p className="text-xs font-medium text-slate-500">
             Live Stream: <span className="text-slate-900 font-bold">{logs.length}</span> active entries in current session buffer
           </p>
           <div className="flex gap-2">
             <button className="p-1 rounded bg-white border border-slate-200 text-slate-400 hover:text-slate-900 disabled:opacity-30">
                <ChevronLeft className="w-4 h-4" />
             </button>
             <button className="p-1 rounded bg-white border border-slate-200 text-slate-400 hover:text-slate-900">
                <ChevronRight className="w-4 h-4" />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheck(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>;
}
