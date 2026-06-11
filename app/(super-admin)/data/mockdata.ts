// mockData.ts
import { Contact, Deal, ReportStatus } from '../types/types';

// mockData.ts
import { Task, Meeting, ProductItem  , Report, CompanyFolder, CompanyFile} from '../types/types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Lorem ipsum dolor sit amet consectetur, lorem ipsum dolor...',
    dueDate: '19/11/2025',
    status: 'Completed',
    relatedTo: { name: 'Company Name', role: 'Vendor' },
    assignedUsers: [{ name: 'Team-name' }]
  },
  {
    id: '2',
    title: 'Lorem ipsum dolor sit amet consectetur, lorem ipsum dolor...',
    dueDate: '19/11/2025',
    status: 'Pending',
    relatedTo: { name: 'Company Name', role: 'Vendor' },
    assignedUsers: [{ name: 'Team-name' }]
  },
  {
    id: '3',
    title: 'Lorem ipsum dolor sit amet consectetur, lorem ipsum dolor...',
    dueDate: '19/11/2025',
    status: 'Completed',
    relatedTo: { name: 'Company Name', role: 'Vendor' },
    assignedUsers: [{ name: 'Team-name' }]
  },
  {
    id: '4',
    title: 'Lorem ipsum dolor sit amet consectetur, lorem ipsum dolor...',
    dueDate: '19/11/2025',
    status: 'In-Progress',
    relatedTo: { name: 'Company Name', role: 'Vendor' },
    assignedUsers: [{ name: 'Team-name' }]
  },
  {
    id: '5',
    title: 'Lorem ipsum dolor sit amet consectetur, lorem ipsum dolor...',
    dueDate: '19/11/2025',
    status: 'Upcoming',
    relatedTo: { name: 'Company Name', role: 'Vendor' },
    assignedUsers: [{ name: 'Team-name' }]
  }
];

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'UI/UX Design Phase 1',
    date: '12th December, 2025',
    status: 'Not Started',
    assignedTo: { name: 'Team Member Name' }
  },
  {
    id: '2',
    title: 'UI/UX Design Phase 1',
    date: '12th December, 2025',
    status: 'Completed',
    assignedTo: { name: 'Team Member Name' }
  },
  {
    id: '3',
    title: 'UI/UX Design Phase 1',
    date: '12th December, 2025',
    status: 'In-Progress',
    assignedTo: { name: 'Team Member Name' }
  },
  {
    id: '4',
    title: 'UI/UX Design Phase 1',
    date: '12th December, 2025',
    status: 'Cancelled',
    assignedTo: { name: 'Team Member Name' }
  },
  {
    id: '5',
    title: 'UI/UX Design Phase 1',
    date: '12th December, 2025',
    status: 'Pending/On-Hold',
    assignedTo: { name: 'Team Member Name' }
  }
];
export const mockContacts: Contact[] = [
    {
      id: '1',
      name: 'Pradhyumn Dhondi',
      company: 'Asterisks.Inc',
      status: 'New-Lead',
      email: 'pradhyum@example.com',
      phone: '+91 9876543210',
      linkedWith : "Abhiram Gaddam"
    },
    {
      id: '2',
      name: 'Yash Mishra',
      company: 'Random Agency',
      status: 'Interested',
      email: 'yash@example.com',
      phone: '+91 9876543211',
      linkedWith : "Pradhyumn Dhondi"
    },
    {
      id: '3',
      name: 'Aniketh Busavale',
      company: 'Random Manufacturing Firm',
      status: 'Won Lead',
      email: 'aniketh@example.com',
      phone: '+91 9876543212',
       linkedWith : "Pradhyumn Dhondi"
      
    },
    {
      id: '4',
      name: 'Sai Jalmuri',
      company: 'Random Aesthetic Studio',
      status: 'Contacted',
      email: 'sai@example.com',
      phone: '+91 9876543213',
       linkedWith : "Pradhyumn Dhondi"
    },
    {
      id: '5',
      name: 'Pranav Varma',
      company: 'Random Interior Design',
      status: 'Qualified',
      email: 'pranav@example.com',
      phone: '+91 9876543214',
       linkedWith : "Pradhyumn Dhondi"
    },
    {
      id: '6',
      name: 'Sai Krishna Dhondi',
      company: 'Random Shoe Manufacturer',
      status: 'Lost Lead',
      email: 'krishna@example.com',
      phone: '+91 9876543215',
       linkedWith : "Pradhyumn Dhondi"
    },
    {
      id: '7',
      name: 'Lorem Ipsum',
      company: 'Random Landscaping',
      status: 'Un-Qualified',
      email: 'lorem@example.com',
      phone: '+91 9876543216',
       linkedWith : "Pradhyumn Dhondi"
    },
    {
      id: '8',
      name: 'Sujal',
      company: 'Asterisks.Inc',
      status: 'New-Lead',
      email: 'sujal@example.com',
      phone: '+91 9876543217',
       linkedWith : "Pradhyumn Dhondi"
    }
  ];
