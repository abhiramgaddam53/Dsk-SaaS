export type UserRole = 'site-visitor' | 'drafter' | 'valuator' | 'Super-admin';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}