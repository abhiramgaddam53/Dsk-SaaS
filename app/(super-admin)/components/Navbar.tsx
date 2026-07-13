 
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Plus,
  Building2, 
  Contact as ContactIcon, 
  Handshake, 
  FileText, 
  FileSpreadsheet, 
  Info, 
  X,
  LogOut
} from 'lucide-react';
import CreateInvoice from '../components/sales/invoices/CreateInvoice';  
import { usePathname, useRouter } from "next/navigation";  
import { logoutUser } from '@/app/lib/firebase/authUtils';
import { auth } from '@/app/lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
interface NavbarProps {
  toggleMobile: () => void;
}

// ─── TYPES & INTERFACES ──────────────────────────────────────────────────
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CreateContactProps extends ModalProps {
  onOpenCompany: () => void;
}

interface CreateDealProps extends ModalProps {
  onOpenCompany: () => void;
  onOpenContact: () => void;
  onOpenStatus: () => void;
}

// ─── COMPANY MODAL ───────────────────────────────────────────────────────
const CreateCompanyModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-md flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl   text-gray-900">Create New Company</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Company Name <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter Company Name" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700" />
          </div>
          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Industry <span className="text-red-500">*</span></label>
            <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-500 appearance-none bg-white">
              <option>Select Industry</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">GSTIN <span className="text-red-500">*</span></label>
            <input type="text" placeholder="eg. 1234567890" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700" />
          </div>
          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Address <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter Address Here" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700" />
          </div>
          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Website <span className="text-red-500">*</span></label>
            <input type="text" placeholder="www.datacircles.in" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700" />
          </div>
          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Profile Picture <span className="text-red-500">*</span></label>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              <button className="px-4 py-2.5 bg-gray-50/50 border-r border-gray-200 text-gray-400 text-sm font-medium hover:bg-gray-100 transition-colors">Choose File</button>
              <div className="flex-1 px-4 py-2.5 text-sm text-gray-400 bg-white">No File Chosen</div>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-gray-100 flex gap-4 bg-gray-50/30 shrink-0">
          <button onClick={onClose} className="flex-1 py-3 border border-gray-200 bg-white text-gray-800   rounded-xl hover:bg-gray-50 transition-colors text-sm">
            Cancel
          </button>
          <button className="flex-1 py-3 bg-[#1B65D5] text-white   rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm">
            Create Company
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── CONTACT MODAL ───────────────────────────────────────────────────────
const CreateContactModal = ({ isOpen, onClose, onOpenCompany }: CreateContactProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[105] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-md flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl   text-gray-900">Create New Contact</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Full Name <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter Full Name" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700" />
          </div>
          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Email <span className="text-red-500">*</span></label>
            <input type="email" placeholder="example@gmail.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700" />
          </div>
          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Phone <span className="text-red-500">*</span></label>
            <input type="tel" placeholder="+91 123456789" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700" />
          </div>
          
          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Company <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <select className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-400 appearance-none bg-white">
                <option>Select Company</option>
              </select>
              {/* This Plus button triggers the sub-modal over the current one */}
              <button 
                onClick={onOpenCompany}
                className="w-[42px] h-[42px] shrink-0 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Profile Picture <span className="text-red-500">*</span></label>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              <button className="px-4 py-2.5 bg-gray-50/50 border-r border-gray-200 text-gray-400 text-sm font-medium hover:bg-gray-100 transition-colors">Choose File</button>
              <div className="flex-1 px-4 py-2.5 text-sm text-gray-400 bg-white">No File Chosen</div>
            </div>
            <p className="text-[11px] text-gray-400 mt-2 font-medium">PNG, JPEG upto 5MB</p>
          </div>
        </div>

        <div className="p-5 border-t border-gray-100 flex gap-4 bg-gray-50/30 shrink-0">
          <button onClick={onClose} className="flex-1 py-3 border border-gray-200 bg-white text-gray-800   rounded-xl hover:bg-gray-50 transition-colors text-sm">
            Cancel
          </button>
          <button className="flex-1 py-3 bg-[#1B65D5] text-white   rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm">
            Create New Contact
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── DEAL MODAL ──────────────────────────────────────────────────────────
const CreateDealModal = ({ isOpen, onClose, onOpenCompany, onOpenContact, onOpenStatus }: CreateDealProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-md flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl   text-gray-900">Create New Deal</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Deal Made <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter Deal Title" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700" />
          </div>
          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Amount <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter Deal Amount" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700" />
          </div>
          
          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Status <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <select className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-400 appearance-none bg-white">
                <option>Choose Status of the Deal</option>
              </select>
              <button 
                onClick={onOpenStatus}
                className="w-[42px] h-[42px] shrink-0 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Company <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <select className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-400 appearance-none bg-white">
                <option>Select Company</option>
              </select>
              <button 
                onClick={onOpenCompany}
                className="w-[42px] h-[42px] shrink-0 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[13px]   text-gray-900 mb-1.5">Contact <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <select className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-400 appearance-none bg-white">
                <option>Choose Contact</option>
              </select>
              <button 
                onClick={onOpenContact}
                className="w-[42px] h-[42px] shrink-0 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-gray-100 flex gap-4 bg-gray-50/30 shrink-0">
          <button onClick={onClose} className="flex-1 py-3 border border-gray-200 bg-white text-gray-800   rounded-xl hover:bg-gray-50 transition-colors text-sm">
            Cancel
          </button>
          <button className="flex-1 py-3 bg-[#1B65D5] text-white   rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm">
            Create New Deal
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── INVOICE MODAL WRAPPER ───────────────────────────────────────────────
const CreateInvoiceModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[110] flex items-center justify-center p-4 md:p-8 backdrop-blur-sm">
      {/* Container scales large to accommodate the 2-column invoice UI */}
      <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-5xl flex flex-col max-h-[95vh] overflow-y-auto overflow-x-hidden relative">
        <CreateInvoice onBack={onClose} />
      </div>
    </div>
  );
};


