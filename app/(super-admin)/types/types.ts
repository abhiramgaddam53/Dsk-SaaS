// types.ts
export type ContactStatus = 
  | 'New-Lead' 
  | 'Contacted' 
  | 'Interested' 
  | 'Qualified' 
  | 'Un-Qualified' 
  | 'Lost Lead' 
  | 'Won Lead';

export interface Contact {
  id: string;
  name: string;
  company: string;
  status: ContactStatus;
  email: string;
  phone: string;
  avatar?: string;
  tags?: string[];
}

// types.ts
export type DealStage = 
  | 'Onboarding' 
  | 'Project Kick-Off' 
  | 'Project Initiation' 
  | 'In-Progress' 
  | 'Project Complete';

export interface Deal {
  id: string;
  name: string;
  stage: DealStage;
  amount: number;
  lastUpdated: string;
  company: string;
  avatar?: string;
} 
export interface CompanyDeal {
  id: string;
  name: string;
  stage: DealStage;
  amount: number;
  lastUpdated: string;
}

export interface CompanyContact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CompanyDetails {
  id: string;
  name: string;
  industry: string;
  website: string;
  location: string;
  country: string;
  state: string;
  postalCode: string;
  fullAddress: string;
  lastUpdatedText: string;
  assignedUser: string;
  assignedDate: string;
  avatarUrl?: string;
}

export type TaskStatus = 'Upcoming' | 'Not Started' | 'In-Progress' | 'Pending' | 'Completed' | 'Cancelled' | 'Pending/On-Hold';
export type MeetingStatus = 'Not Started' | 'In-Progress' | 'Completed' | 'Cancelled' | 'Pending' | 'Pending/On-Hold';

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
  relatedTo: { name: string; role: string; avatar?: string };
  assignedUsers: { name: string; avatar?: string }[];
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  status: MeetingStatus;
  assignedTo: { name: string; avatar?: string };
}

export interface CompanyFolder {
  id: string;
  name: string;
  itemsCount: string;
  updatedBy: { name: string; avatar?: string };
  createdDate: string;
  lastOpenedDate: string;
}

export interface CompanyFile {
  id: string;
  folderId: string;
  name: string;
  type: 'pdf' | 'link';
  sizeOrUrl: string;
  updatedBy: { name: string; avatar?: string };
  createdDate: string;
  lastOpenedDate: string;
}
 
export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Accepted' | 'Rejected' | 'Delivered' | 'Void';
export type InvoiceType = 'Invoice' | 'Quotation';

export interface Invoice {
  id: string;
  invoiceNo: string;
  deal: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  type: InvoiceType;
}
export type ItemStatus = 'Active' | 'In-Active';
export interface ProductItem {
  id: string;
  name: string;
  type: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  hsnSac: string;
  variants: string;
  status: ItemStatus;
}

// types.ts
// Add these to your existing types
export type ReportStatus = 
  | 'Proposal Flow' 
  | 'File Creation' 
  | 'Site Visit' 
  | 'Documentation' 
  | 'Drafting' 
  | 'Review' 
  | 'Approval' 
  | 'Complete' 
  | 'Print and dispatch';

export interface Report {
  id: string;
  reportId: string;
  customerName: string;
  documentType: string;
  assignedTo: string;
  lastUpdated: string;
  deadline: string;
  status: ReportStatus;
  price: number;
  dealName?: string;
  company?: string;
  avatar?: string;
}