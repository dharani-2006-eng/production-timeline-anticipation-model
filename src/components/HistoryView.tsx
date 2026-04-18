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
} from 'lucide-react';
import { format } from 'date-fns';
import { cn, formatDuration } from '../lib/utils';

const mockLogs = [
  { id: 'LOG-4210', date: new Date(), machine: 'M01', op: 'Milling', result: 'ON SCHEDULE', time: 65, risk: 'Low Risk' },
  { id: 'LOG-4209', date: new Date(Date.now() - 3600000), machine: 'M04', op: 'Drilling', result: 'DELAY ALERT', time: 88, risk: 'High Risk' },
  { id: 'LOG-4208', date: new Date(Date.now() - 7200000), machine: 'M02', op: 'Lathe', result: 'ON SCHEDULE', time: 120, risk: 'Low Risk' },
  { id: 'LOG-4207', date: new Date(Date.now() - 10800000), machine: 'M01', op: 'Milling', result: 'ON SCHEDULE', time: 62, risk: 'Low Risk' },
  { id: 'LOG-4206', date: new Date(Date.now() - 14400000), machine: 'M05', op: 'Drilling', result: 'DELAY ALERT', time: 75, risk: 'High Risk' },
  { id: 'LOG-4205', date: new Date(Date.now() - 18000000), machine: 'M03', op: 'Grinding', result: 'ON SCHEDULE', time: 115, risk: 'Low Risk' },
];

export default function HistoryView() {
  const [isExportingCsv, setIsExportingCsv] = React.useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = React.useState(false);

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
              {mockLogs.map((log) => (
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
                      log.risk === 'LOW' 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-red-100 text-red-700"
                    )}>
                      {log.risk === 'LOW' ? 'On Schedule' : 'Delay Risk'}
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
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
           <p className="text-xs font-medium text-slate-500">
             Showing <span className="text-slate-900 font-bold">1-6</span> of <span className="text-slate-900 font-bold">42</span> entries
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-xl font-bold mb-4">Export Performance Report</h4>
            <p className="text-slate-400 text-sm mb-6 max-w-sm">
              Generate a comprehensive PDF documentation of all AI predictions and actual production logs for the current quarter.
            </p>
            <button 
              onClick={handleGeneratePdf}
              disabled={isGeneratingPdf}
              className="btn-primary bg-industrial-blue hover:bg-blue-600 border-none disabled:opacity-50"
            >
              {isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isGeneratingPdf ? 'Processing...' : 'Generate Summary PDF'}
            </button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-industrial-blue/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        </div>
        
        <div className="industrial-card p-8 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-xl font-bold mb-4 text-slate-900">Machine Log Consistency</h4>
            <p className="text-slate-500 text-sm mb-6 max-w-sm">
              Recent logs indicate a 98.4% data consistency across all active units. No missing attributes detected in the last 24h.
            </p>
            <div className="flex items-center gap-2 text-industrial-emerald">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Health Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheck(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>;
}
