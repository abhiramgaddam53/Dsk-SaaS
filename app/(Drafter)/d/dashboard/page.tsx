 
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { FileText, Edit, ClipboardCheck, User, ChevronRight, Clock, Loader } from 'lucide-react';
// import { getFullDashboardData, DashboardData  } from "@/app/lib/api";
// import { api } from '@/app/lib/userApis';
// import Link from 'next/link';

// export default function DashboardPage() {
//   const [data, setData] = useState<DashboardData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [dashboardData, drafterRecords] = await Promise.all([
//           getFullDashboardData(),
//           api.getDrafterRecords()
//         ]);

//         const mappedRecords = drafterRecords.map((record: any) => {
//           let formattedDate = record.lastUpdated;
//           if (record.lastUpdated?.seconds) {
//             formattedDate = new Date(record.lastUpdated.seconds * 1000).toLocaleDateString();
//           } else if (typeof record.lastUpdated === 'string' || typeof record.lastUpdated === 'number') {
//             formattedDate = new Date(record.lastUpdated).toLocaleDateString();
//           }

//           return {
//             id: record.id,
//             customerName: record.customerName || "Unknown",
//             reportType: record.reportType || "Unknown",
//             lastUpdated: formattedDate || "N/A",
//             status: record.status,
//           };
//         });

//         setData({
//           ...dashboardData,
//           reports: mappedRecords
//         });
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
//       case 'drafting':
//         return 'text-orange-600 bg-orange-50 border border-orange-200';
//       case 'Completed':
//         return 'text-emerald-600 bg-emerald-50 border border-emerald-200';
//       case 'Being Evaluated':
//         return 'text-blue-600 bg-blue-50 border border-blue-200';
//       case 'pending_drafter':
//       case 'Pending':
//         return 'text-amber-600 bg-amber-50 border border-amber-200';
//       default:
//         return 'text-gray-600 bg-gray-50 border border-gray-200';
//     }
//   };

//   const formatStatusDisplay = (status: string) => {
//     switch (status) {
//       case 'pending_drafter': return 'Pending';
//       case 'drafting': return 'In-Progress';
//       default: return status;
//     }
//   };

//   const getActivityColor = (type: string) => {
//     switch (type) {
//       case 'blue':  return 'bg-[#00a0ef] border-[#00a0ef]';
//       case 'green': return 'bg-emerald-500 border-emerald-500';
//       case 'gray':  return 'bg-gray-300 border-gray-300';
//       default:      return 'bg-gray-300 border-gray-300';
//     }
//   };

//   if (loading || !data) {
//     return (
//       <div className="flex-1 flex items-center justify-center min-h-[60vh]">
//         <Loader className="w-8 h-8 text-[#00a0ef] animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-[1400px] mx-auto">

//       {/* ── Header ─────────────────────────────────────────────────────── */}
//       <div className=" border-y border-gray-200 p-2 ">
//         <h1 className="text-xl font-semibold text-gray-900 mb-1">Dashboard</h1>
//         <p className="text-sm text-gray-500">Overview of your assigned work.</p>
//       </div>

//       {/* ── Stats Grid ─────────────────────────────────────────────────── */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-3">
//         <div className="p-4 rounded-xl border border-gray-200 bg-[#fafafa] flex justify-between items-start">
//           <div>
//             <p className="text-[13px] font-medium text-gray-500 mb-2">Active</p>
//             <h2 className="text-2xl font-semibold text-gray-900">{data.stats.activeReports}</h2>
//           </div>
//           <div className="p-2 rounded-lg bg-white border border-gray-100 text-[#00a0ef] shadow-sm">
//             <FileText className="w-4 h-4" />
//           </div>
//         </div>

//         <div className="p-4 rounded-xl border border-gray-200 bg-[#fafafa] flex justify-between items-start">
//           <div>
//             <p className="text-[13px] font-medium text-gray-500 mb-2">Due Today</p>
//             <h2 className="text-2xl font-semibold text-gray-900">{data.stats.dueToday}</h2>
//           </div>
//           <div className="p-2 rounded-lg bg-white border border-gray-100 text-orange-500 shadow-sm">
//             <Clock className="w-4 h-4" />
//           </div>
//         </div>

