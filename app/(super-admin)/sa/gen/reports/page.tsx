 
// "use client";

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Plus, Filter, Download, MoreVertical, Loader2, AlertCircle } from 'lucide-react';
// import ReportsKanban from '@/app/(super-admin)/components/general/ReportsKanban';
// import ReportsList from '@/app/(super-admin)/components/general/ReportsList';
// import { ReportStatus } from '@/app/(super-admin)/types/types';
// import { api } from '@/app/lib/userApis';

// export default function ReportsPage() {
//   const router = useRouter();
//   const [viewType, setViewType] = useState<'list' | 'kanban'>('list');
//   const [reports, setReports] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch real data from the Valuator API
//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const data = await api.getValuatorRecords();
//         setReports(data);
//       } catch (error) {
//         console.error("Failed to fetch reports:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchReports();
//   }, []);

//   // Handler for list-view status changes
//   const handleStatusChange = (id: string, newStatus: ReportStatus) => {
//     setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-white px-4 md:px-8 py-6 w-full overflow-x-hidden">
//       <div className="flex items-center justify-between mb-6 shrink-0">
//         <div>
//           <h1 className="text-2xl font-medium text-gray-800">Reports</h1>
//           <p className="text-sm text-gray-500 mt-1">Valuator Approval Dashboard</p>
//         </div>
//       </div>

//       {/* Loading & Empty States */}
//       {isLoading ? (
//         <div className="flex items-center justify-center h-64">
//           <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//         </div>
//       ) : reports.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-64 text-gray-400">
//           <AlertCircle size={48} className="mb-2 opacity-50" />
//           <p>No reports currently pending approval.</p>
//         </div>
//       ) : (
//         <>
//           <div className="flex flex-col sm:flex-row items-center justify-between mb-6 border-b border-gray-200 shrink-0 gap-4">
//             <div className="flex items-center gap-8 w-full sm:w-auto overflow-x-auto scrollbar-hide">
//               <button onClick={() => setViewType('list')} className={`text-sm font-medium pb-3 border-b-2 transition-colors ${viewType === 'list' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>List View</button>
//               <button onClick={() => setViewType('kanban')} className={`text-sm font-medium pb-3 border-b-2 transition-colors ${viewType === 'kanban' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>Kanban</button>
//             </div>
//           </div>

//           <div className="w-full min-w-0 flex-1">
//             {viewType === 'list' ? (
//               <ReportsList reports={reports} onStatusChange={handleStatusChange} />
//             ) : (
//               <ReportsKanban reports={reports} />
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Filter, Download, MoreVertical, Loader2, AlertCircle } from 'lucide-react';
import ReportsKanban from '@/app/(super-admin)/components/general/ReportsKanban';
import ReportsList from '@/app/(super-admin)/components/general/ReportsList';
import { ReportStatus } from '@/app/(super-admin)/types/types';
import { api } from '@/app/lib/userApis';

export default function ReportsPage() {
  const router = useRouter();
  const [viewType, setViewType] = useState<'list' | 'kanban'>('list');
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real data from the Valuator API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await api.getValuatorRecords();
        
        // 🟢 FIX: Map the backend data to match exactly what ReportsList and ReportsKanban expect
        // This converts the Firestore Timestamp object into a normal readable string.
        const formattedData = data.map((r: any) => {
          
          // 1. Safely format the date
          let dateStr = 'Unknown Date';
          if (r.lastUpdated) {
            // Check if it's a Firestore Timestamp object with 'seconds'
            if (r.lastUpdated.seconds) {
              dateStr = new Date(r.lastUpdated.seconds * 1000).toLocaleDateString('en-IN');
            } else {
              // Fallback if it's a normal ISO string
              dateStr = new Date(r.lastUpdated).toLocaleDateString('en-IN');
            }
          }

          // 2. Return the mapped object
          return {
            id: r.id,
            reportId: r.id.substring(0, 8).toUpperCase(), // Generate a short ID for the table
            customerName: r.customerName || 'Unknown Customer',
            documentType: r.reportType || 'Valuation Report',
            assignedTo: 'Valuator', // Can be made dynamic later
            lastUpdated: dateStr,
            status: r.status,
            deadline: 'TBD',
            
            // Kanban Specific Fields
            price: 0, 
            dealName: r.reportType || 'Valuation',
            company: r.bankName || 'Unknown Bank'
          };
        });

        setReports(formattedData);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Handler for list-view status changes
  const handleStatusChange = (id: string, newStatus: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  // Calculate stats dynamically
  const activeReportsCount = reports.filter(r => r.status === 'pending_approval' || r.status === 'drafting').length;
  const pendingReportsCount = reports.filter(r => r.status === 'pending_approval').length;
  const completedReportsCount = reports.filter(r => r.status === 'approved').length;

  return (
    <div className="flex flex-col min-h-screen bg-white px-4 md:px-8 py-6 w-full overflow-x-hidden">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-medium text-gray-800">Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Valuator Approval Dashboard</p>
        </div>
      </div>

      {/* Loading & Empty States */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-[#00a0ef] animate-spin" />
        </div>
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <AlertCircle size={48} className="mb-2 opacity-50" />
          <p>No reports currently pending approval.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 border-b border-gray-200 shrink-0 gap-4">
            <div className="flex items-center gap-8 w-full sm:w-auto overflow-x-auto scrollbar-hide">
              <button onClick={() => setViewType('list')} className={`text-sm font-medium pb-3 border-b-2 transition-colors ${viewType === 'list' ? 'border-[#00a0ef] text-[#00a0ef]' : 'border-transparent text-gray-500'}`}>List View</button>
              <button onClick={() => setViewType('kanban')} className={`text-sm font-medium pb-3 border-b-2 transition-colors ${viewType === 'kanban' ? 'border-[#00a0ef] text-[#00a0ef]' : 'border-transparent text-gray-500'}`}>Kanban</button>
            </div>
          </div>

          <div className="w-full min-w-0 flex-1">
            {viewType === 'list' ? (
              <ReportsList reports={reports} onStatusChange={handleStatusChange} />
            ) : (
              <ReportsKanban reports={reports} />
            )}
          </div>
        </>
      )}
    </div>
  );
}