import { useMemo } from 'react';
import { getDeviceIntegrationUrls } from './deviceIntegrationUrls';

export function DeviceSetupGuide() {
  const { iclockUrl, hanvonPushUrl } = useMemo(() => getDeviceIntegrationUrls(), []);

  return (
    <div className="rounded-md border border-border bg-surface2/40 p-4 text-sm space-y-3">
      <div className="font-semibold text-text">Integration setup</div>
      <p className="text-text-muted text-xs">
        Register each device here before connecting hardware. Punches feed the real 12-hour attendance view.
        Saving the form only registers the device in MAMS — configure the physical unit on your network to start
        receiving punches.
      </p>
      <ol className="list-decimal list-inside space-y-2 text-xs text-text-muted">
        <li>
          <span className="font-medium text-text">eSSL (ADMS push):</span> Register serial number → on device set
          server URL to <code className="font-mono text-[11px] bg-surface2 px-1 rounded">{iclockUrl}</code> → confirm
          connection shows <strong>Live</strong> and punches appear in Attendance Log.
        </li>
        <li>
          <span className="font-medium text-text">Hanvon (push):</span> Register with push token → device POSTs JSON to{' '}
          <code className="font-mono text-[11px] bg-surface2 px-1 rounded">{hanvonPushUrl}</code> with headers{' '}
          <code className="font-mono">X-Device-Serial</code> and <code className="font-mono">X-Device-Token</code>.
        </li>
        <li>
          <span className="font-medium text-text">Hanvon (pull):</span> Set pull API base URL in the form → use{' '}
          <strong>Test</strong> then <strong>Sync Now</strong> in the table below.
        </li>
      </ol>
      <div className="rounded-md border border-border bg-surface2/50 p-3 text-xs text-text-muted">
        <strong className="text-text">Employee biometric IDs:</strong> Every employee who will punch on this device
        must exist in <strong>Employees</strong> with a <strong>Biometric ID</strong> that matches the ID enrolled on
        the hardware. If the device sends an unknown ID, MAMS records an orphan punch and does not update attendance.
      </div>
      <p className="text-[11px] text-text-subtle">
        Local dev simulators: <code className="font-mono">node scripts/essl-sim.js</code> and{' '}
        <code className="font-mono">node scripts/hanvon-sim.js</code>
      </p>
    </div>
  );
}
