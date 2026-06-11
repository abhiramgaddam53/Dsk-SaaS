// InvoicesPage.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, Download, FileText } from 'lucide-react';
import CreateInvoice from '@/app/(super-admin)/components/sales/invoices/CreateInvoice';
import InvoicesList from '@/app/(super-admin)/components/sales/invoices/InvoicesList';
import { mockInvoices } from '@/app/(super-admin)/data/mockdata';
import { InvoiceType, InvoiceStatus } from '@/app/(super-admin)/types/types';

const TABS: InvoiceType[] = ['Invoice', 'Quotation'];

export default function InvoicesPage() {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [activeTab, setActiveTab] = useState<InvoiceType>('Invoice');
  const [invoices, setInvoices] = useState(mockInvoices);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => inv.type === activeTab);
  }, [invoices, activeTab]);

  const handleStatusChange = (id: string, status: InvoiceStatus) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
  };

  if (view === 'create') {
    return <CreateInvoice onBack={() => setView('list')} />;
  }

  return (
    // Changed overflow handling on the main container to prevent squishing
    <div className="flex flex-col min-h-screen bg-white px-4 md:px-8 py-6   w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
          <p className="text-sm text-gray-500 mt-1">Create, Manage, and Track all your documents</p>
        </div>
        <button 
          onClick={() => setView('create')}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm shrink-0 w-full sm:w-auto"
        >
          <Plus size={16} />
          Add New Invoice
        </button>
      </div>

      {/* Tabs - Added w-full and ensure overflow-x-auto works cleanly */}
      <div className="w-full border-b border-gray-200 mb-6 shrink-0">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 pb-3 text-sm font-semibold whitespace-nowrap transition-colors relative
                ${activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <FileText size={16} />
              {tab === 'Invoice' ? 'Invoices' : 'Quotations'}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-gray-50/50 p-2 rounded-lg border border-gray-100 shrink-0 w-full">
        <div className="relative flex-1 w-full max-w-3xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search Invoice by Numer, or Deal Name"
            className="w-full text-black pl-10 pr-4 py-2.5 bg-gradient-to-r from-white to-[#E8F0FE] border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-end">
          <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <Download size={16} />
            Import/Export
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <Filter size={16} />
            By Status
          </button>
        </div>
      </div>

      {/* min-w-0 wrapper fixes horizontal blowout issues in flex children */}
      <div className="w-full min-w-0 flex-1">
        <InvoicesList invoices={filteredInvoices} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}