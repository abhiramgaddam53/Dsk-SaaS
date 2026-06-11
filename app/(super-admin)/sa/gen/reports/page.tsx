 // ReportsPage.tsx
 "use client";

 import React, { useState } from 'react';
 import { Search, Plus, Filter, Download, MoreVertical } from 'lucide-react';
import ReportsKanban from '@/app/(super-admin)/components/general/ReportsKanban';
import ReportsList from '@/app/(super-admin)/components/general/ReportsList';
import { mockReports } from '@/app/(super-admin)/data/mockdata';
import { ReportStatus } from '@/app/(super-admin)/types/types';
 
  
 export default function ReportsPage() {
   const [viewType, setViewType] = useState<'list' | 'kanban'>('list');
   const [reports, setReports] = useState(mockReports);
 
   const handleStatusChange = (id: string, newStatus: ReportStatus) => {
     setReports(prev => prev.map(report => report.id === id ? { ...report, status: newStatus } : report));
   };
 
   return (
     <div className="flex flex-col min-h-screen bg-white px-4 md:px-8 py-6  w-full overflow-x-hidden">
       <div className="flex items-center justify-between mb-6 shrink-0">
         <div>
           <h1 className="text-2xl font-medium text-gray-800">Reports</h1>
           <p className="text-sm text-gray-500 mt-1">Manage Your Valuation Reports</p>
         </div>
         <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">
             <Plus size={16} />
             Add New Report
           </button>
         </div>
       </div>
 
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 shrink-0">
         <div className="p-5 rounded-xl border border-gray-100 bg-gradient-to-tr from-white to-[#EBF0FF] relative">
           <div className="flex justify-between items-center mb-6">
             <p className="text-sm text-gray-600">Active Reports</p>
             <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
           </div>
           <div className="flex items-end justify-between">
             <h2 className="text-3xl font-medium text-gray-800">23</h2>
             <span className="text-sm text-blue-500">+10% from last month</span>
           </div>
         </div>
 
         <div className="p-5 rounded-xl border border-gray-100 bg-gradient-to-tr from-white to-[#FEF7E0] relative">
           <div className="flex justify-between items-center mb-6">
             <p className="text-sm text-gray-600">Pending Reports</p>
             <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
           </div>
           <div className="flex items-end justify-between">
             <h2 className="text-3xl font-medium text-gray-800">8</h2>
             <span className="text-sm text-yellow-600">+10% from last month</span>
           </div>
         </div>
 
         <div className="p-5 rounded-xl border border-gray-100 bg-gradient-to-tr from-white to-[#FDEBEB] relative">
           <div className="flex justify-between items-center mb-6">
             <p className="text-sm text-gray-600">Due Today</p>
             <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
           </div>
           <div className="flex items-end justify-between">
             <h2 className="text-3xl font-medium text-gray-800">3</h2>
             <span className="text-sm text-red-500">-20% This Month</span>
           </div>
         </div>
 
         <div className="p-5 rounded-xl border border-gray-100 bg-gradient-to-tr from-white to-[#EBF9F1] relative">
           <div className="flex justify-between items-center mb-6">
             <p className="text-sm text-gray-600">Completed</p>
             <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
           </div>
           <div className="flex items-end justify-between">
             <h2 className="text-3xl font-medium text-gray-800">12</h2>
             <span className="text-sm text-green-500">+10% from last month</span>
           </div>
         </div>
       </div>
 
       <div className="flex flex-col sm:flex-row items-center justify-between mb-6 border-b border-gray-200 shrink-0 gap-4">
         <div className="flex items-center gap-8 w-full sm:w-auto overflow-x-auto scrollbar-hide">
           <button 
             onClick={() => setViewType('list')}
             className={`text-sm font-medium pb-3 border-b-2 transition-colors whitespace-nowrap ${viewType === 'list' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
           >
             List View
           </button>
           <button 
             onClick={() => setViewType('kanban')}
             className={`text-sm font-medium pb-3 border-b-2 transition-colors whitespace-nowrap ${viewType === 'kanban' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
           >
             Kanban
           </button>
         </div>
         
         <div className="flex items-center gap-4 text-sm font-medium text-gray-500 pb-3 w-full sm:w-auto justify-end">
           <button className="flex items-center gap-2 hover:text-gray-800 transition-colors">
             <Download size={16} />
             Import/Export
           </button>
           <button className="flex items-center gap-2 hover:text-gray-800 transition-colors">
             <Filter size={16} />
             Filter
           </button>
         </div>
       </div>
 
       <div className="w-full min-w-0 flex-1">
         {viewType === 'list' ? (
           <ReportsList reports={reports} onStatusChange={handleStatusChange} />
         ) : (
           <ReportsKanban reports={reports} />
         )}
       </div>
     </div>
   );
 }