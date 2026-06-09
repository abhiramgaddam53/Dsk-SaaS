// ContactsPage.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, Download, Users, Briefcase, Star, Flame } from 'lucide-react';
import ContactsList from '../../../components/crm/contacts/ContactsList';
import CreateContactModal from '../../../components/crm/contacts/CreateContactModal';
import { Contact ,ContactStatus } from '../../../types/types';
import { mockContacts } from '@/app/(super-admin)/data/mockdata';
import ContactsKanban from '@/app/(super-admin)/components/crm/contacts/ContactsKanban';
 
export default function ContactsPage() {
    const [viewType, setViewType] = useState<'list' | 'kanban'>('list');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('All');
    
    const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  
    const topTabs = [
      { name: 'All', icon: Users },
      { name: 'Leads', icon: Briefcase },
      { name: 'Sales Qualified Leads', icon: Star },
      { name: 'Customers', icon: Briefcase },
      { name: 'Hotlist', icon: Flame },
    ];
  
    const filteredContacts = useMemo(() => {
      switch (activeTab) {
        case 'Leads':
        case 'Sales Qualified Leads':
          return contacts.filter(c => 
            ['New-Lead', 'Interested', 'Contacted', 'Qualified', 'Un-Qualified'].includes(c.status)
          );
        case 'Customers':
          return contacts.filter(c => 
            ['Won Lead', 'Lost Lead'].includes(c.status)
          );
        case 'All':
        default:
          return contacts;
      }
    }, [contacts, activeTab]);
  
    const handleStatusChange = (contactId: string, newStatus: ContactStatus) => {
      setContacts(prev => 
        prev.map(contact => 
          contact.id === contactId ? { ...contact, status: newStatus } : contact
        )
      );
    };
  
    return (
      <div className="flex flex-col h-full bg-white px-4 md:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your customer relationships</p>
        </div>
  
        <div className="flex items-center justify-between gap-4 mb-4 bg-gray-50/50 p-2 rounded-lg border border-gray-100">
        <div className="relative flex-1 max-w-3xl">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
  <input
    type="text"
    placeholder="Search Contacts by Name, Email or Company"
    className="w-full text-black pl-10 pr-4 py-2.5 bg-gradient-to-r from-white to-[#E8F0FE] border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
  />
</div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1B65D5] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shrink-0"
          >
            <Plus size={18} />
            New Contact
          </button>
        </div>
  
        <div className="flex items-center gap-6 py-2 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
          {topTabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 pb-2 text-sm font-medium whitespace-nowrap transition-colors relative
                ${activeTab === tab.name ? 'text-[#1B65D5]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <tab.icon size={16} className="shrink-0" />
              <span>{tab.name}</span>
              {activeTab === tab.name && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1B65D5] rounded-t-full"></span>
              )}
            </button>
          ))}
        </div>
  
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setViewType('list')}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${viewType === 'list' ? 'border-[#1B65D5] text-[#1B65D5]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              List View
            </button>
            <button 
              onClick={() => setViewType('kanban')}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${viewType === 'kanban' ? 'border-[#1B65D5] text-[#1B65D5]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              Kanban
            </button>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
              <Download size={16} />
              Import/Export
            </button>
            <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>
  
        {viewType === 'list' ? (
          <ContactsList contacts={filteredContacts} onStatusChange={handleStatusChange} />
        ) : (
          <ContactsKanban contacts={filteredContacts} onStatusChange={handleStatusChange} />
        )}
  
        <CreateContactModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    );
  }
// mockData.ts
 