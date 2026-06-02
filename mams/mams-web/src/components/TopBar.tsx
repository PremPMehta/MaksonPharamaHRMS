import { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';

export function TopBar() {
  const user = useAuth((s) => s.user);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const ist = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-7 sticky top-0 z-10">
      <div>
        <h2 className="text-base font-bold">MAMS</h2>
        <div className="text-[11px] text-text-subtle">{ist} IST</div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
            user?.viewMode === 'compliant' ? 'bg-amber-bg text-amber' : 'bg-primary-bg text-primary'
          }`}
        >
          {user?.viewMode === 'compliant' ? 'COMPLIANT VIEW (8-hour)' : 'REAL VIEW (12-hour)'}
        </span>
      </div>
    </header>
  );
}
