export interface AssignedDocument {
  id: string;
  documentName: string;
  customerName: string;
  reportType: string;
  lastUpdated: string;
  deadline: string;
  status: 'In-Progress' | 'Completed' | 'Being Evaluated';
}

export interface AssignedDocumentsResponse {
  documents: AssignedDocument[];
  totalCount: number;
  showingCount: number;
}
export interface ReportData {
  id: string;
  customerName: string;
  reportType: string;
  lastUpdated: string;
  status: 'In-Progress' | 'Completed' | 'Being Evaluated';
}

export interface DashboardStats {
  // Updated fields for the new UI
  activeReports: number;
  pendingReports: number;
  dueToday: number;
  completed: number;
  
  // Kept your original fields as optional for backwards compatibility
  totalReports?: number;
  inProgress?: number;
}

export interface DueSoonItem {
  id: string;
  title: string;
  subtext: string;
  time: string;
  urgent: boolean;
}

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
  type: 'blue' | 'green' | 'gray';
}

export interface DashboardData {
  stats: DashboardStats;
  reports: ReportData[];
  dueSoon: DueSoonItem[];
  activities: ActivityItem[];
}

export interface CompletedStats {
  totalCompleted: number;
  completedThisMonth: number;
  avgTurnaround: string; // e.g., "2.3 days"
  revisionRate: string;  // e.g., "8%"
}

export interface CompletedDocument {
  id: string;
  documentName: string;
  customerName: string;
  reportType: string;
  completionDate: string;
  revisionCount: number;
}

export interface CompletedDocumentsData {
  stats: CompletedStats;
  documents: CompletedDocument[];
  totalCount: number;
  showingCount: number;
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
        activeReports: 12,
        pendingReports: 3,
        dueToday: 3,
        completed: 12,
        // Legacy fields mapping
        totalReports: 12,
        inProgress: 3,
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

export const getFullDashboardData = async (): Promise<DashboardData> => {
  if (USE_REAL_BACKEND) {
    const response = await fetch(`${API_BASE_URL}/dashboard`);
    if (!response.ok) throw new Error('Failed to fetch dashboard data');
    return response.json();
  }

  // Reuse the existing mock functions so data stays synchronized
  const [stats, reports] = await Promise.all([
    getDashboardStats(),
    getActiveReports()
  ]);

  return new Promise((resolve) => {
    resolve({
      stats,
      reports,
      dueSoon: [
        { id: '1', title: 'Pratap Reddy - House Valuation', subtext: 'Details Received', time: 'Today, 6:00 PM', urgent: true },
        { id: '2', title: 'Veerabhadra Patel - Flat Valuation', subtext: 'Details Pending', time: 'Today, 11:59 PM', urgent: true },
        { id: '3', title: 'Jagadeeshwar Dhondi', subtext: 'Details Received', time: 'Tomorrow, 9:00 AM', urgent: false },
      ],
      activities: [
        { id: '1', text: 'You were assigned a new document.', time: '2 minutes ago', type: 'blue' },
        { id: '2', text: 'Client requested revision on "Research Paper -Climat...', time: '1 hour ago', type: 'green' },
        { id: '3', text: 'Document marked as completed: "Thesis Introductio...', time: '3 hours ago', type: 'gray' },
        { id: '4', text: 'New message from Dr. Maria Rodriguez.', time: '5 hours ago', type: 'blue' },
        { id: '5', text: 'Document Uploaded', time: '1 day ago', type: 'blue' },
      ]
    });
  });
};

export const getAssignedDocuments = async (): Promise<AssignedDocumentsResponse> => {
  if (USE_REAL_BACKEND) {
    const response = await fetch(`${API_BASE_URL}/assigned-documents`);
    if (!response.ok) throw new Error('Failed to fetch assigned documents');
    return response.json();
  }

  // Mock API Response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalCount: 12,
        showingCount: 6,
        documents: Array(6).fill({
          id: 'DSK-34-322',
          documentName: 'Case Study - Business Ad...',
          customerName: 'Pradhyumn Dhondi',
          reportType: 'PV',
          lastUpdated: 'Oct 24, 2025',
          deadline: 'Feb 20, 03:00 PM',
          status: 'In-Progress'
        })
      });
    }, 600);
  });
};
 
export const getCompletedDocumentsData = async (): Promise<CompletedDocumentsData> => {
  if (USE_REAL_BACKEND) {
    const response = await fetch(`${API_BASE_URL}/completed-documents`);
    if (!response.ok) throw new Error('Failed to fetch completed documents');
    return response.json();
  }

  // Mock API Response matching the design
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: {
          totalCompleted: 283,
          completedThisMonth: 47,
          avgTurnaround: "2.3 days",
          revisionRate: "8%"
        },
        totalCount: 12,
        showingCount: 6,
        documents: Array(8).fill({
          id: 'DSK-34-322',
          documentName: 'Case Study - Business Adminstra...',
          customerName: 'Pradhyumn Dhondi',
          reportType: 'PV',
          completionDate: 'Oct 24, 2025',
          revisionCount: 1
        })
      });
    }, 600);
  });
};