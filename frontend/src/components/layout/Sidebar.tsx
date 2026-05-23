import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
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

export default function Sidebar() {
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
      className="fixed left-0 top-0 h-screen w-44 flex flex-col z-50 overflow-y-auto"
      style={{ backgroundColor: "var(--niaga-sidebar)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-white/10">
        
        <span className="text-white font-bold text-sm tracking-wide leading-tight">
          OPTION<span style={{ color: "#ffa500" }}>GADGET</span>
        </span>
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
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: group.color }}
              />
              <span className="flex-1 text-xs font-bold tracking-wider">
                {group.label}
              </span>
              {openGroups[group.label] ? (
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              )}
            </button>

            {/* Sub-items */}
            {openGroups[group.label] && (
              <div className="pb-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "block mx-2 px-3 py-1.5 rounded text-xs transition-colors",
                        isActive || location.pathname.startsWith(item.path + "/")
                          ? "text-white font-semibold"
                          : "text-white/60 hover:text-white hover:bg-white/5"
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
      <div className="px-4 py-3 border-t border-white/10">
        <p className="text-white/30 text-[10px] leading-tight">
          Copyright © 2016 - 2026
        </p>
        <p className="text-cyan-400/60 text-[10px] leading-tight mt-0.5">
          Niagawan Plus Sdn. Bhd.
        </p>
      </div>
    </aside>
  );
}
