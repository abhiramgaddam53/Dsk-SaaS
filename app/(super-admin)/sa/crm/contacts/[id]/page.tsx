// // CompanyDetailsPage.tsx
// "use client";

// import React, { useState, useEffect, useMemo } from 'react';
// import { User, Clock, Edit, MoreVertical } from 'lucide-react';
 
// import CompanyActivities from '@/app/(super-admin)/components/crm/company/CompanyActivities';
// import CompanyFolderManager from '@/app/(super-admin)/components/crm/company/CompanyFolderManager';
// import CompanyContactsList from '@/app/(super-admin)/components/crm/company/CompanyContactsList';
// import CompanyDealsList from '@/app/(super-admin)/components/crm/company/CompanyDealsList';
// import { CompanyDetails, CompanyDeal, CompanyContact, DealStage } from '@/app/(super-admin)/types/types';
// import InvoicesList from '@/app/(super-admin)/components/sales/invoices/InvoicesList';
// import { mockInvoices } from '@/app/(super-admin)/data/mockdata';
// import { InvoiceType, InvoiceStatus } from '@/app/(super-admin)/types/types';

// const TABS = [  'Deals', 'Contacts', 'Invoices' ,'Folder' ];

// export default function CompanyDetailsPage() {
//   const [activeTab, setActiveTab] = useState('Deals');
  
//   const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);
//   const [deals, setDeals] = useState<CompanyDeal[]>([]);
//   const [contacts, setContacts] = useState<CompanyContact[]>([]);
//     const [invoices, setInvoices] = useState(mockInvoices);
  
//  const filteredInvoices = useMemo(() => {
//      return invoices.filter(inv => inv.type === 'Invoice');
//    }, [invoices, activeTab]);
 
//    const handleInvoiceStatusChange = (id: string, status: InvoiceStatus) => {
//      setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
//    };
 
//   useEffect(() => {
//     const fetchCompanyData = async () => {
//       setCompanyDetails({
//         id: '1',
//         name: 'Aniflex Studios',
//         industry: 'Animation Services',
//         website: 'www.aniflex.com',
//         location: 'Mumbai, Maharastra',
//         country: 'India',
//         state: 'Maharastra',
//         postalCode: '400200',
//         fullAddress: 'Office no. 32, Thane, Mumbai, Maharastra, 400200, India',
//         lastUpdatedText: 'Last Updated 3 Days Ago',
//         assignedUser: 'Pradhyumn Dhondi',
//         assignedDate: 'Nov 24, 2025, 11:24 P.M'
//       });

//       // Added mock data for deals
//       setDeals([
//         { id: '1', name: 'Manufacturing Service', stage: 'Onboarding', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
//         { id: '2', name: 'Manufacturing Service', stage: 'Project Kick-Off', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
//         { id: '3', name: 'Manufacturing Service', stage: 'Project Initiation', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
//         { id: '4', name: 'Manufacturing Service', stage: 'In-Progress', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
//         { id: '5', name: 'Manufacturing Service', stage: 'Project Complete', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
//         { id: '6', name: 'Manufacturing Service', stage: 'Onboarding', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
//       ]);

//       // Added mock data for contacts
//       setContacts(Array(12).fill(null).map((_, i) => ({
//         id: `c-${i}`,
//         name: 'Pradhyumn Dhondi',
//         email: 'pradhyumndhondi@gmail.com',
//         phone: '+91 9966701124'
//       })));
//     };
    
//     fetchCompanyData();
//   }, []);

//   const handleStatusChange = (dealId: string, newStage: DealStage) => {
//     setDeals(prev => prev.map(deal => deal.id === dealId ? { ...deal, stage: newStage } : deal));
//   };

//   if (!companyDetails) {
//     return <div className="p-8 text-center text-gray-500">Loading company details...</div>;
//   }

