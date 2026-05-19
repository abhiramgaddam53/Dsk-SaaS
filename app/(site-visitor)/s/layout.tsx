import React from 'react';
import Navbar from '@/app/(site-visitor)/components/Navbar'; // Adjust the import path based on your project structure

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
}