//         <div className="p-4 rounded-xl border border-gray-200 bg-[#fafafa] flex justify-between items-start">
//           <div>
//             <p className="text-[13px] font-medium text-gray-500 mb-2">Pending</p>
//             <h2 className="text-2xl font-semibold text-gray-900">{data.stats.pendingReports}</h2>
//           </div>
//           <div className="p-2 rounded-lg bg-white border border-gray-100 text-orange-500 shadow-sm">
//             <Edit className="w-4 h-4" />
//           </div>
//         </div>

//         <div className="p-4 rounded-xl border border-gray-200 bg-[#fafafa] flex justify-between items-start">
//           <div>
//             <p className="text-[13px] font-medium text-gray-500 mb-2">Completed</p>
//             <h2 className="text-2xl font-semibold text-gray-900">{data.stats.completed}</h2>
//           </div>
//           <div className="p-2 rounded-lg bg-white border border-gray-100 text-emerald-500 shadow-sm">
//             <ClipboardCheck className="w-4 h-4" />
//           </div>
//         </div>
//       </div>

//       {/* ── Main Content ───────────────────────────────────────────────── */}
//       <div className="grid grid-cols-1 border-t border-gray-200  lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-gray-200 items-stretch">

//         {/* ── Left Column: Assigned Reports ────────────────────────────── */}
//         <div className="lg:col-span-2 flex flex-col min-h-0 p-4 pb-0">

//           <div className="flex justify-between items-center px-4 mb-4">
//             <h2 className="text-lg font-semibold text-gray-900">Assigned Reports</h2>
//             <button  className="text-[#00a0ef] text-sm font-medium hover:underline">
//               View All
//             </button>
//           </div>

//           <div className="w-full overflow-x-auto bg-white flex-1 min-h-0">
//             <table className="w-full min-w-[700px] border-collapse text-left">
//               <thead>
//                 <tr className="bg-[#EFF7FB] border-b border-gray-200">
//                   <th className=" px-4 text-xs font-semibold text-gray-600 tracking-wider">ID</th>
//                   <th className="  px-4 text-xs font-semibold text-gray-600 tracking-wider">Customer Name</th>
//                   <th className="py-2 px-4 text-xs font-semibold text-gray-600 tracking-wider">Report Type</th>
//                   <th className="py-2 px-4 text-xs font-semibold text-gray-600 tracking-wider">Last Updated</th>
//                   <th className="py-2 px-4 text-xs font-semibold text-gray-600 tracking-wider">Status</th>
//                   <th className="py-2 px-4 text-xs font-semibold text-gray-600 tracking-wider">Action</th>
//                 </tr>
//               </thead>
//               <tbody className=" border-b border-gray-100">
//                 {data.reports.map((report, index) => (
//                   <tr key={`${report.id}-${index}`} className="hover:bg-gray-50 border-b border-gray-200 transition-colors">
//                     <td className="py-3 px-4 text-sm text-gray-600 font-medium whitespace-nowrap">
//                       {report.id.length > 8 ? `${report.id.substring(0, 8)}...` : report.id}
//                     </td>
//                     <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">
//                       <div className="flex items-center gap-2.5">
//                         <div className="text-gray-400">
//                           <User className="w-4 h-4 fill-current" />
//                         </div>
//                         {report.customerName}
//                       </div>
//                     </td>
//                     <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
//                       {report.reportType}
//                     </td>
//                     <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
//                       {report.lastUpdated}
//                     </td>
//                     <td className="py-3 px-4 whitespace-nowrap">
//                       <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${getStatusStyles(report.status)}`}>
//                         {formatStatusDisplay(report.status)}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4 whitespace-nowrap">
//                       <Link href={`/d/reports/${report.id}`} className="text-[#00a0ef] text-sm font-medium hover:underline">
//                         View
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* ── Right Column: Due Soon + Recent Activity ──────────────────── */}
//         <div className="flex flex-col pl-2">

