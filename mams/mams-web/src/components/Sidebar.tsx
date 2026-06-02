import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { authApi } from '../api/auth';

const NAV = [
  { to: '/dashboard',   label: 'Dashboard' },
  { to: '/employees',   label: 'Employees' },
  { to: '/attendance',  label: 'Attendance Log' },
  { to: '/reports',     label: 'Reports' },
  { to: '/adjustments', label: 'Adjustments' },
  { to: '/devices',     label: 'Devices' },
  { to: '/settings',    label: 'Settings' },
];

export function Sidebar() {
  const user = useAuth((s) => s.user);
  const refreshToken = useAuth((s) => s.refreshToken);
  const clear = useAuth((s) => s.clear);
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      if (refreshToken) await authApi.logout(refreshToken);
    } catch {
      // ignore - we clear locally regardless
    } finally {
      clear();
      navigate('/login');
    }
  };

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[250px] bg-primary text-white flex flex-col z-10">
      <div className="px-6 py-5 border-b border-white/10">
        <div className="text-[10px] tracking-[2px] uppercase opacity-60 mb-1">Attendance System</div>
        <h1 className="text-base font-bold">Makson Group</h1>
      </div>
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <div className="text-[10px] uppercase tracking-[2px] opacity-40 px-3 pb-2 font-semibold">Navigation</div>
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-md text-[13px] font-medium mb-0.5 transition ${
                isActive ? 'bg-red/25 text-white font-semibold' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {n.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2.5 p-2 rounded-md">
          <div className="w-9 h-9 rounded-md bg-red/30 flex items-center justify-center font-bold text-sm">
            {(user?.name ?? '??').split(' ').map((s) => s[0]).slice(0, 2).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold truncate">{user?.name ?? 'Unknown'}</div>
            <div className="text-[11px] opacity-60 truncate">{user?.role ?? ''}</div>
          </div>
        </div>
        <button onClick={onLogout} className="mt-2 text-[12px] text-white/60 hover:text-white px-2">
          Sign out
        </button>
      </div>
    </aside>
  );
}
