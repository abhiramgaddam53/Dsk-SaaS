"use client";

import React from 'react';
import { MoreVertical, ChevronDown, ArrowUpRight } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, ComposedChart 
} from 'recharts';

// --- Mock Data for Charts ---
const revenueData = [
  { month: 'Jan', actual: 250, trend: 120 },
  { month: 'Feb', actual: 180, trend: 140 },
  { month: 'Mar', actual: 160, trend: 220 },
  { month: 'Apr', actual: 110, trend: 310 },
  { month: 'May', actual: 200, trend: 320 },
  { month: 'Jun', actual: 300, trend: 270 },
  { month: 'Jul', actual: 230, trend: 210 },
  { month: 'Aug', actual: 280, trend: 170 },
  { month: 'Sep', actual: 210, trend: 150 },
  { month: 'Oct', actual: 380, trend: 170 },
  { month: 'Nov', actual: 280, trend: 210 },
  { month: 'Dec', actual: 260, trend: 240 },
];

const dealsData = [
  { month: 'Jan', deals: 1.2 },
  { month: 'Feb', deals: 2.1 },
  { month: 'Mar', deals: 1.8 },
  { month: 'Apr', deals: 3.1 },
  { month: 'May', deals: 2.0 },
  { month: 'Jun', deals: 4.0 },
];

// --- Custom Tooltip for Deals Chart ---
const CustomDealsTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1f2937] text-white px-5 py-2.5 rounded-xl relative shadow-lg text-center leading-tight">
        <span className="block text-[15px] font-bold">{payload[0].value}</span>
        <span className="block text-[10px] text-gray-300 font-medium whitespace-nowrap mt-0.5">Active Deals</span>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#1f2937] rotate-45 rounded-sm"></div>
      </div>
    );
  }
  return null;
};


