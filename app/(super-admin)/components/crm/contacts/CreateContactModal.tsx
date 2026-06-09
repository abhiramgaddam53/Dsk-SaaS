// CreateContactModal.tsx
import React from 'react';
import { Plus, X } from 'lucide-react';

interface CreateContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateContactModal({ isOpen, onClose }: CreateContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 overflow-y-auto scrollbar-hide flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Create New Contact</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="+91 123456789"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm text-gray-500 bg-white">
                  <option value="">Select Company</option>
                </select>
                <button type="button" className="p-2 border border-gray-200 bg-gray-50 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500">
                <button type="button" className="px-4 py-2 bg-gray-50 border-r border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  Choose File
                </button>
                <span className="px-3 py-2 text-sm text-gray-500 flex-1 truncate">No File Chosen</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">PNG, JPEG upto 5MB</p>
            </div>
          </form>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex gap-3 bg-white">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button 
            className="flex-1 px-4 py-2.5 bg-[#1B65D5] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Create New Contact
          </button>
        </div>
      </div>
    </div>
  );
}