//   return (
//     // Replaced min-h-full with min-h-screen and added overflow-x-hidden to prevent horizontal blowouts from Kanban
//     <div className="flex flex-col min-h-screen bg-white px-4 md:px-8 py-6 w-full overflow-x-hidden">
      
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 gap-6">
//         <div className="flex items-center gap-4">
//           <div className="w-14 h-14 rounded-full bg-gray-900 overflow-hidden shrink-0 flex items-center justify-center text-white">
//              {companyDetails.avatarUrl ? (
//                 <img src={companyDetails.avatarUrl} alt={companyDetails.name} className="w-full h-full object-cover" />
//              ) : (
//                 <span className="text-xl font-bold">{companyDetails.name.charAt(0)}</span>
//              )}
//           </div>
//           <div>
//              <h1 className="text-2xl font-semibold text-gray-900">{companyDetails.name}</h1>
//              <p className="text-xs text-gray-500 mt-1">{companyDetails.lastUpdatedText}</p>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-6 text-sm text-gray-600 flex-wrap">
//            <div className="flex items-center gap-2">
//               <User size={16} className="text-gray-400" />
//               <span>{companyDetails.assignedUser}</span>
//            </div>
//            <div className="flex items-center gap-2">
//               <Clock size={16} className="text-gray-400" />
//               <span>{companyDetails.assignedDate}</span>
//            </div>
//            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               <Edit size={16} />
//               <span>Edit</span>
//            </button>
//         </div>
//       </div>

//       {/* Details Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-10 text-sm">
//         <div className="grid grid-cols-[120px_1fr] items-baseline">
//           <span className="font-semibold text-gray-900">Company Name</span>
//           <span className="text-gray-600">{companyDetails.name}</span>
//         </div>
//         <div className="grid grid-cols-[120px_1fr] items-baseline">
//           <span className="font-semibold text-gray-900">Industry</span>
//           <span className="text-gray-600">{companyDetails.industry}</span>
//         </div>
//         <div className="grid grid-cols-[120px_1fr] items-baseline">
//           <span className="font-semibold text-gray-900">Website</span>
//           <span className="text-gray-600">{companyDetails.website}</span>
//         </div>
//         <div className="grid grid-cols-[120px_1fr] items-baseline">
//           <span className="font-semibold text-gray-900">Location</span>
//           <span className="text-gray-600">{companyDetails.location}</span>
//         </div>
//         <div className="grid grid-cols-[120px_1fr] items-baseline">
//           <span className="font-semibold text-gray-900">Country</span>
//           <span className="text-gray-600">{companyDetails.country}</span>
//         </div>
//         <div className="grid grid-cols-[120px_1fr] items-baseline">
//           <span className="font-semibold text-gray-900">State</span>
//           <span className="text-gray-600">{companyDetails.state}</span>
//         </div>
//         <div className="grid grid-cols-[120px_1fr] items-baseline">
//           <span className="font-semibold text-gray-900">Postal Code</span>
//           <span className="text-gray-600">{companyDetails.postalCode}</span>
//         </div>
//         <div className="grid grid-cols-[120px_1fr] items-baseline">
//           <span className="font-semibold text-gray-900">Full Address</span>
//           <span className="text-gray-600">{companyDetails.fullAddress}</span>
//         </div>
//       </div>
//       {/* KPI Payment Overview */}
//       <div className="mb-10">
//         <h2 className="text-sm font-semibold text-gray-900 mb-4">Payment Overview</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="p-5 rounded-xl bg-gradient-to-r from-white via-[#eceff6] to-[#e0e5f2]  border border-gray-100 bg-gray-50/50 relative">
//             <div className="flex justify-between items-center mb-6">
//               <p className="text-sm text-gray-600">Total Invoiced</p>
//               <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
//             </div>
//             <h2 className="text-3xl font-medium text-gray-800">₹2,37,038</h2>
//           </div>