//           {/* Due Soon ---------------------------------------------------- */}
//           <section className="flex flex-col pb-3 border-b pt-4 border-gray-200 shrink-0">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Due Soon</h2>
//             <div className="flex flex-col gap-3">
//               {data.dueSoon.map((item) => (
//                 <div
//                   key={item.id}
//                   className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer transition-colors ${
//                     item.urgent
//                       ? 'bg-red-50/50 border-red-100 hover:bg-red-50'
//                       : 'bg-gray-50/50 border-gray-200 hover:bg-gray-50'
//                   }`}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
//                       item.urgent ? 'bg-red-400 text-white' : 'bg-gray-400 text-white'
//                     }`}>
//                       <FileText className="w-4 h-4" />
//                     </div>
//                     <div>
//                       <h4 className="text-xs font-semibold text-gray-900 mb-1">{item.title}</h4>
//                       <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
//                         <span>{item.subtext}</span>
//                         <span className="text-gray-300">|</span>
//                         <span className={`flex items-center gap-1 font-medium ${item.urgent ? 'text-red-600' : 'text-gray-600'}`}>
//                           <Clock className="w-3.5 h-3.5" />
//                           {item.time}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Recent Activity --------------------------------------------- */}
//           <section className="flex flex-col pt-3 flex-1 min-h-0">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 shrink-0">Recent Activity</h2>

//             <div className="relative pl-3 flex-1 overflow-y-auto pr-2 pb-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
//               {/* Vertical timeline line */}
//               <div className="absolute top-2 bottom-4 left-[15px] w-px bg-gray-200 z-0" />

//               <div className="flex flex-col gap-5 relative z-10">
//                 {data.activities.map((activity) => (
//                   <div key={activity.id} className="flex gap-2 relative">
//                     <div className="relative mt-0.5 shrink-0">
//                       <div className={`w-2.5 h-2.5 rounded-full ring-4 ring-white ${getActivityColor(activity.type)}`} />
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-900 font-medium leading-snug">{activity.text}</p>
//                       <p className="text-[10px] text-gray-400 mt-1">{activity.time}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Edit, ClipboardCheck, User, ChevronRight, Clock, Loader, AlertTriangle } from 'lucide-react';
import { api } from '@/app/lib/userApis';
import Link from 'next/link';

