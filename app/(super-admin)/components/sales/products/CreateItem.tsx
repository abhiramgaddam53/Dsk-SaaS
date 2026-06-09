// CreateItem.tsx
import React, { useState } from 'react';
import { X, Users, Plus, Bold, Italic, Underline, Strikethrough, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify, Type, Code } from 'lucide-react';
import AddVariantModal from './AddVariantModal';

interface CreateItemProps {
  onBack: () => void;
}

export default function CreateItem({ onBack }: CreateItemProps) {
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full bg-white px-4 md:px-8 py-6 max-w-5xl mx-auto min-h-screen">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Item</h1>
          <p className="text-sm text-gray-500 mt-1">Lorem ipsum dolor sit amet consectetur</p>
        </div>
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100">
          <X size={24} />
        </button>
      </div>

      <div className="mb-8">
        <input 
          type="text" 
          placeholder="Item Title" 
          className="w-full text-3xl font-bold text-gray-900 placeholder-gray-300 border-none focus:ring-0 p-0 mb-6 focus:outline-none"
        />
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
            <Users size={16} />
            Category
          </button>
          <button className="px-5 py-2 bg-green-50 border border-green-200 text-green-600 text-sm font-semibold rounded-md">
            Active
          </button>
          <button 
            onClick={() => setIsVariantModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Variant
          </button>
          <span className="text-xs text-gray-400 ml-2">A New Variant will be added to the item</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Description of the Item <span className="text-red-500">*</span></label>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50/50">
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded text-sm font-semibold">H1</button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded text-sm font-semibold">H2</button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded text-sm font-semibold">H3</button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded text-sm font-semibold">H4</button>
              <div className="w-px h-5 bg-gray-300 mx-1"></div>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Bold size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Italic size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Underline size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Strikethrough size={16} /></button>
              <div className="w-px h-5 bg-gray-300 mx-1"></div>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><List size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><ListOrdered size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><AlignLeft size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><AlignCenter size={16} /></button>
              <div className="w-px h-5 bg-gray-300 mx-1"></div>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><AlignRight size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><AlignJustify size={16} /></button>
              <div className="w-px h-5 bg-gray-300 mx-1"></div>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Type size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Code size={16} /></button>
            </div>
            <textarea 
              rows={8}
              placeholder="Add Item Description"
              className="w-full p-4 focus:outline-none resize-none text-sm text-gray-700"
            ></textarea>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Purchase Price <span className="text-red-500">*</span></label>
            <input 
              type="number" 
              placeholder="Enter Purchase Price" 
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Selling Price <span className="text-red-500">*</span></label>
            <input 
              type="number" 
              placeholder="Enter Selling Price" 
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
          <span className="text-sm font-medium text-gray-900">Tax Inclusive</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">HSN/SAC Code</label>
          <input 
            type="text" 
            placeholder="Enter HSN/SAC Code" 
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Barcode</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter or Generate a Barcode" 
              className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0">
              Generate Barcode
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary Unit</label>
          <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-white">
            <option>OTH-OTHERS</option>
          </select>
        </div>

        <div className="flex gap-4 pt-8 pb-4">
          <button 
            onClick={onBack}
            className="flex-1 py-3 bg-white border border-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Create Item
          </button>
        </div>
      </div>

      <AddVariantModal isOpen={isVariantModalOpen} onClose={() => setIsVariantModalOpen(false)} />
    </div>
  );
}