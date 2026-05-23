import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ActionButton {
  label: string;
  onClick?: () => void;
  variant?: "green" | "cyan" | "outline" | "danger" | "ghost";
  icon?: ReactNode;
}

interface ActionSidebarProps {
  buttons: ActionButton[];
}

const variantClass: Record<string, string> = {
  green: "bg-green-600 hover:bg-green-700 text-white border-green-600",
  cyan: "bg-cyan-500 hover:bg-cyan-600 text-white border-cyan-500",
  outline: "bg-white hover:bg-gray-50 text-gray-700 border-gray-300",
  danger: "bg-white hover:bg-red-50 text-red-600 border-red-300",
  ghost: "bg-white hover:bg-gray-50 text-gray-600 border-gray-200",
};

export default function ActionSidebar({ buttons }: ActionSidebarProps) {
  return (
    <div className="grid grid-cols-2 gap-2 md:flex md:flex-col">
      {buttons.map((btn, i) => (
        <button
          key={i}
          onClick={btn.onClick}
          className={cn(
            "w-full py-2 px-3 rounded border text-xs font-semibold transition-colors flex items-center justify-center gap-1.5",
            variantClass[btn.variant ?? "outline"]
          )}
        >
          {btn.icon}
          {btn.label}
        </button>
      ))}
    </div>
  );
}