export interface RealDashboardData {
  stats: {
    revisionRequired: number;
    due: number;
    pendingReports: number;
    completed: number;
  };
  reports: Array<{
    id: string;
    customerName: string;
    reportType: string;
    lastUpdated: string;
    status: string;
  }>;
  dueSoon: Array<{
    id: string;
    title: string;
    subtext: string;
    time: string;
    urgent: boolean;
  }>;
  activities: Array<{
    id: string;
    text: string;
    time: string;
    type: 'blue' | 'green' | 'gray';
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<RealDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getDrafterRecords();
        
        const drafterRecords = Array.isArray(response) 
          ? response 
          : (response?.records || response?.documents || response?.data || []);

        // 1. Calculate Stats
        const revisionCount = drafterRecords.filter((r: any) => 
          ['revision_requested', 'revisn_required'].includes(r.status)
        ).length;
        
        const dueCount = drafterRecords.filter((r: any) => 
          ['drafting', 'pending_drafter'].includes(r.status)
        ).length;

        const pendingCount = drafterRecords.filter((r: any) => 
          r.status === 'pending_approval'
        ).length;
        
        const completedCount = drafterRecords.filter((r: any) => 
          r.status === 'approved'
        ).length;

        // 2. Map Reports for Table & Shared Date Logic
        const mappedRecords = drafterRecords.map((record: any) => {
          let formattedDate = 'Unknown Date';
          if (record.updatedAt) {
            if (record.updatedAt.seconds) {
              formattedDate = new Date(record.updatedAt.seconds * 1000).toLocaleDateString();
            } else {
              formattedDate = new Date(record.updatedAt).toLocaleDateString();
            }
          }

          return {
            id: record.id || 'N/A',
            customerName: record.owner?.ownerName || "Unknown Customer",
            reportType: record.clientBank?.propertyType || "Valuation Report",
            lastUpdated: formattedDate,
            status: record.status || 'drafting',
            // Keep raw record for activities/due soon mapping
            _raw: record
          };
        });

        // 3. Map Due Soon (Pending Drafter & Revision Required)
        const dueSoonRecords = mappedRecords
          .filter((r :any ) => ['drafting', 'pending_drafter', 'revision_requested', 'revisn_required'].includes(r.status))
          .slice(0, 5)
          .map((r:any) => ({
            id: r.id,
            title: r.customerName,
            subtext: r.reportType,
            time: r.lastUpdated,
            urgent: ['revision_requested', 'revisn_required'].includes(r.status)
          }));

        // 4. Map Recent Activity (Submitted & Approved)
        const activityRecords = mappedRecords
          .filter((r:any) => ['revision_requested','pending_approval', 'approved'].includes(r.status))
          .slice(0, 6)
          .map((r:any) => {
            const isApproved = r.status === 'approved';
            const revisionRequested = r.status === 'revision_requested';
            return {
              id: r.id,
              text: isApproved
                ? `Report approved for ${r.customerName} on ${r.reportType}`
                : revisionRequested
                  ? `Revision Required for ${r.customerName}`
                  : `Report Submitted for ${r.customerName} on ${r.reportType}`,
              time: r.lastUpdated,
              type: isApproved
                ? 'green'
                : revisionRequested
                  ? 'gray'
                  : 'blue' as 'green' | 'blue' | 'gray'
            };
          });

        setData({
          stats: {
            revisionRequired: revisionCount,
            due: dueCount,
            pendingReports: pendingCount,
            completed: completedCount,
          },
          reports: mappedRecords,
          dueSoon: dueSoonRecords,
          activities: activityRecords
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'drafting':
      case 'pending_drafter':
        return 'text-orange-600 bg-orange-50 border border-orange-200';
      case 'revision_requested':
      case 'revisn_required':
        return 'text-red-600 bg-red-50 border border-red-200';
      case 'approved':
        return 'text-emerald-600 bg-emerald-50 border border-emerald-200';
      case 'pending_approval':
        return 'text-amber-600 bg-amber-50 border border-amber-200';
      default:
        return 'text-gray-600 bg-gray-50 border border-gray-200';
    }
  };

  const formatStatusDisplay = (status: string) => {
    if (!status) return 'Unknown';
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'blue':  return 'bg-[#00a0ef] border-[#00a0ef]';
      case 'green': return 'bg-emerald-500 border-emerald-500';
      case 'gray':  return 'bg-gray-300 border-gray-300';
      default:      return 'bg-gray-300 border-gray-300';
    }
  };

  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Loader className="w-8 h-8 text-[#00a0ef] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto">

