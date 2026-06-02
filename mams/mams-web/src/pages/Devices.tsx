import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { DeviceManagementPanel } from '../components/devices/DeviceManagementPanel';

export function Devices() {
  const user = useAuth((s) => s.user);
  const canManage = user?.permissions.includes('manage.devices') ?? false;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Devices</h1>
          <div className="text-sm text-text-muted">
            Live status for eSSL and Hanvon biometric units. Register and configure devices in{' '}
            <Link to="/settings" className="text-primary hover:underline">Settings → Biometric devices</Link>.
          </div>
        </div>
      </div>

      <DeviceManagementPanel canManage={canManage} showSetupGuide={false} showStats />
    </div>
  );
}
