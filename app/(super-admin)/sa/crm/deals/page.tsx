// DealsPage.tsx
"use client";

import React, { useState } from 'react';
import { Search, Plus, Filter, Download, MoreVertical } from 'lucide-react';
import DealsKanban from '@/app/(super-admin)/components/crm/deals/DealsKanban';
import DealsList from '@/app/(super-admin)/components/crm/deals/DealsList';
import { mockDeals } from '@/app/(super-admin)/data/mockdata';
import { DealStage } from '@/app/(super-admin)/types/types';
import  CreateDealModal   from "@/app/(super-admin)/components/crm/deals/CreateDeal";
 
export default function DealsPage() {
  const [viewType, setViewType] = useState<'list' | 'kanban'>('list');
  const [deals, setDeals] = useState(mockDeals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleStatusChange = (dealId: string, newStage: DealStage) => {
    setDeals(prev => 
      prev.map(deal => 
        deal.id === dealId ? { ...deal, stage: newStage } : deal
      )
    );
  };

  return (
    <div className="flex flex-col h-full bg-white px-4 md:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-800">Deals</h1>
          <p className="text-sm text-gray-500 mt-1">Manage Your Sales Pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm">
            <Download size={16} />
            Import/Export
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">
            <Plus size={16} />
            Add New Deal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 rounded-xl border border-gray-100 bg-gradient-to-tr from-white to-[#EBF0FF] relative">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">Total Pipelines</p>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-medium text-gray-800">₹58,98,890</h2>
            <span className="text-sm text-blue-500">+10% from last month</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-100 bg-gradient-to-tr from-white to-[#EBF9F1] relative">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">Deals Won</p>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-medium text-gray-800">₹29,98,520</h2>
            <span className="text-sm text-green-500">+10% from last month</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-100 bg-gradient-to-tr from-white to-[#FDEBEB] relative">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">Deals Lost</p>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-medium text-gray-800">₹32,56,743</h2>
            <span className="text-sm text-red-500">-20% This Month</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 border-b border-gray-200">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setViewType('list')}
            className={`text-sm font-medium pb-3 border-b-2 transition-colors ${viewType === 'list' ? 'border-[#1B65D5] text-[#1B65D5]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            List View
          </button>
          <button 
            onClick={() => setViewType('kanban')}
            className={`text-sm font-medium pb-3 border-b-2 transition-colors ${viewType === 'kanban' ? 'border-[#1B65D5] text-[#1B65D5]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            Kanban
          </button>
        </div>
        
        <div className="flex items-center gap-4 text-sm font-medium text-gray-500 pb-3">
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

      {viewType === 'list' ? (
        <DealsList deals={deals} onStatusChange={handleStatusChange} />
      ) : (
        <DealsKanban deals={deals} />
      )}
      <CreateDealModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}