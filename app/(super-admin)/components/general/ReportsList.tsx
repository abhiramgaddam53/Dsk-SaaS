// // ReportsList.tsx
// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { MoreVertical, Handshake, Banknote, FileText, User, Calendar, ChevronDown, Edit2, UserPlus, AlertCircle, Trash2, Info } from 'lucide-react';
// import { Report, ReportStatus } from '../../types/types';
// import AssignReportModal from './AssignReportModal'; 

// interface ReportsListProps {
//   reports: Report[];
//   onStatusChange: (id: string, status: ReportStatus) => void;
// }

// const REPORT_STATUSES: ReportStatus[] = [
//   'Proposal Flow', 'File Creation', 'Site Visit', 'Documentation', 'Drafting', 
//   'Review', 'Approval', 'Complete', 'Print and dispatch'
// ];

// const getStatusStyles = (status: ReportStatus) => {
//   switch (status) {
//     case 'Proposal Flow': return 'bg-blue-50 text-blue-600 border-blue-200';
//     case 'File Creation': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
//     case 'Site Visit': return 'bg-purple-50 text-purple-600 border-purple-200';
//     case 'Documentation': return 'bg-teal-50 text-teal-600 border-teal-200';
//     case 'Complete': return 'bg-green-50 text-green-600 border-green-200';
//     default: return 'bg-gray-50 text-gray-600 border-gray-200';
//   }
// };

// export default function ReportsList({ reports, onStatusChange }: ReportsListProps) {
//   const router = useRouter();
//   const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  
//   // State for Assign Modal
//   const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
//   const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

//   // Safe row click handler that ignores clicks on buttons, selects, inputs, or menus
//   const handleRowClick = (e: React.MouseEvent, id: string) => {
//     const target = e.target as HTMLElement;
//     if (
//       target.closest('button') || 
//       target.closest('select') || 
//       target.closest('input') || 
//       target.closest('.action-menu') ||
//       target.closest('.menu-overlay')
//     ) {
//       return;
//     }
//     // Note: This will throw a 404 until you create the /sa/reports/[id]/page.tsx file!
//     router.push(`/sa/gen/reports/${id}`);
//   };

//   const handleAssignClick = (e: React.MouseEvent, id: string) => {
//     e.stopPropagation();
//     setSelectedReportId(id);
//     setIsAssignModalOpen(true);
//     setOpenMenuId(null); 
//   };

//   return (
//     <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white min-h-[400px]">
//       <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
//         <thead className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-200">
//           <tr>
//             <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><Handshake size={14} className="text-gray-400" /><span>Report ID</span></div></th>
//             <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><Banknote size={14} className="text-gray-400" /><span>Customer Name</span></div></th>
//             <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><FileText size={14} className="text-gray-400" /><span>Document Type</span></div></th>
//             <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><User size={14} className="text-gray-400" /><span>Assigned to</span></div></th>
//             <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><Calendar size={14} className="text-gray-400" /><span>Last Updated</span></div></th>
//             <th className="px-6 py-4 font-medium">Status</th>
//             <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><Calendar size={14} className="text-gray-400" /><span>Deadline</span></div></th>
//             <th className="px-4 py-4 font-medium text-right"></th>
//           </tr>
//         </thead>
//         <tbody>
//           {reports.map((report) => (
//             <tr 
//               key={report.id} 
//               onClick={(e) => handleRowClick(e, report.id)}
//               className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer relative"
//             >
//               <td className="px-6 py-4">
//                 <div className="flex items-center gap-3">
//                   <input type="checkbox" className="rounded border-gray-300 cursor-default" onClick={(e) => e.stopPropagation()} />
//                   <span className="text-gray-700">{report.reportId}</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 text-gray-700">{report.customerName}</td>
//               <td className="px-6 py-4 text-gray-600">{report.documentType}</td>
//               <td className="px-6 py-4 text-gray-600">{report.assignedTo}</td>
//               <td className="px-6 py-4 text-gray-600">{report.lastUpdated}</td>
//               <td className="px-6 py-4">
//                 <div className="relative inline-block w-40">
//                   <select
//                     value={report.status}
//                     onClick={(e) => e.stopPropagation()}
//                     onChange={(e) => {
//                       e.stopPropagation();
//                       onStatusChange(report.id, e.target.value as ReportStatus);
//                     }}
//                     className={`appearance-none w-full px-3 py-1.5 pr-8 text-xs font-medium border rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${getStatusStyles(report.status)}`}
//                   >
//                     {REPORT_STATUSES.map(status => (
//                       <option key={status} value={status} className="bg-white text-gray-900 font-medium">
//                         {status}
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
//                 </div>
//               </td>
//               <td className="px-6 py-4 text-gray-600">{report.deadline}</td>
//               <td className="px-4 py-4 text-right relative">
//                 <button 
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setOpenMenuId(openMenuId === report.id ? null : report.id);
//                   }}
//                   className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-100 transition-colors"
//                 >
//                   <MoreVertical size={16} />
//                 </button>
                
