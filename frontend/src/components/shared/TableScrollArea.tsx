import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TableScrollAreaProps {
  children: ReactNode;
  className?: string;
}

export default function TableScrollArea({ children, className }: TableScrollAreaProps) {
  return (
    <div className={cn("overflow-x-auto touch-pan-x overscroll-x-contain", className)}>
      {children}
    </div>
  );
}
