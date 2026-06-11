// ProductsPage.tsx
"use client";

import React, { useState } from 'react';
import { Search, Plus, Filter, Download, Box, MoreVertical } from 'lucide-react';
import CreateItem from '@/app/(super-admin)/components/sales/products/CreateItem';
import { mockProducts } from '@/app/(super-admin)/data/mockdata';
 
const getVariantBadgeStyle = (variant: string) => {
  if (variant.includes('0-1')) return 'bg-purple-50 text-purple-600 border-purple-200';
  if (variant.includes('1-5')) return 'bg-cyan-50 text-cyan-600 border-cyan-200';
  return 'bg-blue-50 text-blue-700 border-blue-200';
};

export default function ProductsPage() {
  const [view, setView] = useState<'list' | 'create'>('list');

  if (view === 'create') {
    return <CreateItem onBack={() => setView('list')} />;
  }

  return (
    <div className="flex flex-col h-full bg-white px-4 md:px-8 py-6   w-full min-h-screen overflow-x-hidden">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Products & Services</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your products and services</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-gray-50/50 p-2 rounded-lg border border-gray-100 shrink-0 w-full">
        <div className="relative flex-1 w-full max-w-3xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search items, variant names, SKU..."
            className="w-full pl-10 text-black pr-4 py-2.5 bg-gradient-to-r from-white to-[#E8F0FE] border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-end">
          <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <Download size={16} />
            Import/Export
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <Filter size={16} />
            All Types
          </button>
          <button 
            onClick={() => setView('create')}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm shrink-0"
          >
            <Plus size={16} />
            Add Item
          </button>
        </div>
      </div>

      <div className="w-full min-w-0 flex-1 overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
          <thead className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium">
                <div className="flex items-center gap-2">
                  <Box size={14} className="text-gray-400" />
                  <span>Item Name</span>
                </div>
              </th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Purchase Price</th>
              <th className="px-6 py-4 font-medium">Selling Price</th>
              <th className="px-6 py-4 font-medium">HSN/SAC</th>
              <th className="px-6 py-4 font-medium text-center">Variants</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
              <th className="px-4 py-4 font-medium text-right w-[5%]"></th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors last:border-b-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="font-medium text-gray-700">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded bg-green-50 text-green-600 border border-green-200">
                    {product.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                <td className="px-6 py-4 text-gray-700">₹{product.purchasePrice.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                <td className="px-6 py-4 text-gray-700">₹{product.sellingPrice.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                <td className="px-6 py-4 text-gray-600">{product.hsnSac}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border inline-block ${getVariantBadgeStyle(product.variants)}`}>
                    {product.variants}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border inline-block ${product.status === 'Active' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <select className="border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <span>1 to {mockProducts.length} of 37 results</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">&lt;</button>
            <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}