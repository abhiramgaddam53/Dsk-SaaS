// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Search, ChevronDown, FileText, User, AlertTriangle, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
// import { getAssignedDocuments, AssignedDocumentsResponse } from '@/app/lib/api'; // Adjust path if needed
// import Link from 'next/link';

// export default function AssignedDocumentsPage() {
//   const [data, setData] = useState<AssignedDocumentsResponse | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getAssignedDocuments();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching assigned documents:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading || !data) {
//     return (
//       <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
//         <Loader className="w-10 h-10 text-[#00a0ef] animate-spin mb-4" />
//         <p className="text-gray-500 font-medium animate-pulse">Loading documents...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-[1400px] mx-auto flex flex-col h-full">
//       {/* Header */}
//       <div className="py-1.5 px-4 border-y border-gray-200 ">
//         <h1 className="text-xl font-semibold text-gray-900 mb-1">Assigned Documents</h1>
//         <p className="text-sm text-gray-500">Manage your active valuation editing tasks and deadlines.</p>
//       </div>

//       {/* Controls Bar */}
//       <div className="flex px-4 flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-3">
//         {/* Search */}
//         <div className="relative w-full sm:w-[320px]">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00a0ef] focus:border-[#00a0ef] transition-colors"
//             placeholder="Search by document name..."
//           />
//         </div>

//         {/* Filters */}
//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           <div className="relative w-full sm:w-[140px]">
//             <select className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#00a0ef] bg-white text-gray-700">
//               <option>All</option>
//               <option>In-Progress</option>
//               <option>Completed</option>
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//           </div>
//           <div className="relative w-full sm:w-[160px]">
//             <select className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#00a0ef] bg-white text-gray-700">
//               <option>Latest updated</option>
//               <option>Oldest updated</option>
//               <option>Deadline</option>
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//           </div>
//         </div>
//       </div>

//       {/* Table Container */}
//       <div className="w-full overflow-x-auto p-4 bg-white rounded-xl border-gray-200 mb-4">
//         <table className="w-full min-w-[1000px] border-collapse text-left">
//           <thead>
//             <tr className="bg-[#EFF7FB] border-b border-gray-200">
//               <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider w-[120px]">ID</th>
//               <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Document Name</th>
//               <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Customer Name</th>
//               <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Report</th>
//               <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Last Updated</th>
//               <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Deadline</th>
//               <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Status</th>
//               <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider w-[100px]">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {data.documents.map((doc, index) => (
//               <tr key={`${doc.id}-${index}`} className="hover:bg-gray-50 transition-colors">
//                 <td className="py-3 px-4 text-sm text-gray-600 font-medium whitespace-nowrap">
//                   {doc.id}
//                 </td>
//                 <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">
//                   <div className="flex items-center gap-2.5 font-medium">
//                     <FileText className="w-4 h-4 text-gray-400 shrink-0" />
//                     {doc.documentName}
//                   </div>
//                 </td>
//                 <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">
//                   <div className="flex items-center gap-2.5">
//                     <User className="w-4 h-4 text-gray-400 shrink-0" />
//                     {doc.customerName}
//                   </div>
//                 </td>
//                 <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
//                   {doc.reportType}
//                 </td>
//                 <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
//                   {doc.lastUpdated}
//                 </td>
//                 <td className="py-3 px-4 whitespace-nowrap">
//                   <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium text-red-600 border border-red-200 bg-red-50">
//                     <AlertTriangle className="w-3.5 h-3.5" />
//                     {doc.deadline}
//                   </div>
//                 </td>
//                 <td className="py-3 px-4 whitespace-nowrap">
//                   <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-200">
//                     {doc.status}
//                   </span>
//                 </td>
//                 <td className="py-3 px-4 whitespace-nowrap">
//                   <Link href={`/d/assigned/${doc.id}`} className="bg-[#00a0ef] hover:bg-[#008bd1] text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
//                     Open
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Footer */}
//       <div className="flex items-center justify-between mb-4 px-4 pt-2">
//         <p className="text-sm text-gray-500">
//           Showing <span className="font-semibold text-gray-900">{data.showingCount}</span> of <span className="font-semibold text-gray-900">{data.totalCount}</span> documents
//         </p>
//         <div className="flex items-center gap-1">
//           <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
//             <ChevronLeft className="w-4 h-4" />
//           </button>
//           <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00a0ef] text-white font-medium text-sm transition-colors shadow-sm">
//             1
//           </button>
//           <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors">
//             2
//           </button>
//           <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, FileText, User, AlertTriangle, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { api } from '@/app/lib/userApis';
import Link from 'next/link';

