import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-44 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
