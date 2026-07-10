//  'use client';

// import React, { useState, useEffect } from 'react';
// import { Bell, Plus, FileText, Edit, FileCheck, User } from 'lucide-react';
// import { getDashboardStats, getActiveReports, DashboardStats, ReportData } from "@/app/lib/api";
// import { api } from '@/app/lib/userApis';

// export default function Dashboard() {
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [reports, setReports] = useState (  );
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [statsData, reportsData] = await Promise.all([
//           getDashboardStats(),
//           api.getValuationRecords()  
//         ]);
//         setStats(statsData);
//         setReports(reportsData);
//         console.log(reportsData)
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const getStatusStyles = (status: string) => {
//     switch (status) {
//       case 'In-Progress':
//         return 'text-orange-600 bg-orange-50 border border-orange-200';
//       case 'Completed':
//         return 'text-emerald-600 bg-emerald-50 border border-emerald-200';
//       case 'Being Evaluated':
//         return 'text-blue-600 bg-blue-50 border border-blue-200';
//       default:
//         return 'text-gray-600 bg-gray-50 border border-gray-200';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00a0ef]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white font-sans text-gray-900">
      
//       <main className="p-4 md:p-6 max-w-7xl mx-auto">
//         {/* Overview Section */}
//         <div className="mb-6">
//           <h1 className="text-xl font-semibold mb-1">Overview</h1>
//           <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <div className="p-4 rounded-xl border border-gray-200 bg-white flex justify-between items-start">
//             <div>
//               <p className="text-gray-500 mb-2">Total Reports</p>
//               <h2 className="text-2xl font-semibold">{stats?.totalReports || 0}</h2>
//             </div>
//             <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
//               <FileText className="w-5 h-5" />
//             </div>
//           </div>

//           <div className="p-4 rounded-xl border border-gray-200 bg-white flex justify-between items-start">
//             <div>
//               <p className="text-gray-500 mb-2">In Progress</p>
//               <h2 className="text-2xl font-semibold">{stats?.inProgress || 0}</h2>
//             </div>
//             <div className="p-2 rounded-lg bg-orange-50 text-orange-500">
//               <Edit className="w-5 h-5" />
//             </div>
//           </div>

//           <div className="p-4 rounded-xl border border-gray-200 bg-white flex justify-between items-start">
//             <div>
//               <p className="text-gray-500 mb-2">Completed</p>
//               <h2 className="text-2xl font-semibold">{stats?.completed || 0}</h2>
//             </div>
//             <div className="p-2 rounded-lg bg-emerald-50 text-emerald-500">
//               <FileCheck className="w-5 h-5" />
//             </div>
//           </div>
//         </div>

//         {/* Active Reports Section */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Active Reports</h2>
//           <button className="text-[#00a0ef] text-sm font-medium hover:underline">
//             View All
//           </button>
//         </div>

//         {/* Table Container */}
//         <div className="w-full overflow-x-auto pb-4">
//           <table className="w-full min-w-[600px] md:min-w-full border-collapse">
//             <thead>
//               <tr>
//                 <th className="bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 rounded-tl-lg border-b border-gray-100">
//                   ID
//                 </th>
//                 <th className="bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 border-b border-gray-100 border-l border-white">
//                   Customer Name
//                 </th>
//                 <th className="bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 border-b border-gray-100 border-l border-white md:rounded-none rounded-tr-lg">
//                   Report Type
//                 </th>
//                 <th className="    bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 border-b border-gray-100 border-l border-white">
//                   Last Updated
//                 </th>
//                 <th className="  bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 border-b border-gray-100 border-l border-white">
//                   Status
//                 </th>
//                 <th className="  bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 rounded-tr-lg border-b border-gray-100 border-l border-white">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {reports?.map((report, index) =>   (
//                 <tr key={`${report.id}-${index}`}>
//                   <td className="py-4 whitespace-nowrap px-4 text-sm text-gray-600 border-b border-gray-100">
//                     {report.id}
//                   </td>
//                   <td className="py-4 px-4 text-sm text-gray-600 border-b border-gray-100">
//                     <div className="flex items-center gap-2">
//                       <User className="w-4 h-4 text-gray-500 fill-current" />
//                       {report.customerName}
//                     </div>
//                   </td>
//                   <td className="py-4 px-4 text-sm text-gray-600 border-b border-gray-100">
//                     {report.reportType}
//                   </td>
//                   <td className="  py-4 px-4 text-sm text-gray-600 border-b border-gray-100">
//                     {report.lastUpdated}
//                   </td>
//                   <td className=" py-4 whitespace-nowrap px-4 border-b border-gray-100">
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(report.status)}`}>
//                       {report.status}
//                     </span>
//                   </td>
//                   <td className="  py-4 px-4 border-b border-gray-100">
//                     <button className="text-[#00a0ef] text-sm font-medium hover:underline">
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Plus, FileText, Edit, FileCheck, User } from 'lucide-react';
// Removed dummy `getDashboardStats` import
 
import { api } from '@/app/lib/userApis';
import Link from 'next/link';

export interface MappedReport {
  id: string;
  customerName: string;
  reportType: string;
  lastUpdated: string;
  status: string;
}

export interface DashboardStats {
  // Updated fields for the new UI
   
  completed: number;
  drafterPending : number;
  // Kept your original fields as optional for backwards compatibility
  totalReports?: number;
  inProgress?: number;
}


export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [reports, setReports] = useState<MappedReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only fetch the real data
        const reportsData = await api.getValuationRecords();
        console.log(reportsData);
        
        // 1. Calculate Real KPI Stats dynamically
        const total = reportsData.length;
        const completedCount = reportsData.filter((r: any) => r.status === 'approved' || r.status === 'completed').length;
        const inProgressCount = reportsData.filter((r: any) => 
          [  'pending_approval', 'revision_requested'].includes(r.status)
        ).length;
        const isDrafting = reportsData.filter((r: any) => 
          [ 'drafting', "pending_drafter" ].includes(r.status)
        ).length; 

        setStats({
          totalReports: total,
          inProgress: inProgressCount,
          completed: completedCount,
          drafterPending:isDrafting,
        });
        
        // 2. Map reports for the table
        const mappedReports = reportsData.map((report: any) => {
          let formattedDate = 'N/A';
          if (report.updatedAt && report.updatedAt.seconds) {
            formattedDate = new Date(report.updatedAt.seconds * 1000).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
          } else if (report.updatedAt) {
            formattedDate = new Date(report.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric'
            });
          }

          const formatStatus = (rawStatus: string) => {
            if (!rawStatus) return 'Unknown';
            return rawStatus
              .split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ');
          };

          return {
            id: report.id ? `${report.id }` : 'N/A', 
            displayId: report.id ? `${report.id.substring(0, 8).toUpperCase()}` : 'N/A', // Using short ID for cleaner UI
            // Using short ID for cleaner UI
            customerName: report.owner?.ownerName || 'Unknown Customer',
            reportType: report.clientBank?.propertyType || 'Unknown Type',
            lastUpdated: formattedDate,
            status: formatStatus(report.status)
          };
        });

        setReports(mappedReports);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusStyles = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    
    if (normalizedStatus.includes('pending') || normalizedStatus.includes('progress') || normalizedStatus.includes('revision')) {
      return 'text-orange-600 bg-orange-50 border border-orange-200';
    }
    if (normalizedStatus.includes('completed') || normalizedStatus.includes('approved')) {
      return 'text-emerald-600 bg-emerald-50 border border-emerald-200';
    }
    if (normalizedStatus.includes('evaluated') || normalizedStatus.includes('review')) {
      return 'text-blue-600 bg-blue-50 border border-blue-200';
    }
    return 'text-gray-600 bg-gray-50 border border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00a0ef]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <main className="p-4 md:p-6 mx-4 ">
        {/* Overview Section */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-1">Overview</h1>
          <p className="text-sm text-gray-500">Manage your valuation reports and tasks.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-gray-200 bg-white flex justify-between items-start">
            <div>
              <p className="text-gray-500 mb-2">Total Reports</p>
              <h2 className="text-2xl font-semibold">{stats?.totalReports || 0}</h2>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 bg-white flex justify-between items-start">
            <div>
              <p className="text-gray-500 mb-2">In Drafting</p>
              <h2 className="text-2xl font-semibold">{stats?.drafterPending || 0}</h2>
            </div>
            <div className="p-2 rounded-lg bg-orange-50 text-orange-500">
              <Edit className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 bg-white flex justify-between items-start">
            <div>
              <p className="text-gray-500 mb-2">In Progress</p>
              <h2 className="text-2xl font-semibold">{stats?.inProgress || 0}</h2>
            </div>
            <div className="p-2 rounded-lg bg-orange-50 text-orange-500">
              <Edit className="w-5 h-5" />
            </div>
          </div>
          <div className="p-4 rounded-xl border border-gray-200 bg-white flex justify-between items-start">
            <div>
              <p className="text-gray-500 mb-2">Completed</p>
              <h2 className="text-2xl font-semibold">{stats?.completed || 0}</h2>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-500">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Active Reports Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Active Reports</h2>
          <button className="text-[#00a0ef] text-sm font-medium hover:underline">
            View All
          </button>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto pb-4">
          <table className="w-full min-w-[600px] md:min-w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 rounded-tl-lg border-b border-gray-100">
                  ID
                </th>
                <th className="bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 border-b border-gray-100 border-l border-white">
                  Customer Name
                </th>
                <th className="bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 border-b border-gray-100 border-l border-white">
                  Last Updated
                </th>
                <th className="bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 border-b border-gray-100 border-l border-white">
                  Status
                </th>
                <th className="bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 rounded-tr-lg border-b border-gray-100 border-l border-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reports?.map((report, index) => (
                <tr key={`${report.id}-${index}`}>
                  <td className="py-4 whitespace-nowrap px-4 text-sm text-gray-600 border-b border-gray-100 font-medium">
                    {report.id}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400 fill-current" />
                      {report.customerName}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 border-b border-gray-100">
                    {report.lastUpdated}
                  </td>
                  <td className="py-4 whitespace-nowrap px-4 border-b border-gray-100">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 border-b border-gray-100">
                    <Link href={`/s/report/${report.id}`} className="text-[#00a0ef] text-sm font-medium hover:underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
              {reports?.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 font-medium border-b border-gray-100">
                    No active reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}