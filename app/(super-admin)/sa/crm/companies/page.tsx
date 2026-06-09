// CompanyDetailsPage.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { User, Clock, Edit } from 'lucide-react';
import CompanyDealsList from '../../../components/crm/company/CompanyDealsList';
import CompanyContactsList from '../../../components/crm/company/CompanyContactsList';
import { CompanyDetails, CompanyDeal, CompanyContact, DealStage } from '../../../types/types';
import {mockContacts , mockDeals} from '../../../data/mockdata';
import CompanyActivities from '@/app/(super-admin)/components/crm/company/CompanyActivities';
import CompanyFolderManager from '@/app/(super-admin)/components/crm/company/CompanyFolderManager';

const TABS = ['All Details', 'Deals', 'Contacts', 'Activities', 'Folder', 'Notes'];

export default function CompanyDetailsPage() {
  const [activeTab, setActiveTab] = useState('Deals');
  
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);
  const [deals, setDeals] = useState<CompanyDeal[]>([]);
  const [contacts, setContacts] = useState<CompanyContact[]>([]);

// setContacts(mockContacts);
// setDeals(mockDeals);
  useEffect(() => {
    const fetchCompanyData = async () => {
      setCompanyDetails({
        id: '1',
        name: 'Aniflex Studios',
        industry: 'Animation Services',
        website: 'www.aniflex.com',
        location: 'Mumbai, Maharastra',
        country: 'India',
        state: 'Maharastra',
        postalCode: '400200',
        fullAddress: 'Office no. 32, Thane, Mumbai, Maharastra, 400200, India',
        lastUpdatedText: 'Last Updated 3 Days Ago',
        assignedUser: 'Pradhyumn Dhondi',
        assignedDate: 'Nov 24, 2025, 11:24 P.M'
      });

      // Added mock data for deals
      setDeals([
        { id: '1', name: 'Manufacturing Service', stage: 'Onboarding', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
        { id: '2', name: 'Manufacturing Service', stage: 'Project Kick-Off', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
        { id: '3', name: 'Manufacturing Service', stage: 'Project Initiation', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
        { id: '4', name: 'Manufacturing Service', stage: 'In-Progress', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
        { id: '5', name: 'Manufacturing Service', stage: 'Project Complete', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
        { id: '6', name: 'Manufacturing Service', stage: 'Onboarding', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
      ]);

      // Added mock data for contacts
      setContacts(Array(12).fill(null).map((_, i) => ({
        id: `c-${i}`,
        name: 'Pradhyumn Dhondi',
        email: 'pradhyumndhondi@gmail.com',
        phone: '+91 9966701124'
      })));
    };
    
    fetchCompanyData();
  }, []);

  const handleStatusChange = (dealId: string, newStage: DealStage) => {
    setDeals(prev => prev.map(deal => deal.id === dealId ? { ...deal, stage: newStage } : deal));
  };

  if (!companyDetails) {
    return <div className="p-8 text-center text-gray-500">Loading company details...</div>;
  }

  return (
    // Replaced min-h-full with min-h-screen and added overflow-x-hidden to prevent horizontal blowouts from Kanban
    <div className="flex flex-col min-h-screen bg-white px-4 md:px-8 py-6 max-w-7xl mx-auto w-full overflow-x-hidden">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-900 overflow-hidden shrink-0 flex items-center justify-center text-white">
             {companyDetails.avatarUrl ? (
                <img src={companyDetails.avatarUrl} alt={companyDetails.name} className="w-full h-full object-cover" />
             ) : (
                <span className="text-xl font-bold">{companyDetails.name.charAt(0)}</span>
             )}
          </div>
          <div>
             <h1 className="text-2xl font-semibold text-gray-900">{companyDetails.name}</h1>
             <p className="text-xs text-gray-500 mt-1">{companyDetails.lastUpdatedText}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-600 flex-wrap">
           <div className="flex items-center gap-2">
              <User size={16} className="text-gray-400" />
              <span>{companyDetails.assignedUser}</span>
           </div>
           <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <span>{companyDetails.assignedDate}</span>
           </div>
           <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium">
              <Edit size={16} />
              <span>Edit</span>
           </button>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-10 text-sm">
        <div className="grid grid-cols-[120px_1fr] items-baseline">
          <span className="font-semibold text-gray-900">Company Name</span>
          <span className="text-gray-600">{companyDetails.name}</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] items-baseline">
          <span className="font-semibold text-gray-900">Industry</span>
          <span className="text-gray-600">{companyDetails.industry}</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] items-baseline">
          <span className="font-semibold text-gray-900">Website</span>
          <span className="text-gray-600">{companyDetails.website}</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] items-baseline">
          <span className="font-semibold text-gray-900">Location</span>
          <span className="text-gray-600">{companyDetails.location}</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] items-baseline">
          <span className="font-semibold text-gray-900">Country</span>
          <span className="text-gray-600">{companyDetails.country}</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] items-baseline">
          <span className="font-semibold text-gray-900">State</span>
          <span className="text-gray-600">{companyDetails.state}</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] items-baseline">
          <span className="font-semibold text-gray-900">Postal Code</span>
          <span className="text-gray-600">{companyDetails.postalCode}</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] items-baseline">
          <span className="font-semibold text-gray-900">Full Address</span>
          <span className="text-gray-600">{companyDetails.fullAddress}</span>
        </div>
      </div>

      {/* Tabs */}
      {/* Ensure width is w-full and uses overflow-x-auto properly to stop tab squishing */}
      <div className="w-full border-b border-gray-200 mb-6">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors relative
                ${activeTab === tab ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Area */}
      {/* min-w-0 forces the container to not expand past its parent's width, fixing the zoom issue */}
      <div className="w-full min-w-0 flex-1">
        {activeTab === 'Deals' && (
           <CompanyDealsList deals={deals} onStatusChange={handleStatusChange} />
        )}
        
        {activeTab === 'Contacts' && (
           <CompanyContactsList contacts={contacts} />
        )}

        {activeTab === 'Activities' && (
          <CompanyActivities />
        )}
        
        {activeTab === 'Folder' && (
          <CompanyFolderManager />
        )}

        {['All Details', 'Notes'].includes(activeTab) && (
           <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
              Content for {activeTab} will be populated via API.
           </div>
        )}
      </div>

    </div>
  );
}