export default function AssignedDocumentsPage() {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getDrafterRecords();
        console.log(response);
        // Defensively extract the array in case the backend wraps it in an object
        const records = Array.isArray(response) 
          ? response 
          : (response?.records || response?.documents || response?.data || []);
        
        const formattedData = records.map((r: any) => {
          let dateStr = 'Unknown Date';
          if (r.updatedAt) {
            if (r.updatedAt.seconds) {
              dateStr = new Date(r.updatedAt.seconds * 1000).toLocaleDateString('en-IN');
            } else {
              dateStr = new Date(r.updatedAt).toLocaleDateString('en-IN');
            }
          }

          return {
            id: r.id || 'unknown',
            documentName: r.clientBank?.bankName ? `${r.clientBank.bankName} Report` : 'Valuation Report',
            customerName: r.owner?.ownerName || 'Unknown Customer',
            reportType: r.clientBank?.propertyType || 'Valuation',
            lastUpdated: dateStr,
            deadline: 'TBD',
            status: r.status || 'drafting'
          };
        });

        const pendingRecords = formattedData.filter((doc: any) => 
          doc.status === 'drafting' ||doc.status ===   "pending_approval" || doc.status === "pending_drafter" || doc.status === 'revision_requested'
        );

        setData(pendingRecords);
      } catch (error) {
        console.error("Error fetching assigned documents:", error);
        setData([]); // Fallback to an empty array so .map() never crashes
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader className="w-10 h-10 text-[#00a0ef] animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">Loading documents...</p>
      </div>
    );
  }

  // Double check to strictly guarantee an array before rendering
  const safeData = Array.isArray(data) ? data : [];

  const getStatusBadge = (status: string) => {
    if (status === 'revision_requested') {
      return 'text-red-600 bg-red-50 border-red-200';
    }
    return 'text-orange-600 bg-orange-50 border-orange-200';
  };

  const formatStatus = (status: string) => {
    if (!status) return 'Unknown';
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col h-full">
      {/* Header */}
      <div className="py-1.5 px-4 border-y border-gray-200 ">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Assigned Documents</h1>
        <p className="text-sm text-gray-500">Manage your active valuation editing tasks and deadlines.</p>
      </div>

      {/* Controls Bar */}
      <div className="flex px-4 flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-3">
        <div className="relative w-full sm:w-[320px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00a0ef] focus:border-[#00a0ef] transition-colors"
            placeholder="Search by document name..."
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-[140px]">
            <select className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#00a0ef] bg-white text-gray-700">
              <option>All</option>
              <option>In-Progress</option>
              <option>Completed</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative w-full sm:w-[160px]">
            <select className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#00a0ef] bg-white text-gray-700">
              <option>Latest updated</option>
              <option>Oldest updated</option>
              <option>Deadline</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto p-4 bg-white rounded-xl border-gray-200 mb-4">
        <table className="w-full min-w-[1000px] border-collapse text-left">
          <thead>
            <tr className="bg-[#EFF7FB] border-b border-gray-200">
              <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider w-[120px]">ID</th>
              <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Document Name</th>
              <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Customer Name</th>
              <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Report</th>
              <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Last Updated</th>
              {/* <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Deadline</th> */}
              <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Status</th>
              <th className="py-3.5 px-4 text-xs font-semibold text-gray-600 tracking-wider w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {safeData.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500 font-medium">
                  No active documents assigned to you.
                </td>
              </tr>
            ) : (
              safeData.map((doc, index) => (
                <tr key={`${doc.id}-${index}`} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-600 font-medium whitespace-nowrap">
                    {doc.id.substring(0, 8).toUpperCase()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">
                    <div className="flex items-center gap-2.5 font-medium">
                      <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                      {doc.documentName}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <User className="w-4 h-4 text-gray-400 shrink-0" />
                      {doc.customerName}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {doc.reportType}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {doc.lastUpdated}
                  </td>
                  {/* <td className="py-3 px-4 whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium text-red-600 border border-red-200 bg-red-50">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {doc.deadline}
                    </div>
                  </td> */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border ${getStatusBadge(doc.status)}`}>
                      {formatStatus(doc.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <Link href={`/d/reports/${doc.id}`} className="bg-[#00a0ef] hover:bg-[#008bd1] text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                      Open
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between mb-4 px-4 pt-2">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-900">{safeData.length}</span> of <span className="font-semibold text-gray-900">{safeData.length}</span> documents
        </p>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00a0ef] text-white font-medium text-sm transition-colors shadow-sm">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}