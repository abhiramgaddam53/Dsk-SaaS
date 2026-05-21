 
'use client';
// app/layout.tsx (or app/(dashboard)/layout.tsx)
import React, { useState } from 'react';
import Sidebar from '@/app/(Drafter)/components/Sidebar';
import Navbar  from '@/app/(Drafter)/components/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen,       setMobileOpen]       = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  const handleMenuClick = () => {
    if (window.innerWidth >= 768) {
      // Desktop → toggle icon-only collapse
      setDesktopCollapsed((prev) => !prev);
    } else {
      // Mobile → toggle drawer overlay
      setMobileOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900 overflow-hidden">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        desktopCollapsed={desktopCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Navbar onMenuClick={handleMenuClick} />
        <main className="flex-1 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}