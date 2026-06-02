import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { ToastContainer } from './ui/Toast';

export function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-[250px] flex flex-col">
        <TopBar />
        <main className="p-6 flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
