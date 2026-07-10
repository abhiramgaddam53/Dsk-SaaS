import { fetchWithAuth } from "./sessionManager";

// api.ts
const API_BASE = '/api';

export interface CustomerProfilePayload {
  profileReference?: string;
  owner: {
    prefix: string;
    ownerName: string;
    relation: string;
    relationName: string;
    occupation: string;
    phone1: string;
    phone2: string;
  };
  clientBank: {
    ifsc: string;
    bankName: string;
    branch: string;
    email: string;
    contactPersonName: string;
    contactPersonNumber: string;
  };
}

export const api = {
  // ─── CUSTOMER PROFILES ──────────────────────────────────────────

  createCustomerProfile: async (data: CustomerProfilePayload) => {
    const res = await fetchWithAuth(`${API_BASE}/sv/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create customer profile');
    return res.json();
  },

  getCustomerProfiles: async () => {
    const res = await fetchWithAuth(`${API_BASE}/sv/customers`);
    if (!res.ok) throw new Error('Failed to fetch customer profiles');
    return res.json();
  },

  // ─── VALUATION RECORDS ──────────────────────────────────────────

  createValuationRecord: async (data: any) => {
    const res = await fetchWithAuth(`${API_BASE}/sv/valuation-record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create valuation record');
    return res.json();
  },

  getValuationRecords: async (status?: string) => {
    const url = status
      ? `${API_BASE}/sv/valuation-record?status=${encodeURIComponent(status)}`
      : `${API_BASE}/sv/valuation-record`;

    const res = await fetchWithAuth(url);
    if (!res.ok) throw new Error('Failed to fetch valuation records');
    return res.json();
  },

  getValuationRecordById: async (id: string) => {
    const res = await fetchWithAuth(`${API_BASE}/sv/valuation-record/${id}`);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Server Error:", errorData);
      throw new Error(errorData.error || 'Failed to fetch valuation record');
    }

    return res.json();
  },

  updateValuationRecord: async (id: string, data: any) => {
    const res = await fetchWithAuth(`${API_BASE}/sv/valuation-record/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update valuation record');
    return res.json();
  },

  getDrafterRecords: async (status?: string) => {
    const url = status
      ? `${API_BASE}/d/records?status=${encodeURIComponent(status)}`
      : `${API_BASE}/d/records`;

    const res = await fetchWithAuth(url);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch drafter records');
    }

    return res.json();
  },
  submitValidatorDecision: async (id: string, payload: { decision: string, notes: string, notifyTeam: boolean, draftData: any }) => {
    const res = await fetch(`${API_BASE}/val/record-action/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include',
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to submit decision');
    }
    return res.json();
  },
  getValuatorRecords: async () => {
    const res = await fetchWithAuth(`${API_BASE}/val/records`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch valuator records');
    }
    return res.json();
  },
};