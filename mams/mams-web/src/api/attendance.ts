import { api } from './client';

export interface AttendanceListResponse {
  viewMode: 'real' | 'compliant';
  items: any[];
  total: number;
  page: number;
  pageSize: number;
}

export interface RawPunchResponse {
  items: Array<{
    _id: string;
    employeeId: { _id: string; name: string; empCode: string; department: string };
    biometricId: string;
    punchType: 'IN' | 'OUT' | 'OTHER';
    rawTimestamp: string;
    rawDate: string;
  }>;
}

export const attendanceApi = {
  list: (q: { date?: string; startDate?: string; endDate?: string; employeeId?: string; page?: number; pageSize?: number } = {}) => {
    const params = new URLSearchParams();
    Object.entries(q).forEach(([k, v]) => v !== undefined && v !== '' && params.set(k, String(v)));
    return api.get<AttendanceListResponse>(`/attendance?${params.toString()}`);
  },
  recentRaw: (limit = 50) => api.get<RawPunchResponse>(`/attendance/raw/recent?limit=${limit}`),
};
