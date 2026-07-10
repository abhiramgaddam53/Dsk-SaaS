// 'use client';
// import { Plus, Bell, ChevronDown } from 'lucide-react'
// import React, { useEffect, useRef, useState } from 'react'
// import Link from "next/link";

 
// export default function Navbar() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);
//   return (<>
//      {/* Header */}
//      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
//      <div className="flex items-center">
//        <div className="w-6 h-6 border-2 border-gray-400 rounded-sm flex items-center justify-center">
//          <div className="w-3 h-3 bg-gray-400 border-r border-white"></div>
//        </div>
//      </div>
//      <div className="flex items-center gap-3">
      
//       {/* --- New Entry Dropdown --- */}
//       <div className="relative" ref={dropdownRef}>
//         <button 
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           className="flex items-center gap-1.5 bg-[#00a0ef] hover:bg-[#008bd1] text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm"
//         >
//           <Plus className="w-4 h-4" />
//           New Entry
//           <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 opacity-80 ${isDropdownOpen ? 'rotate-180' : ''}`} />
//         </button>

//         {/* Dropdown Menu */}
//         {isDropdownOpen && (
//           <div className="absolute  md:right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-1.5 z-50 overflow-hidden">
//             <Link 
//               href="/s/new-valuation" 
//               onClick={() => setIsDropdownOpen(false)}
//               className="block px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-blue-50 hover:text-[#00a0ef] transition-colors"
//             >
//               New Valuation
//             </Link>
//             <Link 
//               href="/s/new-customer" 
//               onClick={() => setIsDropdownOpen(false)}
//               className="block px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-blue-50 hover:text-[#00a0ef] transition-colors"
//             >
//               New Customer
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* --- Notification Bell --- */}
//       <button className="p-1.5 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors">
//         <Bell className="w-4 h-4" />
//       </button>

//       {/* --- User Avatar --- */}
//       <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border border-gray-200 shrink-0">
//         <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover" />
//       </div>

//     </div>
//    </header>
//    </>
//   )
// }

'use client';
import { Plus, Bell, ChevronDown, LogOut } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { auth } from '@/app/lib/firebase/firebase'; 
import { logoutUser } from '@/app/lib/firebase/authUtils'; // Adjust import path to match your file structure
import { onAuthStateChanged } from 'firebase/auth';

const LIGHT_GRADIENTS = [
  "bg-gradient-to-br from-blue-100 to-cyan-200 text-blue-700",
  "bg-gradient-to-br from-emerald-100 to-teal-200 text-emerald-700",
  "bg-gradient-to-br from-rose-100 to-pink-200 text-rose-700",
  "bg-gradient-to-br from-purple-100 to-fuchsia-200 text-purple-700",
  "bg-gradient-to-br from-amber-100 to-yellow-200 text-amber-700"
];

export default function Navbar() {
  const router = useRouter();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const [initials, setInitials] = useState("U");
  const [profileGradient, setProfileGradient] = useState(LIGHT_GRADIENTS[0]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setProfileGradient(LIGHT_GRADIENTS[Math.floor(Math.random() * LIGHT_GRADIENTS.length)]);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.displayName || user.email || "User";
        setInitials(name.substring(0, 2).toUpperCase());
      }
    });
    
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
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

            {isDropdownOpen && (
              <div className="absolute md:right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-1.5 z-50 overflow-hidden">
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

          {/* --- User Profile & Logout --- */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold text-sm shadow-sm transition-transform hover:scale-105 border border-white ${profileGradient}`}
            >
              {initials}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-1.5 z-50 overflow-hidden">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

        </div>
      </header>
    </>
  );
}