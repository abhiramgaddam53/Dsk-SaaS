// api.ts

export interface ReportData {
    id: string;
    customerName: string;
    reportType: string;
    lastUpdated: string;
    status: 'In-Progress' | 'Completed' | 'Being Evaluated';
  }
  
  export interface DashboardStats {
    totalReports: number;
    inProgress: number;
    completed: number;
  }
  
  const USE_REAL_BACKEND = false; 
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
  
  export const getDashboardStats = async (): Promise<DashboardStats> => {
    if (USE_REAL_BACKEND) {
      const response = await fetch(`${API_BASE_URL}/stats`);
      if (!response.ok) throw new Error('Failed to fetch dashboard stats');
      return response.json();
    }
  
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalReports: 12,
          inProgress: 3,
          completed: 12,
        });
      }, 600); 
    });
  };
  
  export const getActiveReports = async (): Promise<ReportData[]> => {
    if (USE_REAL_BACKEND) {
      const response = await fetch(`${API_BASE_URL}/reports`);
      if (!response.ok) throw new Error('Failed to fetch active reports');
      return response.json();
    }
  
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'DSK-34-322', customerName: 'Pradhyumn Dhondi', reportType: 'PV', lastUpdated: 'Oct 24, 2025', status: 'In-Progress' },
          { id: 'DSK-34-322', customerName: 'Pratap Reddy', reportType: 'PG', lastUpdated: 'Oct 21, 2025', status: 'Completed' },
          { id: 'DSK-34-322', customerName: 'Jagadeeshwar', reportType: 'PG', lastUpdated: 'Oct 19, 2025', status: 'Completed' },
          { id: 'DSK-34-322', customerName: 'Pranav Varma', reportType: 'PG_E', lastUpdated: 'Dec 20, 2025', status: 'In-Progress' },
          { id: 'DSK-34-322', customerName: 'Ganesh Dhondi', reportType: 'PV', lastUpdated: 'Oct 23, 2025', status: 'Being Evaluated' },
          { id: 'DSK-34-322', customerName: 'Sai Kishore', reportType: 'PV', lastUpdated: 'Oct 19, 2025', status: 'Completed' },
        ]);
      }, 600); 
    });
  };