//           <div className="p-5 rounded-xl border  bg-gradient-to-r from-white via-[#eceff6] to-[#e0e5f2]  border-gray-100 bg-gray-50/50 relative">
//             <div className="flex justify-between items-center mb-6">
//               <p className="text-sm text-gray-600">Amount Paid</p>
//               <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
//             </div>
//             <h2 className="text-3xl font-medium text-gray-800">₹2,98,520</h2>
//           </div>

//           <div className="p-5 rounded-xl border  bg-gradient-to-r from-white via-[#eceff6] to-[#e0e5f2]  border-gray-100 bg-gray-50/50 relative">
//             <div className="flex justify-between items-center mb-6">
//               <p className="text-sm text-gray-600">Amount Due</p>
//               <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
//             </div>
//             <h2 className="text-3xl font-medium text-gray-800">₹2,98,520</h2>
//           </div>

//           <div className="p-5 rounded-xl border  bg-gradient-to-r from-white via-[#eceff6] to-[#e0e5f2]  border-gray-100 bg-gray-50/50 relative">
//             <div className="flex justify-between items-center mb-6">
//               <p className="text-sm text-gray-600">Overdue</p>
//               <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
//             </div>
//             <h2 className="text-3xl font-medium text-gray-800">₹0</h2>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       {/* Ensure width is w-full and uses overflow-x-auto properly to stop tab squishing */}
//       <div className="w-full border-b border-gray-200 mb-6">
//         <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
//           {TABS.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors relative
//                 ${activeTab === tab ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
//             >
//               {tab}
//               {activeTab === tab && (
//                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Tab Content Area */}
//       {/* min-w-0 forces the container to not expand past its parent's width, fixing the zoom issue */}
//       <div className="w-full min-w-0 flex-1">
//         {activeTab === 'Deals' && (
//            <CompanyDealsList deals={deals} onStatusChange={handleStatusChange} />
//         )}
        
//         {activeTab === 'Contacts' && (
//            <CompanyContactsList contacts={contacts} />
//         )}

//         {activeTab === 'Invoices' && (
//            <InvoicesList invoices={filteredInvoices} onStatusChange={handleInvoiceStatusChange}  />
//         )}
        
//         {activeTab === 'Folder' && (
//           <CompanyFolderManager />
//         )}

//         {['All Details', 'Notes'].includes(activeTab) && (
//            <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
//               Content for {activeTab} will be populated via API.
//            </div>
//         )}
//       </div>

//     </div>
//   );
// }
 // CompanyDetailsPage.tsx
 // CompanyDetailsPage.tsx
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Edit, MoreVertical, Building2, Globe, MapPin } from 'lucide-react';
 
import CompanyFolderManager from '@/app/(super-admin)/components/crm/company/CompanyFolderManager';
import CompanyContactsList from '@/app/(super-admin)/components/crm/company/CompanyContactsList';
import CompanyDealsList from '@/app/(super-admin)/components/crm/company/CompanyDealsList';
import { CompanyDetails, CompanyDeal, CompanyContact, DealStage } from '@/app/(super-admin)/types/types';
import InvoicesList from '@/app/(super-admin)/components/sales/invoices/InvoicesList';
import { mockInvoices } from '@/app/(super-admin)/data/mockdata';
import { InvoiceStatus } from '@/app/(super-admin)/types/types';

const TABS = ['Deals', 'Contacts', 'Invoices', 'Folder'];

