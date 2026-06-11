import React from 'react';
import {
  PanelLeftClose, PanelLeftOpen, User, Users, FileText,
  Network, Building2, Contact2, Handshake, Box,
  Database, LineChart, Settings, LucideIcon
} from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isMobileOpen: boolean;
}

interface MenuItem {
  name: string;
  icon: LucideIcon;
  href: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export default function Sidebar({ isCollapsed, toggleCollapse, isMobileOpen }: SidebarProps) {
  const menuItems: MenuSection[] = [
    { title: 'GENERAL', items: [
      { name: 'Overview', icon: User , href :"/sa/gen/overview" },
      // { name: 'User Management', icon: Users ,href :"/sa/gen/users"},
      { name: 'Reports', icon: FileText ,href :"/sa/gen/reports"},
     ]},
    { title: 'CRM', items: [
       { name: 'Contacts', icon: Contact2,href :"/sa/crm/contacts" },
      { name: 'Deals', icon: Handshake,href :"/sa/crm/deals" },
    ]},
    { title: 'SALES', items: [
      { name: 'Products & Services', icon: Box,href :"/sa/sales/products" },
      { name: 'Invoices', icon: Database, href :"/sa/sales/invoices" },
       
    ]}
  ];

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-[#F4F5F7] border-r border-gray-200 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-58'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 min-h-[64px]">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'hidden' : 'flex'}`}>
          <div className="w-5 h-5 rounded-full border-[1.5px] border-gray-800"></div>
          <span className="font-bold text-gray-900 text-sm tracking-wide">DS KRISHNA</span>
        </div>
        <button 
          onClick={toggleCollapse} 
          className="hidden lg:flex p-1.5 hover:bg-gray-200 rounded-md text-gray-600 transition-colors mx-auto"
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 scrollbar-hide">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            {!isCollapsed && (
              <h3 className="px-6 mb-3 text-xs font-semibold text-gray-400 tracking-wider">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link href={item.href } className={`flex items-center gap-4 px-6 py-2.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors
                    ${isCollapsed ? 'justify-center px-0' : ''}
                  `}>
                    <item.icon size={20} strokeWidth={1.5} className="shrink-0" />
                    {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}