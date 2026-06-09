// AddVariantModal.tsx
import React from 'react';
import { X, Users, Plus, Trash2 } from 'lucide-react';

interface AddVariantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddVariantModal({ isOpen, onClose }: AddVariantModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-start p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add New Variant</h2>
            <p className="text-sm text-gray-500 mt-1">Lorem ipsum dolor sit amet consectetur</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto scrollbar-hide flex-1">
          <div className="mb-6">
            <input 
              type="text" 
              placeholder="Variant Name" 
              className="w-full text-2xl font-semibold text-gray-900 placeholder-gray-300 border-none focus:ring-0 p-0 mb-4 focus:outline-none"
            />
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50 transition-colors">
                <Users size={14} />
                Selected Category
              </button>
              <button className="px-4 py-1.5 bg-green-50 border border-green-200 text-green-600 text-xs font-semibold rounded-md">
                Active
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">SKU</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter or Generate SKU" 
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0">
                  Generate SKU
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Purchase Price <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  placeholder="Enter Purchase Price" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Selling Price <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  placeholder="Enter Selling Price" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-3">Attributes <span className="text-red-500">*</span></label>
              <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-4">
                <Plus size={16} /> Add Attribute
              </button>
              
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  placeholder="Enter Attribute Name" 
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <input 
                  type="text" 
                  placeholder="Enter Attribute Value" 
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button className="p-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors shrink-0">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Stock</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-white">
                <option>0</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex gap-4 bg-gray-50/50">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button 
            className="flex-1 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-sm"
          >
            Add Variant
          </button>
        </div>
      </div>
    </div>
  );
}