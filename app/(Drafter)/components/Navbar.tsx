 
'use client';

import { PanelLeft, Bell, ChevronRight, Plus, ChevronDown, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react'; 
import { useRouter } from 'next/navigation';
import { auth } from '@/app/lib/firebase/firebase'; 
import { logoutUser } from '@/app/lib/firebase/authUtils';
import { onAuthStateChanged } from 'firebase/auth';

interface NavbarProps {
  onMenuClick: () => void;
}

const LIGHT_GRADIENTS = [
  "bg-gradient-to-br from-blue-100 to-cyan-200 text-blue-700",
  "bg-gradient-to-br from-emerald-100 to-teal-200 text-emerald-700",
  "bg-gradient-to-br from-rose-100 to-pink-200 text-rose-700",
  "bg-gradient-to-br from-purple-100 to-fuchsia-200 text-purple-700",
  "bg-gradient-to-br from-amber-100 to-yellow-200 text-amber-700"
];
export default function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [initials, setInitials] = useState("U");
    const [profileGradient, setProfileGradient] = useState(LIGHT_GRADIENTS[0]);
  
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
  // Split the pathname into segments and remove empty strings/route group identifiers
  const segments = pathname.split('/').filter((p) => p !== '' && p !== 'd' && !p.startsWith('('));
    const router = useRouter();
  // Helper function to capitalize and format the URL segments
  const formatSegment = (segment: string) => {
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
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

  return (
    <header className="h-[50px] bg-white flex items-center justify-between px-6 w-full shrink-0 border-b border-gray-100 md:border-none">
      
      {/* Menu Button & Dynamic Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-1.5 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center "
        >
          <PanelLeft className="w-5 h-5" strokeWidth={2} />
        </button>

        <nav className=" md:flex hidden items-center text-[13px] font-medium text-gray-500">
          {segments.length === 0 ? (
            <span className="text-gray-900 text-[15px] font-semibold">Dashboard</span>
          ) : (
            segments.map((segment, index) => {
              const isLast = index === segments.length - 1;
              // Reconstruct the URL for the Link up to this segment
              const href = `/d/${segments.slice(0, index + 1).join('/')}`;

              return (
                <div key={href} className="flex items-center">
                  {index > 0 && <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
                  
                  {isLast ? (
                    <span className="text-gray-900 text-[15px] font-semibold">{formatSegment(segment)}</span>
                  ) : (
                    <Link href={href} className="hover:text-gray-900 transition-colors">
                      {formatSegment(segment)}
                    </Link>
                  )}
                </div>
              );
            })
          )}
        </nav>
      </div>
      
      {/* Right Side Icons */}
      <div className="flex items-center gap-3">
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

       <button className="p-1.5 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50">
         <Bell className="w-4 h-4" />
       </button>
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
  );
}