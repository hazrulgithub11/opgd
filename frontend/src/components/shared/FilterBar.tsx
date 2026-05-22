import { ReactNode } from "react";
import { Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  showYear?: boolean;
  showMonth?: boolean;
  showStatus?: boolean;
  statusOptions?: string[];
  statusValue?: string;
  onStatusChange?: (v: string) => void;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  extraFilters?: ReactNode;
  actions?: ReactNode;
}

const YEARS = ["2026", "2025", "2024"];
const MONTHS = [
  "All",
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function FilterBar({
  showYear = true,
  showMonth = true,
  showStatus = false,
  statusOptions = [],
  statusValue,
  onStatusChange,
  searchValue = "",
  onSearchChange,
  extraFilters,
  actions,
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap mb-3">
      {showYear && (
        <Select defaultValue="2026">
          <SelectTrigger className="h-8 w-20 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {YEARS.map((y) => (
              <SelectItem key={y} value={y} className="text-xs">
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {showMonth && (
        <>
          <Select defaultValue="All">
            <SelectTrigger className="h-8 w-20 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((m) => (
                <SelectItem key={m} value={m} className="text-xs">
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="All">
            <SelectTrigger className="h-8 w-14 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 31 }, (_, i) => String(i + 1)).map((d) => (
                <SelectItem key={d} value={d} className="text-xs">
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button className="h-8 w-8 flex items-center justify-center border border-gray-200 rounded bg-white hover:bg-gray-50 transition-colors">
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </>
      )}

      {showStatus && statusOptions.length > 0 && (
        <Select value={statusValue} onValueChange={onStatusChange}>
          <SelectTrigger className="h-8 w-28 text-xs">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((s) => (
              <SelectItem key={s} value={s} className="text-xs">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {extraFilters}

      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <Input
          placeholder="Search"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="h-8 pl-8 text-xs w-48"
        />
      </div>

      <div className="flex-1" />

      {actions}
    </div>
  );
}