export default function CompanyDetailsPage() {
  const [activeTab, setActiveTab] = useState('Deals');
  
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);
  const [deals, setDeals] = useState<CompanyDeal[]>([]);
  const [contacts, setContacts] = useState<CompanyContact[]>([]);
  const [invoices, setInvoices] = useState(mockInvoices);
  
  const filteredInvoices = useMemo(() => {
     return invoices.filter(inv => inv.type === 'Invoice');
  }, [invoices, activeTab]);
 
  const handleInvoiceStatusChange = (id: string, status: InvoiceStatus) => {
     setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
  };
 
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

      setDeals([
        { id: '1', name: 'Manufacturing Service', stage: 'Onboarding', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
        { id: '2', name: 'Manufacturing Service', stage: 'Project Kick-Off', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
        { id: '3', name: 'Manufacturing Service', stage: 'Project Initiation', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
        { id: '4', name: 'Manufacturing Service', stage: 'In-Progress', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
        { id: '5', name: 'Manufacturing Service', stage: 'Project Complete', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
        { id: '6', name: 'Manufacturing Service', stage: 'Onboarding', amount: 75000, lastUpdated: 'Nov 24th, 2025' },
      ]);

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
    return <div className="p-8 text-center text-gray-500 font-medium">Loading company details...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-4 md:px-8 py-6 w-full max-w-[1600px] mx-auto overflow-x-hidden font-sans">
      
      {/* ── Header Section (Minimal Vertical Stacking) ── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 pb-6 border-b border-gray-100 gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium text-gray-800 tracking-tight">{companyDetails.name}</h1>
          
          {/* Vertical Detail Stack */}
          <div className="flex flex-col gap-2 mt-3">
            <span className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <Building2 size={16} className="text-gray-400" /> {companyDetails.industry}
            </span>
            <span className="flex items-center gap-2 text-sm text-[#1B65D5] font-medium cursor-pointer hover:underline">
              <Globe size={16} className="text-blue-400" /> {companyDetails.website}
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <MapPin size={16} className="text-gray-400" /> {companyDetails.location}
            </span>
          </div>

          <p className="text-[13px] text-gray-400 mt-4">
            Assigned to {companyDetails.assignedUser} &bull; {companyDetails.lastUpdatedText}
          </p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors shrink-0">
          <Edit size={16} />
          Edit Details
        </button>
      </div>

      {/* ── KPI Payment Overview (Slight Gradients) ── */}
      <div className="mb-10">
        <h2 className="text-base font-medium text-gray-800 mb-4">Payment Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50/80 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-600">Total Invoiced</span>
              <button className="text-gray-400 hover:text-gray-600 transition-colors"><MoreVertical size={16} /></button>
            </div>
            <h2 className="text-[30px] font-medium text-gray-800">₹2,37,038</h2>
          </div>

          <div className="p-5 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50/80 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-600">Amount Paid</span>
              <button className="text-gray-400 hover:text-gray-600 transition-colors"><MoreVertical size={16} /></button>
            </div>
            <h2 className="text-[30px] font-medium text-gray-800">₹2,98,520</h2>
          </div>

          <div className="p-5 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50/80 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-600">Amount Due</span>
              <button className="text-gray-400 hover:text-gray-600 transition-colors"><MoreVertical size={16} /></button>
            </div>
            <h2 className="text-[30px] font-medium text-gray-800">₹2,98,520</h2>
          </div>

          <div className="p-5 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50/80 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-600">Overdue</span>
              <button className="text-gray-400 hover:text-gray-600 transition-colors"><MoreVertical size={16} /></button>
            </div>
            <h2 className="text-[30px] font-medium text-gray-800">₹0</h2>
          </div>

        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center gap-6 py-2 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium whitespace-nowrap transition-colors relative
              ${activeTab === tab ? 'text-[#1B65D5]' : 'text-gray-500 hover:text-gray-800'}`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1B65D5] rounded-t-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* ── Tab Content Area ── */}
      <div className="w-full min-w-0 flex-1">
        {activeTab === 'Deals' && (
           <CompanyDealsList deals={deals} onStatusChange={handleStatusChange} />
        )}
        
        {activeTab === 'Contacts' && (
           <CompanyContactsList contacts={contacts} />
        )}

        {activeTab === 'Invoices' && (
           <InvoicesList invoices={filteredInvoices} onStatusChange={handleInvoiceStatusChange} />
        )}
        
        {activeTab === 'Folder' && (
          <CompanyFolderManager />
        )}
      </div>

    </div>
  );
}