//                 {openMenuId === report.id && (
//                   <>
//                     {/* Invisible overlay to catch outside clicks and close the menu reliably */}
//                     <div 
//                       className="menu-overlay fixed inset-0 z-40" 
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setOpenMenuId(null);
//                       }} 
//                     />
                    
//                     {/* Actual Menu */}
//                     <div 
//                       className="action-menu absolute right-8 top-10 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 text-left"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <button className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
//                         <Edit2 size={16} /> Edit Report
//                       </button>
//                       <button 
//                         onClick={(e) => handleAssignClick(e, report.id)}
//                         className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 pb-3 mb-1"
//                       >
//                         <UserPlus size={16} /> Assign Report
//                       </button>
//                       <button className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
//                         <AlertCircle size={16} /> Hold Report
//                       </button>
//                       <button className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors border-b border-gray-100 pb-3 mb-1">
//                         <Trash2 size={16} /> Delete Report
//                       </button>
//                       <button className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
//                         <Info size={16} /> Learn about reports and documents
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
      
//       <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-white">
//         <div className="flex items-center gap-4 text-sm text-gray-500">
//           <div className="flex items-center gap-2">
//             <span>Show</span>
//             <select 
//               className="border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer" 
//               onClick={(e) => e.stopPropagation()}
//             >
//               <option>10</option>
//               <option>20</option>
//               <option>50</option>
//             </select>
//           </div>
//           <span>1 to {reports.length} of {reports.length} results</span>
//         </div>
//       </div>

//       {/* Assign Modal */}
//       <AssignReportModal 
//         isOpen={isAssignModalOpen} 
//         onClose={() => setIsAssignModalOpen(false)} 
//         reportId={selectedReportId} 
//       />
//     </div>
//   );
// }

// ReportsList.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoreVertical, Handshake, Banknote, FileText, User, Calendar, ChevronDown, Edit2, UserPlus, AlertCircle, Trash2, Info } from 'lucide-react';
import { Report } from '../../types/types';
import AssignReportModal from './AssignReportModal'; 

interface ReportsListProps {
  reports: Report[];
  onStatusChange: (id: string, status: string) => void;
}

// 🟢 FIX: Updated to match your exact Database status strings
const REPORT_STATUSES = [
  'drafting', 
  'pending_approval', 
  'revision_requested', 
  'approved'
];

// 🟢 FIX: Updated styles to match the new DB statuses
const getStatusStyles = (status: string) => {
  switch (status) {
    case 'drafting': 
      return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'pending_approval': 
      return 'bg-yellow-50 text-yellow-600 border-yellow-200';
    case 'revision_requested': 
      return 'bg-red-50 text-red-600 border-red-200';
    case 'approved': 
      return 'bg-green-50 text-green-600 border-green-200';
    default: 
      return 'bg-gray-50 text-gray-600 border-gray-200';
  }
};

// Helper to make "pending_approval" look like "Pending Approval"
const formatStatusLabel = (status: string) => {
  if (!status) return 'Unknown';
  return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};

