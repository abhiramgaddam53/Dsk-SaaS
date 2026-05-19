import { Plus, Bell } from 'lucide-react'
import React from 'react'
import Link from "next/link";

 
export default function Navbar() {
  return (<>
     {/* Header */}
     <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
     <div className="flex items-center">
       <div className="w-6 h-6 border-2 border-gray-400 rounded-sm flex items-center justify-center">
         <div className="w-3 h-3 bg-gray-400 border-r border-white"></div>
       </div>
     </div>
     <div className="flex items-center gap-3">
       <Link href = "/s/new-valuation"  className="flex items-center gap-1 bg-[#00a0ef] hover:bg-[#008bd1] text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
         <Plus className="w-4 h-4" />
         New Valuation
       </Link>
       <button className="p-1.5 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50">
         <Bell className="w-4 h-4" />
       </button>
       <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
         <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover" />
       </div>
     </div>
   </header>
   </>
  )
}
