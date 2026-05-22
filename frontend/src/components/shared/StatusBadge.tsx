import { cn } from "@/lib/utils";

type StatusVariant =
  | "Paid"
  | "Unpaid"
  | "Partial"
  | "Cancelled"
  | "Approved"
  | "Pending"
  | "Delivered"
  | "To Deliver";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const variantMap: Record<string, string> = {
  Paid: "bg-green-100 text-green-700 border border-green-200",
  Unpaid: "bg-red-100 text-red-600 border border-red-200",
  Partial: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Cancelled: "bg-gray-100 text-gray-500 border border-gray-200",
  Approved: "bg-green-100 text-green-700 border border-green-200",
  Pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Delivered: "bg-blue-100 text-blue-600 border border-blue-200",
  "To Deliver": "bg-orange-100 text-orange-600 border border-orange-200",
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap",
        variantMap[status] ?? "bg-gray-100 text-gray-600 border border-gray-200",
        className
      )}
    >
      {status}
    </span>
  );
}