export default function OverviewPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] md:bg-white px-4 md:px-8 py-8 w-full max-w-[1600px] mx-auto overflow-x-hidden font-sans">
      
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-[28px] md:text-[30px] font-bold text-gray-900 mb-1 tracking-tight">
          Evening, Sai Krishna! Still going strong?
        </h1>
        <p className="text-[13px] md:text-sm text-gray-500 font-medium leading-relaxed">
          Let's See what's on your plate today,<br />
          Wednesday, November 05, 2025
        </p>
      </div>

      {/* ── Top KPIs ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="p-6 bg-linear-to-r from-white via-[#f9fafc] to-[#dde5f5] rounded-2xl border border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[120px]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[13px] font-semibold text-gray-600">Total Deals Closed</span>
            <button className="text-gray-300 hover:text-gray-600 transition-colors"><MoreVertical size={18} /></button>
          </div>
          <div className="flex justify-between items-end mt-auto">
            <span className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">4</span>
            <span className="text-[11px] font-semibold text-gray-400 mb-1">+10% from last month</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200 from-white via-[#f9fafc] to-[#dde5f5] bg-linear-to-r shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[120px]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[13px] font-semibold text-gray-600">Revenue Generated</span>
            <button className="text-gray-300 hover:text-gray-600 transition-colors"><MoreVertical size={18} /></button>
          </div>
          <div className="flex justify-between items-end mt-auto">
            <span className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">₹2,98,520</span>
            <span className="text-[11px] font-semibold text-gray-400 mb-1">+10% from last month</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200 from-white via-[#f9fafc] to-[#dde5f5] bg-linear-to-r shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[120px]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[13px] font-semibold text-gray-600">Total Reports</span>
            <button className="text-gray-300 hover:text-gray-600 transition-colors"><MoreVertical size={18} /></button>
          </div>
          <div className="flex justify-between items-end mt-auto">
            <span className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">43</span>
            <span className="text-[11px] font-semibold text-gray-400 mb-1">+20% This Month</span>
          </div>
        </div>
      </div>

      {/* ── Revenue Overtime Chart ───────────────────────────────────────── */}
      <div className="border border-gray-200 rounded-[20px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-8 mb-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-[19px] font-bold text-gray-900 tracking-tight">Revenue Overtime</h2>
            <p className="text-[13px] text-gray-400 mt-1 font-medium">Monitor how your money is being generated</p>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-2 px-3.5 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              Monthly <ChevronDown size={14} className="text-gray-500" />
            </button>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <ArrowUpRight size={16} />
            </button>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={revenueData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }} 
                domain={[0, 400]} 
                ticks={[0, 100, 200, 300, 400]}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ color: '#6b7280', fontSize: '12px' }}
                itemStyle={{ color: '#111827', fontSize: '14px', fontWeight: 600 }}
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                name="Actual Revenue"
                stroke="#3b82f6" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorActual)" 
                activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="trend" 
                name="Trend"
                stroke="#22c55e" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={false} 
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Middle Row: Clients & Deals + Reports ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Clients and Deals */}
        <div className="border border-gray-200 rounded-[20px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-8 relative flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2.5 text-gray-900 font-bold text-base tracking-tight">
              <div className="w-[22px] h-[22px] rounded-md bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm">
                <span className="text-[11px] font-bold text-gray-600">$</span>
              </div>
              Clients and Deals
            </div>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <ArrowUpRight size={16} />
            </button>
          </div>
          
          <div className="mb-8">
            <p className="text-[13px] text-gray-400 font-semibold mb-1">Average Deal Size</p>
            <h3 className="text-[32px] font-bold text-gray-900 leading-tight tracking-tight">₹86,798.00</h3>
          </div>

          <div className="flex-1 w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dealsData} margin={{ top: 20, right: 10, left: -25, bottom: 0 }}>
                {/* Vertical stripes to mimic background */}
                <CartesianGrid strokeDasharray="0" vertical={true} horizontal={false} stroke="#e0e7ff" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }} 
                  domain={[0, 4]} 
                  ticks={[0, 1, 2, 3, 4]}
                />
                <Tooltip 
                  content={<CustomDealsTooltip />} 
                  cursor={{ stroke: '#bfdbfe', strokeWidth: 30, strokeOpacity: 0.4 }} 
                />
                <Line 
                  type="linear" 
                  dataKey="deals" 
                  stroke="#3b82f6" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: '#fff', stroke: '#3b82f6', strokeWidth: 2 }} 
                  activeDot={{ r: 6, fill: '#fff', stroke: '#111827', strokeWidth: 2.5 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reports */}
        <div className="border border-gray-200 rounded-[20px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2.5 text-gray-900 font-bold text-base tracking-tight">
              <div className="w-[22px] h-[22px] rounded-md bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm">
                <span className="w-[11px] h-[11px] bg-gray-700 rounded-[3px] block relative after:content-[''] after:w-[3px] after:h-[13px] after:bg-white after:absolute after:left-[4px] after:-top-[1px]"></span>
              </div>
              Reports
            </div>
            <div className="flex items-center gap-2.5">
              <button className="flex items-center gap-2 px-3.5 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                Monthly <ChevronDown size={14} className="text-gray-500" />
              </button>
              <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                <ArrowUpRight size={16} />
              </button>
              <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
          <p className="text-[13px] text-gray-400 font-semibold mb-10">Track your Reports!</p>

          <div className="space-y-10 flex-1 flex flex-col justify-center">
            {/* Scheduled Reports */}
            <div>
              <div className="flex justify-between text-[13px] font-bold text-gray-700 mb-3">
                <span>Scheduled Reports</span>
                <span className="text-gray-400 font-semibold">84% <span className="mx-1.5">&bull;</span> <span className="text-gray-900 font-bold">40</span></span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden flex">
                <div className="bg-[#3b82f6] h-full rounded-full" style={{ width: '84%' }}></div>
                <div className="bg-gray-200 h-full flex-1 repeating-stripes"></div>
              </div>
            </div>

            {/* Completed Reports */}
            <div>
              <div className="flex justify-between text-[13px] font-bold text-gray-700 mb-3">
                <span>Completed Reports</span>
                <span className="text-gray-400 font-semibold">48% <span className="mx-1.5">&bull;</span> <span className="text-gray-900 font-bold">31</span></span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden flex">
                <div className="bg-[#10b981] h-full rounded-full" style={{ width: '48%' }}></div>
                <div className="bg-gray-200 h-full flex-1 repeating-stripes"></div>
              </div>
            </div>

            {/* Pending Reports */}
            <div>
              <div className="flex justify-between text-[13px] font-bold text-gray-700 mb-3">
                <span>Pending Reports</span>
                <span className="text-gray-400 font-semibold">68% <span className="mx-1.5">&bull;</span> <span className="text-gray-900 font-bold">8</span></span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden flex">
                <div className="bg-[#f59e0b] h-full rounded-full" style={{ width: '68%' }}></div>
                <div className="bg-gray-200 h-full flex-1 repeating-stripes"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Invoices Section ─────────────────────────────────────────────── */}
      <div className="border border-gray-200 rounded-[20px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-8 mb-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[19px] font-bold text-gray-900 tracking-tight">Invoices</h2>
          <div className="flex items-center gap-2.5">
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <ArrowUpRight size={16} />
            </button>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Invoice KPIs */}
        <div className="flex flex-wrap gap-16 mb-10">
          <div>
            <p className="text-[11px] font-semibold text-gray-400 mb-1.5 tracking-wide uppercase">Total Invoices Issued for</p>
            <p className="text-[22px] font-bold text-gray-900 tracking-tight">₹1,89,798.00</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400 mb-1.5 tracking-wide uppercase">Total Paid</p>
            <p className="text-[22px] font-bold text-gray-900 tracking-tight">₹89,798.00</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400 mb-1.5 tracking-wide uppercase">Total Un-paid</p>
            <p className="text-[22px] font-bold text-gray-900 tracking-tight">₹1,00,000.00</p>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="w-full overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50/50 text-[13px] text-gray-500 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    Invoice No. <span className="text-[10px] text-gray-400">↕</span>
                  </div>
                </th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tags</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {Array(10).fill(null).map((_, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0">
                  <td className="px-6 py-4 text-gray-500 font-semibold">#000000</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-[26px] h-[26px] rounded-full bg-blue-50 overflow-hidden flex items-center justify-center shrink-0 border border-blue-100">
                        <img src="https://ui-avatars.com/api/?name=DS+Krishna&background=EBF4FF&color=1E40AF&size=26" alt="avatar" />
                      </div>
                      <span className="font-bold text-gray-800">DS KRISHNA</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">75,000</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">12th Nov</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-600 text-[11px] font-bold border border-emerald-100">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded text-red-500 bg-red-50 text-[10px] font-bold border border-red-100">High Priority</span>
                      <span className="px-2.5 py-1 rounded text-blue-600 bg-blue-50 text-[10px] font-bold border border-blue-100">VIP</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 border-t border-gray-100 text-[13px] text-gray-500 flex items-center gap-3 font-medium bg-gray-50/30">
            <span>Show <span className="font-bold text-gray-700 ml-1 cursor-pointer">10 <ChevronDown size={14} className="inline inline-block -mt-0.5" /></span></span>
            <span className="text-gray-300">|</span>
            <span>1 to 20 of 37 results</span>
          </div>
        </div>
      </div>

      {/* ── Footer Lorem Ipsum ─────────────────────────────────────────── */}
      <div className="pb-8">
        <p className="text-[11px] text-gray-400 font-medium leading-relaxed text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      {/* Repeating stripes for the empty progress bars */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .repeating-stripes {
            background-image: repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 4px,
              #f3f4f6 4px,
              #f3f4f6 8px
            );
          }
        `
      }} />
    </div>
  );
}