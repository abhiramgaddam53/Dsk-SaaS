// DealsKanban.tsx
import React from 'react';
import { MoreVertical, Plus, Calendar, Building2 } from 'lucide-react';
import { Deal, DealStage } from '../../../types/types';
 
interface DealsKanbanProps {
  deals: Deal[];
}

const STAGES: DealStage[] = [
  'Onboarding', 'Project Kick-Off', 'Project Initiation', 'In-Progress', 'Project Complete'
];

const getStageStyles = (stage: DealStage) => {
  switch (stage) {
    case 'Onboarding': return { badge: 'bg-blue-100 text-blue-600', gradient: 'from-white to-blue-50' };
    case 'Project Kick-Off': return { badge: 'bg-yellow-100 text-yellow-600', gradient: 'from-white to-yellow-50' };
    case 'Project Initiation': return { badge: 'bg-purple-100 text-purple-600', gradient: 'from-white to-purple-50' };
    case 'In-Progress': return { badge: 'bg-teal-100 text-teal-600', gradient: 'from-white to-teal-50' };
    case 'Project Complete': return { badge: 'bg-green-100 text-green-600', gradient: 'from-white to-green-50' };
    default: return { badge: 'bg-gray-100 text-gray-600', gradient: 'from-white to-gray-50' };
  }
};

export default function DealsKanban({ deals }: DealsKanbanProps) {
  return (
    <div className="flex-1 overflow-x-auto pb-6">
      <div className="flex min-w-max h-full">
        {STAGES.map((stage) => {
          const columnDeals = deals.filter(d => d.stage === stage);
          const totalAmount = columnDeals.reduce((sum, deal) => sum + deal.amount, 0);
          const styles = getStageStyles(stage);
          
          if (columnDeals.length === 0) return null;

          return (
            <div key={stage} className="w-80 flex flex-col shrink-0 border-r border-gray-100 px-4 first:pl-0 last:border-r-0 last:pr-0">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.badge}`}>
                    {stage.replace('Project ', '')}
                  </span>
                  <span className="text-gray-400 text-sm">{columnDeals.length}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Plus size={18} />
                </button>
              </div>

              <div className={`p-4 rounded-xl border border-gray-100 mb-4 flex justify-between items-center bg-gradient-to-tr ${styles.gradient}`}>
                <span className="text-lg font-medium text-gray-800">₹{totalAmount.toLocaleString('en-IN')}</span>
                <span className="text-xs text-blue-500">+17%</span>
              </div>

              <div className="flex flex-col gap-4">
                {columnDeals.map((deal) => (
                  <div key={deal.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3 group">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                           <span className="text-blue-500 text-[10px] font-medium">
                              {deal.name.charAt(0)}
                           </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${styles.badge}`}>
                          Stage Goes Here
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <Calendar size={12} />
                        <span>{deal.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="mt-1">
                      <h3 className="text-lg font-medium text-gray-800 mb-1">₹{deal.amount.toLocaleString('en-IN')}</h3>
                      <p className="text-sm text-gray-600">{deal.name}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <Building2 size={14} className="text-gray-400 shrink-0" />
                      <span className="truncate">{deal.company}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}