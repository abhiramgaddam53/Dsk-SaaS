// CreateInvoice.tsx
import React from 'react';
import { CornerUpLeft, Plus, Calendar, Search } from 'lucide-react';

interface CreateInvoiceProps {
  onBack: () => void;
}

export default function CreateInvoice({ onBack }: CreateInvoiceProps) {
  return (
    <div className="flex flex-col w-full bg-white px-4 md:px-8 py-6   min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Create New Invoice</h1>
          <p className="text-sm text-gray-500 mt-1">#INV-{`{ID}`}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm"
          >
            <CornerUpLeft size={16} />
            Back to Invoices
          </button>
          <button className="px-6 py-2 bg-blue-600 border border-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">
            Create Invoice
          </button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <label className="text-sm font-medium text-gray-900">Invoice Style <span className="text-red-500">*</span></label>
          <select className="border-none bg-transparent text-gray-400 text-sm focus:ring-0 outline-none cursor-pointer">
            <option>Select Style</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Deal Details */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Deal Details</h3>
              <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                <Plus size={12} /> Add New Deal
              </button>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Select Deal <span className="text-red-500">*</span></label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Choose Existing Deal" 
                  className="w-full pl-9 pr-4 py-2 text-black border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>

          {/* Other Details */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Other Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Invoice Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-transparent" />
                  <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Due Date</label>
                <div className="relative">
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-transparent" />
                  <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              {/* <div>
                <label className="block text-sm text-gray-700 mb-1.5">Receivers GSTIN <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter Receivers GSTIN..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xs text-gray-500 block mb-2">Tax Invoice</label>
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
          <span className="text-sm font-medium text-gray-900">Enable Tax Invoice</span>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Add Tax Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">Transaction Type <span className="text-red-500">*</span></label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-transparent">
              <option>Intra-State (CGST + SGST)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">GST Rate (%) <span className="text-red-500">*</span></label>
            <input type="number" defaultValue="18" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Add Items</h3>
          <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors">
            <Plus size={12} /> Add New Item
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">Select Item <span className="text-red-500">*</span></label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Choose Existing Item" className="w-full text-gray-700 pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">Description <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Add Item Description" className="w-full text-gray-700 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
        </div>

        <h4 className="text-sm font-medium text-gray-900 mb-4">Rate Details</h4>
        <div className="grid grid-cols-4 gap-4 items-end mb-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Rate (₹) <span className="text-red-500">*</span></label>
            <input type="number" placeholder="0" className="w-full px-3 text-gray-700 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Quantity</label>
            <input type="number" defaultValue="01" className="w-full px-3 text-gray-700 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">HSN/SAC</label>
            <input type="text" placeholder="HSN/SAC Code" className="w-full text-gray-700 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Discount</label>
            <div className="flex">
              <input type="number" placeholder="0" className="w-full text-gray-700 px-3 py-2 border border-gray-200 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              <span className="px-3 py-2 border-y border-r border-gray-200  bg-gray-50 rounded-r-lg text-sm text-gray-600">₹</span>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors">
          <Plus size={14} /> Add New Item
        </button>
      </div>

      <div className="flex justify-end mb-12">
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-6">
            <div className="w-48">
              <label className="block text-xs text-gray-500 mb-1.5">Discount</label>
              <div className="flex">
                <input type="number" placeholder="0" className="w-full px-3 text-gray-700 py-2 border border-gray-200 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                <span className="px-3 py-2 border-y border-r border-gray-200 bg-gray-50 rounded-r-lg text-sm text-gray-600">₹</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Invoice Preview</h3>
            
            <div className="space-y-4 text-sm text-gray-600 border-b border-gray-100 pb-4 mb-4">
              <div className="flex justify-between"><span>Sub-Total</span><span>₹0</span></div>
              <div className="flex justify-between"><span>Item Discounts</span><span className="text-red-500">-₹0</span></div>
            </div>
            
            <div className="space-y-4 text-sm text-gray-600 border-b border-gray-100 pb-4 mb-4">
              <div className="flex justify-between"><span>After Items Discount</span><span>₹0</span></div>
              <div className="flex justify-between"><span>Invoice Discount</span><span className="text-red-500">-₹0</span></div>
            </div>

            <div className="space-y-4 text-sm text-gray-600 border-b border-gray-100 pb-4 mb-4">
              <div className="flex justify-between"><span>Net Taxable Value</span><span>₹0</span></div>
              <div className="flex justify-between"><span>CGST @9%</span><span>₹0</span></div>
              <div className="flex justify-between"><span>SGST @9%</span><span>₹0</span></div>
            </div>

            <div className="space-y-4 text-sm text-gray-900 font-medium mb-6">
              <div className="flex justify-between uppercase"><span>TOTAL TAX</span><span>₹0</span></div>
              <div className="flex justify-between uppercase"><span>FINAL TOTAL</span><span className="text-green-600">₹0</span></div>
            </div>

            <p className="text-right text-xs text-gray-400 italic">Zero Rupees and Zero Paisa Only</p>
          </div>
        </div>
      </div>
    </div>
  );
}