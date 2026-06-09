// InvoicesList.tsx
import React from 'react';
import { MoreVertical, ListOrdered, Briefcase, Calendar, Banknote, ChevronDown } from 'lucide-react';
import { Invoice, InvoiceStatus } from '../../../types/types';

interface InvoicesListProps {
  invoices: Invoice[];
  onStatusChange: (id: string, status: InvoiceStatus) => void;
}

const INVOICE_STATUSES: InvoiceStatus[] = ['Draft', 'Sent', 'Paid', 'Accepted', 'Rejected', 'Delivered', 'Void'];

const getStatusStyles = (status: InvoiceStatus) => {
  switch (status) {
    case 'Draft': return 'bg-[#E8F0FE] text-[#174EA6] border-[#D2E3FC]';
    case 'Sent': return 'bg-[#FEF7E0] text-[#B06000] border-[#FCE8B2]';
    case 'Paid': return 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]';
    case 'Accepted': return 'bg-[#F3E8FD] text-[#681DA8] border-[#E9D2FD]';
    case 'Rejected': return 'bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]';
    case 'Delivered': return 'bg-[#FCE4EC] text-[#AD1457] border-[#F8BBD0]';
    case 'Void': return 'bg-[#F1F3F4] text-[#3C4043] border-[#E8EAED]';
    default: return 'bg-gray-50 text-gray-600 border-gray-200';
  }
};

export default function InvoicesList({ invoices, onStatusChange }: InvoicesListProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
        <thead className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-medium w-[15%]">
              <div className="flex items-center gap-2">
                <ListOrdered size={14} className="text-gray-400" />
                <span>Invoice No.</span>
              </div>
            </th>
            <th className="px-6 py-4 font-medium w-[20%]">
              <div className="flex items-center gap-2">
                <Briefcase size={14} className="text-gray-400" />
                <span>Deal</span>
              </div>
            </th>
            <th className="px-6 py-4 font-medium w-[15%]">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-gray-400" />
                <span>Issue Date</span>
              </div>
            </th>
            <th className="px-6 py-4 font-medium w-[15%]">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-gray-400" />
                <span>Due Date</span>
              </div>
            </th>
            <th className="px-6 py-4 font-medium w-[15%]">
              <div className="flex items-center gap-2">
                <Banknote size={14} className="text-gray-400" />
                <span>Amount</span>
              </div>
            </th>
            <th className="px-6 py-4 font-medium w-[15%]">Status</th>
            <th className="px-4 py-4 font-medium text-right w-[5%]"></th>
          </tr>
        </thead>
        <tbody>
          {invoices.length === 0 ? (
            <tr>
               <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No records found.</td>
            </tr>
          ) : (
            invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors last:border-b-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-gray-700">{invoice.invoiceNo}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{invoice.deal}</td>
                <td className="px-6 py-4 text-gray-600">{invoice.issueDate}</td>
                <td className="px-6 py-4 text-gray-600">{invoice.dueDate}</td>
                <td className="px-6 py-4 text-gray-700 font-medium">₹{invoice.amount.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4">
                  <div className="relative inline-block w-32">
                    <select
                      value={invoice.status}
                      onChange={(e) => onStatusChange(invoice.id, e.target.value as InvoiceStatus)}
                      className={`appearance-none w-full px-3 py-1.5 pr-8 text-xs font-medium border rounded-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500/50 ${getStatusStyles(invoice.status)}`}
                    >
                      {INVOICE_STATUSES.map(status => (
                        <option key={status} value={status} className="bg-white text-gray-900">{status}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                  </div>
                </td>
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
      
      {invoices.length > 0 && (
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
            <span>1 to {invoices.length} of {invoices.length} results</span>
          </div>
        </div>
      )}
    </div>
  );
}