'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Edit, ClipboardCheck, User, Clock, Loader, Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCompletedDocumentsData, CompletedDocumentsData } from "@/app/lib/api"; // Adjust import path

export default function CompletedDocumentsPage() {
  const [data, setData] = useState<CompletedDocumentsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCompletedDocumentsData();
        setData(result);
      } catch (error) {
        console.error("Error fetching completed documents data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Loader className="w-8 h-8 text-[#00a0ef] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col min-h-0">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="border-y border-gray-200 px-4 py-2 mb-2">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Completed Documents</h1>
        <p className="text-sm text-gray-500">Review your completed reports</p>
      </div>

      {/* ── Stats Grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 px-3 py-2 mb-2">
        <div className="p-4 rounded-xl border border-gray-200 bg-[#fafafa] flex justify-between items-start">
          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-2">Total Completed</p>
            <h2 className="text-2xl font-semibold text-gray-900">{data.stats.totalCompleted}</h2>
          </div>
          <div className="p-2 rounded-lg bg-white border border-gray-100 text-emerald-500 shadow-sm">
            <ClipboardCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-[#fafafa] flex justify-between items-start">
          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-2">Completed This Month</p>
            <h2 className="text-2xl font-semibold text-gray-900">{data.stats.completedThisMonth}</h2>
          </div>
          <div className="p-2 rounded-lg bg-white border border-gray-100 text-[#00a0ef] shadow-sm">
            <FileText className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-[#fafafa] flex justify-between items-start">
          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-2">Average Turnaround Time</p>
            <h2 className="text-2xl font-semibold text-gray-900">{data.stats.avgTurnaround}</h2>
          </div>
          <div className="p-2 rounded-lg bg-white border border-gray-100 text-gray-500 shadow-sm">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-[#fafafa] flex justify-between items-start">
          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-2">Revision Rate</p>
            <h2 className="text-2xl font-semibold text-gray-900">{data.stats.revisionRate}</h2>
          </div>
          <div className="p-2 rounded-lg bg-white border border-gray-100 text-orange-500 shadow-sm">
            <Edit className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* ── Main Content (Full Width Table) ────────────────────────────── */}
      <div className="border-t border-gray-200 pt-6 px-4 flex-1 flex flex-col min-h-0">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          {/* Search */}
          <div className="relative w-full sm:w-[320px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00a0ef] transition-colors"
              placeholder="Search by document name..."
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-[140px]">
              <select className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#00a0ef] bg-white text-gray-700">
                <option>This Month</option>
                <option>Last Month</option>
                <option>All Time</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative w-full sm:w-[160px]">
              <select className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#00a0ef] bg-white text-gray-700">
                <option>Completion Date</option>
                <option>Document Name</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto bg-white flex-1 min-h-0">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="bg-[#EFF7FB] border-y border-gray-200">
                <th className="py-2.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">ID</th>
                <th className="py-2.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Document Name</th>
                <th className="py-2.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Customer Name</th>
                <th className="py-2.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Report Type</th>
                <th className="py-2.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Completion Date</th>
                <th className="py-2.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Revision Count</th>
                <th className="py-2.5 px-4 text-xs font-semibold text-gray-600 tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="border-b border-gray-100">
              {data.documents.map((doc, index) => (
                <tr key={`${doc.id}-${index}`} className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-600 font-medium whitespace-nowrap">
                    {doc.id}
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
                    {doc.completionDate}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {doc.revisionCount}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button className="bg-[#00a0ef] hover:bg-[#008bd1] text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between pt-4 pb-2">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{data.showingCount}</span> of <span className="font-semibold text-gray-900">{data.totalCount}</span> documents
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
    </div>
  );
}