 'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Plus, FileText, Edit, FileCheck, User } from 'lucide-react';
import { getDashboardStats, getActiveReports, DashboardStats, ReportData } from "@/app/lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, reportsData] = await Promise.all([
          getDashboardStats(),
          getActiveReports()
        ]);
        setStats(statsData);
        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'In-Progress':
        return 'text-orange-600 bg-orange-50 border border-orange-200';
      case 'Completed':
        return 'text-emerald-600 bg-emerald-50 border border-emerald-200';
      case 'Being Evaluated':
        return 'text-blue-600 bg-blue-50 border border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00a0ef]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Overview Section */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-1">Overview</h1>
          <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-gray-200 bg-white flex justify-between items-start">
            <div>
              <p className="text-gray-500 mb-2">Total Reports</p>
              <h2 className="text-2xl font-semibold">{stats?.totalReports || 0}</h2>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 bg-white flex justify-between items-start">
            <div>
              <p className="text-gray-500 mb-2">In Progress</p>
              <h2 className="text-2xl font-semibold">{stats?.inProgress || 0}</h2>
            </div>
            <div className="p-2 rounded-lg bg-orange-50 text-orange-500">
              <Edit className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 bg-white flex justify-between items-start">
            <div>
              <p className="text-gray-500 mb-2">Completed</p>
              <h2 className="text-2xl font-semibold">{stats?.completed || 0}</h2>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-500">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Active Reports Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Active Reports</h2>
          <button className="text-[#00a0ef] text-sm font-medium hover:underline">
            View All
          </button>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto pb-4">
          <table className="w-full min-w-[600px] md:min-w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 rounded-tl-lg border-b border-gray-100">
                  ID
                </th>
                <th className="bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 border-b border-gray-100 border-l border-white">
                  Customer Name
                </th>
                <th className="bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 border-b border-gray-100 border-l border-white md:rounded-none rounded-tr-lg">
                  Report Type
                </th>
                <th className="    bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 border-b border-gray-100 border-l border-white">
                  Last Updated
                </th>
                <th className="  bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 border-b border-gray-100 border-l border-white">
                  Status
                </th>
                <th className="  bg-[#f2f7fa] py-3 px-4 text-left text-sm font-medium text-gray-900 rounded-tr-lg border-b border-gray-100 border-l border-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={`${report.id}-${index}`}>
                  <td className="py-4 whitespace-nowrap px-4 text-sm text-gray-600 border-b border-gray-100">
                    {report.id}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500 fill-current" />
                      {report.customerName}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 border-b border-gray-100">
                    {report.reportType}
                  </td>
                  <td className="  py-4 px-4 text-sm text-gray-600 border-b border-gray-100">
                    {report.lastUpdated}
                  </td>
                  <td className=" py-4 whitespace-nowrap px-4 border-b border-gray-100">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="  py-4 px-4 border-b border-gray-100">
                    <button className="text-[#00a0ef] text-sm font-medium hover:underline">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
 