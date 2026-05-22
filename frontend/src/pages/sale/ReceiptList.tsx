import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Printer, Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import FilterBar from "@/components/shared/FilterBar";
import DataTable, { Column } from "@/components/shared/DataTable";
import { mockReceipts, Receipt } from "@/data/mockReceipts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const APPROVAL_OPTIONS = ["All", "Approved", "Pending", "Cancelled"];

export default function ReceiptList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [approval, setApproval] = useState("Approved");

  const filtered = mockReceipts.filter((r) => {
    const matchSearch =
      !search ||
      r.rcpNo.toLowerCase().includes(search.toLowerCase()) ||
      r.customerName.toLowerCase().includes(search.toLowerCase());
    const matchApproval = approval === "All" || r.status === approval;
    return matchSearch && matchApproval;
  });

  const columns: Column<Receipt>[] = [
    { key: "date", header: "Date", className: "text-gray-500 w-24" },
    {
      key: "rcpNo",
      header: "RCP#",
      render: (row) => (
        <span className="text-cyan-600 font-medium">{row.rcpNo}</span>
      ),
    },
    { key: "customerName", header: "Name" },
    {
      key: "totalPayment",
      header: "Amount",
      render: (row) => row.totalPayment.toFixed(2),
      className: "text-right",
      headerClassName: "text-right",
    },
    { key: "by", header: "By", className: "text-gray-500" },
    {
      key: "print",
      header: "",
      render: () => (
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Printer className="w-3.5 h-3.5" />
        </button>
      ),
      className: "w-8",
    },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <PageHeader title="Receipt">
        <FilterBar
          showStatus
          statusOptions={APPROVAL_OPTIONS}
          statusValue={approval}
          onStatusChange={setApproval}
          searchValue={search}
          onSearchChange={setSearch}
          extraFilters={
            <Select value={approval} onValueChange={setApproval}>
              <SelectTrigger className="h-8 w-28 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {APPROVAL_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s} className="text-xs">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
          actions={
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 flex items-center gap-1.5 border border-gray-300 rounded bg-white text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                <Printer className="w-3.5 h-3.5" />
                Print
              </button>
              <button className="h-8 px-3 flex items-center gap-1.5 border border-gray-300 rounded bg-white text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
              <button
                className="h-8 px-3 text-xs font-semibold text-white rounded transition-colors"
                style={{ backgroundColor: "#06b6d4" }}
              >
                Pay Multiple Invoice
              </button>
            </div>
          }
        />

        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(r) => r.id}
          onRowClick={(r) => navigate(`/sale/receipt/${r.id}`)}
          totalRecords={129}
          currentPage={1}
          totalPages={2}
        />
      </PageHeader>
    </div>
  );
}