export default function ReportsList({ reports, onStatusChange }: ReportsListProps) {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  
  // State for Assign Modal
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  // Safe row click handler that ignores clicks on buttons, selects, inputs, or menus
  const handleRowClick = (e: React.MouseEvent, id: string) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('button') || 
      target.closest('select') || 
      target.closest('input') || 
      target.closest('.action-menu') ||
      target.closest('.menu-overlay')
    ) {
      return;
    }
    // Note: Ensure this route matches your Validator / Super Admin editor page path!
    router.push(`/sa/gen/reports/${id}`);
  };

  const handleAssignClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedReportId(id);
    setIsAssignModalOpen(true);
    setOpenMenuId(null); 
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white min-h-[400px]">
      <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
        <thead className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><Handshake size={14} className="text-gray-400" /><span>Report ID</span></div></th>
            <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><Banknote size={14} className="text-gray-400" /><span>Customer Name</span></div></th>
            <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><FileText size={14} className="text-gray-400" /><span>Document Type</span></div></th>
            <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><User size={14} className="text-gray-400" /><span>Assigned to</span></div></th>
            <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><Calendar size={14} className="text-gray-400" /><span>Last Updated</span></div></th>
            <th className="px-6 py-4 font-medium">Status</th>
            {/* <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><Calendar size={14} className="text-gray-400" /><span>Deadline</span></div></th> */}
            <th className="px-4 py-4 font-medium text-right"></th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr 
              key={report.id} 
              onClick={(e) => handleRowClick(e, report.id)}
              className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer relative"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded border-gray-300 cursor-default" onClick={(e) => e.stopPropagation()} />
                  <span className="text-gray-700">{report.reportId}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-700">{report.customerName}</td>
              <td className="px-6 py-4 text-gray-600">{report.documentType}</td>
              <td className="px-6 py-4 text-gray-600">{report.assignedTo}</td>
              <td className="px-6 py-4 text-gray-600">{report.lastUpdated}</td>
              <td className="px-6 py-4">
                <div className="relative inline-block w-40">
                  <select
                    value={report.status || 'drafting'}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.stopPropagation();
                      onStatusChange(report.id, e.target.value);
                    }}
                    className={`appearance-none w-full px-3 py-1.5 pr-8 text-xs font-medium border rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${getStatusStyles(report.status)}`}
                  >
                    {REPORT_STATUSES.map(status => (
                      <option key={status} value={status} className="bg-white text-gray-900 font-medium">
                        {formatStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                </div>
              </td>
              {/* <td className="px-6 py-4 text-gray-600">{report.deadline}</td> */}
              <td className="px-4 py-4 text-right relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === report.id ? null : report.id);
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical size={16} />
                </button>
                
                {openMenuId === report.id && (
                  <>
                    {/* Invisible overlay to catch outside clicks and close the menu reliably */}
                    <div 
                      className="menu-overlay fixed inset-0 z-40" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(null);
                      }} 
                    />
                    
                    {/* Actual Menu */}
                    <div 
                      className="action-menu absolute right-8 top-10 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Edit2 size={16} /> Edit Report
                      </button>
                      <button 
                        onClick={(e) => handleAssignClick(e, report.id)}
                        className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 pb-3 mb-1"
                      >
                        <UserPlus size={16} /> Assign Report
                      </button>
                      <button className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                        <AlertCircle size={16} /> Hold Report
                      </button>
                      <button className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors border-b border-gray-100 pb-3 mb-1">
                        <Trash2 size={16} /> Delete Report
                      </button>
                      <button className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                        <Info size={16} /> Learn about reports and documents
                      </button>
                    </div>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select 
              className="border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer" 
              onClick={(e) => e.stopPropagation()}
            >
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <span>1 to {reports.length} of {reports.length} results</span>
        </div>
      </div>

      {/* Assign Modal */}
      <AssignReportModal 
        isOpen={isAssignModalOpen} 
        onClose={() => setIsAssignModalOpen(false)} 
        reportId={selectedReportId} 
      />
    </div>
  );
}