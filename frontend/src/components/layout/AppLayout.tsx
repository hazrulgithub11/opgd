import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-100">
      <header className="fixed top-0 left-0 right-0 z-40 flex h-12 items-center gap-3 border-b border-gray-200 bg-white px-3 shadow-sm md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="rounded p-2 text-gray-700 hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-sm font-bold tracking-wide text-gray-800">
          OPTION<span className="text-orange-500">GADGET</span>
        </span>
      </header>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main className="ml-0 min-w-0 flex-1 overflow-y-auto pt-12 md:ml-44 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
}
