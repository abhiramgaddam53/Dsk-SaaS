// ReportsKanban.tsx
import React from 'react';
import { MoreVertical, Calendar, Building2, User, FileText, Plus } from 'lucide-react';
import { Report, ReportStatus } from '../../types/types';
import { useRouter } from 'next/navigation';

interface ReportsKanbanProps {
  reports: Report[];
}

const STAGES: ReportStatus[] = [
  'Proposal Flow', 'File Creation', 'Site Visit', 'Documentation', 'Drafting', 'Review', 'Approval', 'Complete', 'Print and dispatch'
];

const getStageStyles = (stage: ReportStatus) => {
  switch (stage) {
    case 'Proposal Flow': return { badge: 'bg-blue-50 text-blue-600', gradient: 'from-white to-blue-50' };
    case 'File Creation': return { badge: 'bg-yellow-50 text-yellow-600', gradient: 'from-white to-yellow-50' };
    case 'Site Visit': return { badge: 'bg-purple-50 text-purple-600', gradient: 'from-white to-purple-50' };
    case 'Documentation': return { badge: 'bg-teal-50 text-teal-600', gradient: 'from-white to-teal-50' };
    default: return { badge: 'bg-gray-100 text-gray-600', gradient: 'from-white to-gray-50' };
  }
};

export default function ReportsKanban({ reports }: ReportsKanbanProps) {
  const router = useRouter();

  return (
    <div className="flex-1 overflow-x-auto pb-6 min-h-[600px]">
      <div className="flex min-w-max h-full">
        {STAGES.map((stage) => {
          const columnReports = reports.filter(r => r.status === stage);
          const styles = getStageStyles(stage);
          
          if (columnReports.length === 0) return null;

          return (
            <div key={stage} className="w-80 flex flex-col shrink-0 border-r border-gray-100 px-4 first:pl-0 last:border-r-0 last:pr-0">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.badge}`}>
                    {stage}
                  </span>
                  <span className="text-gray-400 text-sm">{columnReports.length}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Plus size={18} />
                </button>
              </div>

              {columnReports.length > 0 && (
                 <div className={`p-4 rounded-xl border border-gray-100 mb-4 flex justify-between items-center bg-gradient-to-tr ${styles.gradient}`}>
                    <span className="text-lg font-medium text-gray-800">
                       ₹{columnReports.reduce((acc, r) => acc + r.price, 0).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-blue-500">+17%</span>
                 </div>
              )}

              <div className="flex flex-col gap-4">
                {columnReports.map((report) => (
                  <div 
                    key={report.id} 
                    onClick={() => router.push(`/sa/gen/reports/${report.id}`)}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3 group cursor-pointer hover:border-blue-200 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                           <span className="text-blue-500 text-[10px] font-medium">
                              {report.customerName.charAt(0)}
                           </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${styles.badge}`}>
                          Report Type Goes Here
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <Calendar size={12} />
                        <span>{report.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="mt-1">
                      <h3 className="text-lg font-medium text-gray-800 mb-1">₹{report.price.toLocaleString('en-IN')}</h3>
                      <p className="text-sm text-gray-600">{report.dealName}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <Building2 size={14} className="text-gray-400 shrink-0" />
                      <span className="truncate">{report.company}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}