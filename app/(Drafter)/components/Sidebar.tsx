'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, ClipboardCheck, X } from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  desktopCollapsed: boolean;
}

export default function Sidebar({ mobileOpen, setMobileOpen, desktopCollapsed }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/d/dashboard', icon: Home },
    { name: 'Assigned',  href: '/d/assigned',  icon: FileText },
    { name: 'Completed', href: '/d/completed', icon: ClipboardCheck },
  ];

  return (
    <>
      {/* ── Mobile backdrop ───────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ───────────────────────────────────────────────────── */}
      {/*
        MOBILE  (< md): fixed overlay, always w-64, slides in/out via translate
        DESKTOP (≥ md): part of flex flow, collapses width w-64 ↔ w-16 via desktopCollapsed
        transition-all animates both the translate (mobile) and width (desktop) smoothly
      */}
      <aside
        className={[
          // ── shared ──────────────────────────────────────────────────
          'bg-[#f9fafb] border-r border-gray-200 flex flex-col',
          'transition-all duration-300 ease-in-out overflow-hidden',
          // ── mobile: fixed overlay ────────────────────────────────────
          'fixed top-0 left-0 z-50 h-screen w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          // ── desktop: in-flow, collapses ──────────────────────────────
          'md:relative md:translate-x-0 md:z-auto md:h-screen md:shrink-0',
          desktopCollapsed ? 'md:w-16' : 'md:w-64',
        ].join(' ')}
      >

        {/* ── Logo row ──────────────────────────────────────────────── */}
        <div className={[
          'h-[50px] flex items-center shrink-0 border-b border-gray-100',
          desktopCollapsed ? 'md:justify-center px-4' : 'px-6 justify-between',
          'justify-between px-6', // mobile always full
        ].join(' ')}>

          {/* Full wordmark — hidden on desktop when collapsed */}
          <h1 className={[
            'text-[20px] font-medium text-gray-900 tracking-tight whitespace-nowrap',
            desktopCollapsed ? 'md:hidden' : '',
          ].join(' ')}>
            DRAFTER
          </h1>

          {/* Single-letter fallback — desktop collapsed only */}
          {desktopCollapsed && (
            <span className="hidden md:block text-[20px] font-semibold text-gray-900">
              D
            </span>
          )}

          {/* X close — mobile only */}
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 text-gray-500 hover:bg-gray-200 rounded-md md:hidden transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Nav ───────────────────────────────────────────────────── */}
        <div className="flex-1 px-2 pt-4">

          {/* Section label — hidden on desktop when collapsed */}
          <p className={[
            'px-3 text-[11px] font-semibold text-gray-400 mb-3 tracking-widest uppercase whitespace-nowrap',
            desktopCollapsed ? 'md:hidden' : '',
          ].join(' ')}>
            General
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (pathname === '/' && item.name === 'Dashboard');
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  title={item.name}          /* tooltip when icon-only */
                  className={[
                    'flex items-center gap-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors',
                    // ── desktop collapsed: center icon, no horizontal padding waste ──
                    desktopCollapsed
                      ? 'md:justify-center md:px-0 px-3'
                      : 'px-3',
                    isActive
                      ? 'bg-[#f0f1f3] text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                  ].join(' ')}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 ${isActive ? 'text-gray-900' : 'text-gray-500'}`}
                    strokeWidth={2}
                  />

                  {/* Label — hidden on desktop when collapsed */}
                  <span className={[
                    'whitespace-nowrap',
                    desktopCollapsed ? 'md:hidden' : '',
                  ].join(' ')}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}