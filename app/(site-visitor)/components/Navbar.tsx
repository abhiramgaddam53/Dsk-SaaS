'use client';
import { Plus, Bell, ChevronDown } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import Link from "next/link";

 
export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (<>
     {/* Header */}
     <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
     <div className="flex items-center">
       <div className="w-6 h-6 border-2 border-gray-400 rounded-sm flex items-center justify-center">
         <div className="w-3 h-3 bg-gray-400 border-r border-white"></div>
       </div>
     </div>
     <div className="flex items-center gap-3">
      
      {/* --- New Entry Dropdown --- */}
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-1.5 bg-[#00a0ef] hover:bg-[#008bd1] text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Entry
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 opacity-80 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute  md:right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-1.5 z-50 overflow-hidden">
            <Link 
              href="/s/new-valuation" 
              onClick={() => setIsDropdownOpen(false)}
              className="block px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-blue-50 hover:text-[#00a0ef] transition-colors"
            >
              New Valuation
            </Link>
            <Link 
              href="/s/new-customer" 
              onClick={() => setIsDropdownOpen(false)}
              className="block px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-blue-50 hover:text-[#00a0ef] transition-colors"
            >
              New Customer
            </Link>
          </div>
        )}
      </div>

      {/* --- Notification Bell --- */}
      <button className="p-1.5 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors">
        <Bell className="w-4 h-4" />
      </button>

      {/* --- User Avatar --- */}
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border border-gray-200 shrink-0">
        <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover" />
      </div>

    </div>
   </header>
   </>
  )
}