// ─── NAVBAR & DROPDOWN COMPONENT ─────────────────────────────────────────
export default function Navbar({ toggleMobile }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter() ;
  // Modal States
  const [modals, setModals] = useState({
    company: false,
    contact: false,
    deal: false,
    invoice: false,  
  });

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

  const openModal = (modalName: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
    setIsDropdownOpen(false); // Close dropdown when a modal opens
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };
  const LIGHT_GRADIENTS = [
    "bg-gradient-to-br from-blue-100 to-cyan-200 text-blue-700",
    "bg-gradient-to-br from-emerald-100 to-teal-200 text-emerald-700",
    "bg-gradient-to-br from-rose-100 to-pink-200 text-rose-700",
    "bg-gradient-to-br from-purple-100 to-fuchsia-200 text-purple-700",
    "bg-gradient-to-br from-amber-100 to-yellow-200 text-amber-700"
  ];
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
        const pathname = usePathname();
      
    // Split the pathname into segments and remove empty strings/route group identifiers
    const segments = pathname.split('/').filter((p) => p !== '' && p !== 'd' && !p.startsWith('('));
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
  return (
    <>
      <header className="flex items-center justify-between px-4 md:px-6 h-16 bg-white border-b border-gray-200 shrink-0 relative z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMobile}
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-base md:text-lg   text-gray-900">Dashboard</h1>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search Companies, Deals, Contacts"
              className="w-72 lg:w-96 pl-9 pr-4 py-2 bg-[#F8F9FB] border border-gray-200 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B65D5]/50 focus:border-[#1B65D5] transition-all"
            />
          </div>
          
          {/* Dropdown Wrapper */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#1B65D5] hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm"
            >
              <Plus size={18} />
              New
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-[260px] bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 py-3 overflow-hidden">
                
                <div className="px-5 py-2 text-[13px]   text-gray-500 tracking-wide">
                  Add Records
                </div>
                
                <div className="flex flex-col">
                  <button onClick={() => openModal('company')} className="w-full flex items-center gap-3.5 px-5 py-3 hover:bg-gray-50 transition-colors text-left group">
                    <Building2 size={20} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
                    <span className="text-[15px]   text-gray-900">Company</span>
                  </button>
                  <button onClick={() => openModal('contact')} className="w-full flex items-center gap-3.5 px-5 py-3 hover:bg-gray-50 transition-colors text-left group">
                    <ContactIcon size={20} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
                    <span className="text-[15px]   text-gray-900">Contact</span>
                  </button>
                  <button onClick={() => openModal('deal')} className="w-full flex items-center gap-3.5 px-5 py-3 hover:bg-gray-50 transition-colors text-left group">
                    <Handshake size={20} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
                    <span className="text-[15px]   text-gray-900">Deal</span>
                  </button>
                  {/* Imported Invoice component trigger */}
                  <button onClick={() => openModal('invoice')} className="w-full flex items-center gap-3.5 px-5 py-3 hover:bg-gray-50 transition-colors text-left group">
                    <FileText size={20} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
                    <span className="text-[15px]   text-gray-900">Invoice</span>
                  </button>
                </div>

                <div className="px-5 py-3 text-[13px]   text-gray-500 tracking-wide border-t border-gray-100 mt-1">
                  Add Entry
                </div>

                <div className="flex flex-col">
                  {/* Empty triggers for now as requested */}
                  <button onClick={()=>{router.push('/s/new-valuation')}} className="w-full flex items-center gap-3.5 px-5 py-3 hover:bg-gray-50 transition-colors text-left group">
                    <FileSpreadsheet size={20} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
                    <span className="text-[15px]   text-gray-900">Valuation Entry</span>
                  </button>
                  <button onClick={()=>{router.push('/s/new-customer')}}  className="w-full flex items-center gap-3.5 px-5 py-3 hover:bg-gray-50 transition-colors text-left group">
                    <FileSpreadsheet size={20} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
                    <span className="text-[15px]   text-gray-900">Customer Entry</span>
                  </button>
                </div>

                <div className="mt-2 border-t border-gray-100 pt-3 px-5 pb-1">
                  <button className="w-full flex items-center gap-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors text-left">
                    <Info size={16} />
                    Learn about & records & activities
                  </button>
                </div>

              </div>
            )}
          </div>
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

      {/* ── Render Modals ───────────────────────────────────────────────── */}
      <CreateCompanyModal 
        isOpen={modals.company} 
        onClose={() => closeModal('company')} 
      />

      <CreateContactModal 
        isOpen={modals.contact} 
        onClose={() => closeModal('contact')} 
        onOpenCompany={() => openModal('company')}
      />

      <CreateDealModal 
        isOpen={modals.deal} 
        onClose={() => closeModal('deal')} 
        onOpenCompany={() => openModal('company')}
        onOpenContact={() => openModal('contact')}
        onOpenStatus={() => console.log('Status Modal Placeholder')}
      />

      <CreateInvoiceModal 
        isOpen={modals.invoice} 
        onClose={() => closeModal('invoice')} 
      />
    </>
  );
}