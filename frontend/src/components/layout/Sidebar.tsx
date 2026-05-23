import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  path: string;
}

interface NavGroup {
  label: string;
  color: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

const navGroups: NavGroup[] = [
  {
    label: "SALE",
    color: "#06b6d4",
    defaultOpen: true,
    items: [
      { label: "Sale Invoice", path: "/sale/invoice" },
      { label: "Receipt", path: "/sale/receipt" },
      { label: "Delivery Order", path: "/sale/delivery-order" },
    ],
  },
  {
    label: "PURCHASE",
    color: "#a78bfa",
    defaultOpen: true,
    items: [
      { label: "New Expense", path: "/purchase/expense/new" },
    ],
  },
  {
    label: "PRODUCT",
    color: "#34d399",
    defaultOpen: true,
    items: [
      { label: "Inventory", path: "/product/inventory" },
    ],
  },
];

export default function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    SALE: true,
    PURCHASE: true,
    PRODUCT: true,
  });

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isGroupActive = (group: NavGroup) =>
    group.items.some((item) => location.pathname.startsWith(item.path));

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-screen w-44 flex-col overflow-y-auto transition-transform duration-300 ease-in-out md:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
      style={{ backgroundColor: "var(--niaga-sidebar)" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-5">
        <span className="text-sm font-bold leading-tight tracking-wide text-white">
          OPTION<span style={{ color: "#ffa500" }}>GADGET</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded p-1 text-white/70 hover:text-white md:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 py-2">
        {navGroups.map((group) => (
          <div key={group.label}>
            {/* Group header */}
            <button
              onClick={() => toggleGroup(group.label)}
              className={cn(
                "w-full flex items-center gap-2 px-4 py-2.5 text-left transition-colors",
                isGroupActive(group) ? "text-white" : "text-white/70 hover:text-white"
              )}
            >
              <span
                className="h-3 w-3 flex-shrink-0 rounded-sm"
                style={{ backgroundColor: group.color }}
              />
              <span className="flex-1 text-xs font-bold tracking-wider">
                {group.label}
              </span>
              {openGroups[group.label] ? (
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              )}
            </button>

            {/* Sub-items */}
            {openGroups[group.label] && (
              <div className="pb-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "block mx-2 rounded px-3 py-1.5 text-xs transition-colors",
                        isActive || location.pathname.startsWith(item.path + "/")
                          ? "font-semibold text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      )
                    }
                    style={({ isActive }) =>
                      isActive || location.pathname.startsWith(item.path + "/")
                        ? { backgroundColor: "#06b6d4" }
                        : {}
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-4 py-3">
        <p className="text-[10px] leading-tight text-white/30">
          Copyright © 2016 - 2026
        </p>
        <p className="mt-0.5 text-[10px] leading-tight text-cyan-400/60">
          Niagawan Plus Sdn. Bhd.
        </p>
      </div>
    </aside>
  );
}
