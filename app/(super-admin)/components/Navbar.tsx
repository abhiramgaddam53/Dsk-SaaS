import React from 'react';
import { Menu, Search, Plus } from 'lucide-react';

interface NavbarProps {
  toggleMobile: () => void;
}

export default function Navbar({ toggleMobile }: NavbarProps) {
  return (
    <header className="flex items-center justify-between px-4 md:px-6 h-16 bg-white border-b border-gray-200 shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobile}
          className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-base md:text-lg font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Search Companies, Deals, Contacts"
            className="w-72 lg:w-96 pl-9 pr-4 py-2 bg-[#F8F9FB] border border-gray-200 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B65D5]/50 focus:border-[#1B65D5] transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#1B65D5] hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm">
          <Plus size={18} />
          New
        </button>
      </div>
    </header>
  );
}