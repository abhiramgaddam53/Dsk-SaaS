 
'use client';

import { PanelLeft, Bell, ChevronRight, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  
  // Split the pathname into segments and remove empty strings/route group identifiers
  const segments = pathname.split('/').filter((p) => p !== '' && p !== 'd' && !p.startsWith('('));

  // Helper function to capitalize and format the URL segments
  const formatSegment = (segment: string) => {
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
  };

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
  );
}