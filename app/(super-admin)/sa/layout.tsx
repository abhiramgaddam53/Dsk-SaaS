'use client'
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Inter } from 'next/font/google';
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  return (
    <div className= {`${inter.className} flex h-screen w-full bg-gray-50 overflow-hidden`}>
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar toggleMobile={() => setIsMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto ">
          {children}
        </main>
      </div>
    </div>
  );
}