      <div className=" border-y border-gray-200 p-2 ">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your assigned work.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-3">
        <div className="p-4 rounded-xl border border-gray-200 bg-[#fafafa] flex justify-between items-start">
          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-2">Revision Required</p>
            <h2 className="text-2xl font-semibold text-gray-900">{data.stats.revisionRequired}</h2>
          </div>
          <div className="p-2 rounded-lg bg-white border border-gray-100 text-red-500 shadow-sm">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-[#fafafa] flex justify-between items-start">
          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-2">Due</p>
            <h2 className="text-2xl font-semibold text-gray-900">{data.stats.due}</h2>
          </div>
          <div className="p-2 rounded-lg bg-white border border-gray-100 text-orange-500 shadow-sm">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-[#fafafa] flex justify-between items-start">
          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-2">Pending Approval</p>
            <h2 className="text-2xl font-semibold text-gray-900">{data.stats.pendingReports}</h2>
          </div>
          <div className="p-2 rounded-lg bg-white border border-gray-100 text-amber-500 shadow-sm">
            <Edit className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-[#fafafa] flex justify-between items-start">
          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-2">Completed</p>
            <h2 className="text-2xl font-semibold text-gray-900">{data.stats.completed}</h2>
          </div>
          <div className="p-2 rounded-lg bg-white border border-gray-100 text-emerald-500 shadow-sm">
            <ClipboardCheck className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 border-t border-gray-200  lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-gray-200 items-stretch">
        <div className="lg:col-span-2 flex flex-col min-h-0 p-4 pb-0">
          <div className="flex justify-between items-center px-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">All Reports</h2>
            <Link href="/d/assigned" className="text-[#00a0ef] text-sm font-medium hover:underline">
              View All
            </Link>
          </div>

          <div className="w-full overflow-x-auto bg-white flex-1 min-h-0">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="bg-[#EFF7FB] border-b border-gray-200">
                  <th className=" px-4 text-xs font-semibold text-gray-600 tracking-wider">ID</th>
                  <th className="  px-4 text-xs font-semibold text-gray-600 tracking-wider">Customer Name</th>
                  <th className="py-2 px-4 text-xs font-semibold text-gray-600 tracking-wider">Report Type</th>
                  <th className="py-2 px-4 text-xs font-semibold text-gray-600 tracking-wider">Last Updated</th>
                  <th className="py-2 px-4 text-xs font-semibold text-gray-600 tracking-wider">Status</th>
                  <th className="py-2 px-4 text-xs font-semibold text-gray-600 tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className=" border-b border-gray-100">
                {data.reports.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-sm text-gray-500">
                      No reports found.
                    </td>
                  </tr>
                ) : (
                  data.reports.map((report, index) => (
                    <tr key={`${report.id}-${index}`} className="hover:bg-gray-50 border-b border-gray-200 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-600 font-medium whitespace-nowrap">
                        {report.id.length > 8 ? `${report.id.substring(0, 8)}...` : report.id}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="text-gray-400">
                            <User className="w-4 h-4 fill-current" />
                          </div>
                          {report.customerName}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                        {report.reportType}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                        {report.lastUpdated}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${getStatusStyles(report.status)}`}>
                          {formatStatusDisplay(report.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <Link href={`/d/reports/${report.id}`} className="text-[#00a0ef] text-sm font-medium hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col pl-2">
          <section className="flex flex-col pb-3 border-b pt-4 border-gray-200 shrink-0">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Due Soon</h2>
            <div className="flex flex-col gap-3">
              {data.dueSoon.length === 0 ? (
                <p className="text-sm text-gray-500 italic pl-2">No items due soon.</p>
              ) : (
                data.dueSoon.map((item) => (
                  <Link
                    href={`/d/reports/${item.id}`}
                    key={item.id}
                    className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer transition-colors ${
                      item.urgent
                        ? 'bg-red-50/50 border-red-100 hover:bg-red-50'
                        : 'bg-gray-50/50 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        item.urgent ? 'bg-red-400 text-white' : 'bg-gray-400 text-white'
                      }`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                          <span>{item.subtext}</span>
                          <span className="text-gray-300">|</span>
                          <span className={`flex items-center gap-1 font-medium ${item.urgent ? 'text-red-600' : 'text-gray-600'}`}>
                            <Clock className="w-3.5 h-3.5" />
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                  </Link>
                ))
              )}
            </div>
          </section>

          <section className="flex flex-col pt-3 flex-1 min-h-0">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 shrink-0">Recent Activity</h2>
            <div className="relative pl-3 flex-1 overflow-y-auto pr-2 pb-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {data.activities.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No recent activity.</p>
              ) : (
                <>
                  <div className="absolute top-2 bottom-4 left-[15px] w-px bg-gray-200 z-0" />
                  <div className="flex flex-col gap-5 relative z-10">
                    {data.activities.map((activity, i) => (
                      <div key={`${activity.id}-${i}`} className="flex gap-2 relative">
                        <div className="relative mt-0.5 shrink-0">
                          <div className={`w-2.5 h-2.5 rounded-full ring-4 ring-white ${getActivityColor(activity.type)}`} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-900 font-medium leading-snug">{activity.text}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}