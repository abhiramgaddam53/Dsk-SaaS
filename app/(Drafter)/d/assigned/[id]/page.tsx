'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, History } from 'lucide-react';

export default function DocumentEditorPage() {
  // In a real app, you would fetch the document data and HTML content here.
  const [docHtml, setDocHtml] = useState<string | null>(null); 

  return (
    <div className="flex flex-col h-full border-t border-gray-200 bg-white max-w-[1400px] mx-auto">
      
      {/* Breadcrumbs */}
     
      {/* Header Section */}
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200  mb-6">
        
        {/* Title & Subtitle */}
        <div className="flex flex-col px-4 gap-1">
          <h1 className="text-xl font-medium text-gray-900">
            Document Name Goes Here
          </h1>
          <p className="text-[13px] text-gray-500">
            Pradhyum Dhondi - Plot Valuation Report
          </p>
        </div>

        {/* Action Buttons & Badges */}
        {/* On mobile: flex-col (stacks vertically). On desktop: md:flex-row (aligns horizontally) */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mt-2 md:mr-4 md:mt-0">
          
          <span className="px-3 py-1 text-[13px] font-medium text-[#2563EB] bg-[#C7DFFF] border border-[#d6effd] rounded-full">
            In Progress
          </span>
          
          <button className="flex items-center gap-1.5 text-[14px] font-medium text-[#00a0ef] hover:underline underline-offset-2">
            <History className="w-4 h-4 shrink-0" />
            Version History
          </button>
          
          {/* Hidden on Mobile, Visible on Desktop */}
          <button className="hidden md:block px-5 py-2 bg-[#00a0ef] hover:bg-[#008bd1] text-white text-[14px] font-medium rounded-lg shadow-sm transition-colors ml-1">
            Save Changes
          </button>
          
        </div>
      </div>

      {/* Main Content Split */}
      <div className="flex flex-col md:flex-row gap-8 flex-1 pb-8 min-h-0">
        
        {/* Left Sidebar Form (Hidden on Mobile) */}
        <div className="hidden px-4 md:flex flex-col w-[260px] shrink-0">
          <div className="mb-6">
            <label className="block text-[13px] font-bold text-gray-800 mb-2">
              Maximum Active Assignments
            </label>
            <input 
              type="number" 
              defaultValue={12}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef]"
            />
            <p className="text-[11px] text-gray-400 mt-2 leading-tight">
              Maximum number of documents you can work on simultaneously
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-[13px] font-bold text-gray-800 mb-2">
              Maximum Word Count Per Day (Optional)
            </label>
            <input 
              type="number" 
              defaultValue={10000}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef]"
            />
            <p className="text-[11px] text-gray-400 mt-2 leading-tight">
              Leave empty for no daily word count limit
            </p>
          </div>

          <button className="w-fit px-5 py-2 bg-[#00a0ef] hover:bg-[#008bd1] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
            Save Changes
          </button>
        </div>

        {/* Right Area: Document Editor Container */}
        <div className="flex-1 flex flex-col min-h-[500px]">
          
          {/* DOCUMENT RENDERING AREA
            - Replace the bg-[#00a0ef] with bg-white when injecting real HTML.
            - You can use dangerouslySetInnerHTML to render the converted Word HTML. 
          */}
          <div className="flex-1 w-full bg-[#00a0ef] rounded-xl flex items-center justify-center shadow-sm relative overflow-y-auto">
            {docHtml ? (
              <div 
                className="w-full h-full bg-white p-8 prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: docHtml }} 
              />
            ) : (
              <span className="text-white font-semibold tracking-widest text-sm">
                DOCUMENT
              </span>
            )}
          </div>

          {/* Mobile Edit Notice */}
          <p className="md:hidden text-center text-[12px] font-medium text-gray-600 mt-6 underline underline-offset-2">
            Note: Open the file on desktop to make edits.
          </p>

        </div>

      </div>
    </div>
  );
}