export const mockDeals: Deal[] = [
  {
    id: 'cnt-1',
    name: 'Manufacturing Service',
    stage: 'Onboarding',
    amount: 75000,
    lastUpdated: 'Nov 24th, 2025',
    company: 'DataCircles'
  },
  {
    id: 'cnt-2',
    name: 'Manufacturing Service',
    stage: 'Project Kick-Off',
    amount: 75000,
    lastUpdated: 'Nov 24th, 2025',
    company: 'DataCircles'
  },
  {
    id: 'cnt-3',
    name: 'Manufacturing Service',
    stage: 'Project Initiation',
    amount: 75000,
    lastUpdated: 'Nov 24th, 2025',
    company: 'DataCircles'
  },
  {
    id: 'cnt-4',
    name: 'User Analytics Dashboard',
    stage: 'In-Progress',
    amount: 156490,
    lastUpdated: 'Feb 18th, 2026',
    company: 'Asterisks.Inc'
  },
  {
    id: 'cnt-5',
    name: 'Manufacturing Service',
    stage: 'Project Complete',
    amount: 75000,
    lastUpdated: 'Nov 24th, 2025',
    company: 'DataCircles'
  },
  {
    id: 'cnt-6',
    name: 'Deal Name Goes Here',
    stage: 'Onboarding',
    amount: 156490,
    lastUpdated: 'Nov 24, 2025',
    company: 'Asterisks.Inc - Non-Creative Digital Studio'
  }
]; 

export const mockFolders: CompanyFolder[] = Array(12).fill(null).map((_, i) => ({
  id: `f-${i}`,
  name: i < 3 ? 'Folder Name' : (i < 8 ? 'Legal Documents' : 'Folder Name'),
  itemsCount: i < 3 ? '4 Items' : (i < 8 ? '12 Files' : '20 Contacts'),
  updatedBy: { name: 'Pradhyumn Dhondi' },
  createdDate: '12/11/2025',
  lastOpenedDate: '16/11/2025'
}));

export const mockFiles: CompanyFile[] = Array(15).fill(null).map((_, i) => ({
  id: `file-${i}`,
  folderId: 'f-0',
  name: i >= 12 ? 'File Name' : (i >= 8 ? 'Link Name' : (i % 2 === 0 ? 'File Name' : 'Company_Invoice_Contract')),
  type: (i >= 8 && i < 12) ? 'link' : 'pdf',
  sizeOrUrl: (i >= 8 && i < 12) ? 'www.link.com' : (i < 8 ? '124kb' : '3 MB • JAN 29'),
  updatedBy: { name: 'Pradhyumn Dhondi' },
  createdDate: '12/11/2025',
  lastOpenedDate: '16/11/2025'
}));

// mockData.ts
import { Invoice } from '../types/types';

export const mockInvoices: Invoice[] = Array(12).fill(null).map((_, i) => ({
  id: `inv-${i}`,
  invoiceNo: `1456323${i}`,
  deal: 'Consultancy',
  issueDate: '11th November, 2025',
  dueDate: '24th November, 2025',
  amount: 15890000,
  status: ['Draft', 'Sent', 'Paid', 'Accepted', 'Rejected', 'Delivered', 'Void'][i % 7] as any,
  type: i % 3 === 0 ? 'Quotation' : 'Invoice'
}));

 
export const mockProducts: ProductItem[] = Array(12).fill(null).map((_, i) => ({
  id: `prod-${i}`,
  name: 'Pradhyumn Dhondi',
  type: 'Credit',
  category: 'Tech',
  purchasePrice: 86000.00,
  sellingPrice: 86000.00,
  hsnSac: i % 2 === 0 ? '61091000' : '-',
  variants: ['0-1 Variant', '1-5 Variant', '<5 Variant'][i % 3],
  status: i % 2 === 0 ? 'Active' : 'In-Active'
}));
 
export const mockReports: Report[] = Array(12).fill(null).map((_, i) => {
  const statuses: ReportStatus[] = ['Proposal Flow', 'File Creation', 'Site Visit', 'Documentation', 'Drafting', 'Review', 'Approval', 'Complete', 'Print and dispatch'];
  return {
    id: `rep-${i}`,
    reportId: `DSK-04839${i}`,
    customerName: 'Pradhyumn Dhondi',
    documentType: 'Valuation Report',
    assignedTo: 'Team Member Name',
    lastUpdated: 'Nov 24th, 2025',
    deadline: 'Mon 00th, 2026',
    status: statuses[i % statuses.length],
    price: i % 2 === 0 ? 2998520 : 156490,
    dealName: 'Deal Name Goes Here',
    company: 'Asterisks.Inc - Non-Creative Digital Studio'
  };
});