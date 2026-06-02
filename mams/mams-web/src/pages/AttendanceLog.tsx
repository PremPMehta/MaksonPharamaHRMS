import { useQuery } from '@tanstack/react-query';
import { attendanceApi } from '../api/attendance';
import { fmtIstTime, fmtDate } from '../lib/format';

export function AttendanceLog() {
  // Live polling every 5s, per dev-scope §4.3.
  const { data, isLoading } = useQuery({
    queryKey: ['attendance', 'recent'],
    queryFn: () => attendanceApi.recentRaw(50),
    refetchInterval: 5000,
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Live Attendance Log</h1>
          <div className="text-sm text-text-muted">Live punches from biometric devices, polled every 5s.</div>
        </div>
        <span className="px-3 py-1 rounded-full bg-green-bg text-green-dark text-xs font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green animate-pulse"></span> LIVE
        </span>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface2">
            <tr className="text-left text-xs uppercase tracking-wider text-text-muted">
              <th className="px-4 py-3 font-semibold">Time</th>
              <th className="px-4 py-3 font-semibold">Employee</th>
              <th className="px-4 py-3 font-semibold">Code</th>
              <th className="px-4 py-3 font-semibold">Department</th>
              <th className="px-4 py-3 font-semibold">Bio ID</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading && (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-text-muted">Loading...</td></tr>
            )}
            {data?.items.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-text-muted">No punches yet. Run the eSSL simulator (scripts/essl-sim.js) to generate some.</td></tr>
            )}
            {data?.items.map((p) => (
              <tr key={p._id} className="hover:bg-surface2/50">
                <td className="px-4 py-2.5 font-mono text-xs">{fmtIstTime(p.rawTimestamp)}</td>
                <td className="px-4 py-2.5 font-medium">{p.employeeId?.name ?? '-'}</td>
                <td className="px-4 py-2.5 font-mono text-xs">{p.employeeId?.empCode ?? '-'}</td>
                <td className="px-4 py-2.5 text-text-muted">{p.employeeId?.department ?? '-'}</td>
                <td className="px-4 py-2.5 font-mono text-xs">{p.biometricId}</td>
                <td className="px-4 py-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    p.punchType === 'IN' ? 'bg-green-bg text-green-dark' :
                    p.punchType === 'OUT' ? 'bg-amber-bg text-amber' :
                    'bg-surface2 text-text-muted'
                  }`}>{p.punchType}</span>
                </td>
                <td className="px-4 py-2.5 text-xs text-text-muted">{fmtDate(p.rawDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
