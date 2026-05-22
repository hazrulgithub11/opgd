import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Printer, Download, Plus, Info } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import FilterBar from "@/components/shared/FilterBar";
import DataTable, { Column } from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockInvoices, Invoice } from "@/data/mockInvoices";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = ["All", "Paid", "Unpaid", "Partial", "Cancelled"];

export default function InvoiceList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = mockInvoices.filter((inv) => {
    const matchSearch =
      !search ||
      inv.invNo.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "All" || inv.status === status;
    return matchSearch && matchStatus;
  });

  const columns: Column<Invoice>[] = [
    { key: "date", header: "Date", className: "text-gray-500 w-24" },
    {
      key: "invNo",
      header: "INV#",
      render: (row) => (
        <span className="text-cyan-600 font-medium">{row.invNo}</span>
      ),
    },
    { key: "customerName", header: "Name" },
    {
      key: "total",
      header: "Total",
      render: (row) => row.total.toFixed(2),
      className: "text-right",
      headerClassName: "text-right",
    },
    {
      key: "balance",
      header: "Balance",
      render: (row) => row.balance.toFixed(2),
      className: "text-right",
      headerClassName: "text-right",
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "dueDate",
      header: "Due",
      render: (row) => row.dueDate ?? "-",
      className: "text-gray-400",
    },
    { key: "by", header: "By", className: "text-gray-500" },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <PageHeader title="Sale Invoice">
        {/* Onboarding banner */}
        <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded p-3 flex gap-3">
          <Info className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-yellow-800 mb-1">
              Create Your First Invoice
            </p>
            <p className="text-xs text-yellow-700 mb-2">
              Easily create sales invoice and request payment from customers.
            </p>
            <ul className="text-xs text-cyan-600 space-y-0.5">
              <li className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0" />
                Watch how to create invoice
              </li>
              <li className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0" />
                Complete document settings
              </li>
              <li className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0" />
                Add shipping method
              </li>
            </ul>
          </div>
        </div>

        <FilterBar
          showStatus
          statusOptions={STATUS_OPTIONS}
          statusValue={status}
          onStatusChange={setStatus}
          searchValue={search}
          onSearchChange={setSearch}
          extraFilters={
            <Select defaultValue="All">
              <SelectTrigger className="h-8 w-28 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
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
                onClick={() => navigate("/sale/invoice/new")}
                className="h-8 px-3 flex items-center gap-1.5 rounded text-xs font-semibold text-white transition-colors"
                style={{ backgroundColor: "#06b6d4" }}
              >
                <Plus className="w-3.5 h-3.5" />
                New
              </button>
            </div>
          }
        />

        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(row) => row.id}
          onRowClick={(row) => navigate(`/sale/invoice/${row.id}`)}
          totalRecords={131}
          currentPage={1}
          totalPages={2}
        />
      </PageHeader>
    </div>
  );
}
