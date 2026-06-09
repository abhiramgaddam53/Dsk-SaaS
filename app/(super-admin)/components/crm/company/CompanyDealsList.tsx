// CompanyDealsList.tsx
import React from 'react';
import { MoreVertical, ChevronsUpDown, Handshake, PieChart, Banknote, Calendar, ChevronDown } from 'lucide-react';
import { CompanyDeal, DealStage } from '../../../types/types';

interface CompanyDealsListProps {
  deals: CompanyDeal[];
  onStatusChange: (id: string, stage: DealStage) => void;
}

const STAGE_OPTIONS: DealStage[] = [
  'Onboarding', 'Project Kick-Off', 'Project Initiation', 'In-Progress', 'Project Complete'
];

const getStageStyles = (stage: DealStage) => {
  switch (stage) {
    case 'Onboarding': return 'bg-blue-50 text-blue-600 border-blue-100';
    case 'Project Kick-Off': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
    case 'Project Initiation': return 'bg-purple-50 text-purple-600 border-purple-100';
    case 'In-Progress': return 'bg-teal-50 text-teal-600 border-teal-100';
    case 'Project Complete': return 'bg-green-50 text-green-600 border-green-100';
    default: return 'bg-gray-50 text-gray-600 border-gray-100';
  }
};

export default function CompanyDealsList({ deals, onStatusChange }: CompanyDealsListProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap table-fixed">
        <thead className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-medium w-[30%]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Handshake size={14} className="text-gray-400" />
                  <span>Deal Name</span>
                </div>
                <ChevronsUpDown size={14} className="text-gray-400" />
              </div>
            </th>
            <th className="px-6 py-4 font-medium w-[25%]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PieChart size={14} className="text-gray-400" />
                  <span>Stage</span>
                </div>
                <ChevronsUpDown size={14} className="text-gray-400" />
              </div>
            </th>
            <th className="px-6 py-4 font-medium w-[20%]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Banknote size={14} className="text-gray-400" />
                  <span>Amount</span>
                </div>
                <ChevronsUpDown size={14} className="text-gray-400" />
              </div>
            </th>
            <th className="px-6 py-4 font-medium w-[20%]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <span>Last Updated</span>
                </div>
                <ChevronsUpDown size={14} className="text-gray-400" />
              </div>
            </th>
            <th className="px-4 py-4 font-medium text-right w-[5%]"></th>
          </tr>
        </thead>
        <tbody>
          {deals.length === 0 ? (
             <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                   No deals data available from API.
                </td>
             </tr>
          ) : (
            deals.map((deal) => (
              <tr key={deal.id} className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors last:border-b-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-gray-700">{deal.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="relative inline-block w-40">
                    <select
                      value={deal.stage}
                      onChange={(e) => onStatusChange(deal.id, e.target.value as DealStage)}
                      className={`appearance-none w-full px-3 py-1.5 pr-8 text-xs font-medium border rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${getStageStyles(deal.stage)}`}
                    >
                      {STAGE_OPTIONS.map(stage => (
                        <option key={stage} value={stage} className="bg-white text-gray-900 font-medium">
                          {stage}
                        </option>
                      ))}
                    </select>
                    <ChevronsUpDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {deal.amount.toLocaleString('en-IN')}
                </td>
                <td className="px-6 py-4 text-gray-600">{deal.lastUpdated}</td>
                <td className="px-4 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {deals.length > 0 && (
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
            <span>1 to {deals.length} of {deals.length} results</span>
          </div>
        </div>
      )}
    </div>
  );
}