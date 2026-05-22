import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Printer, Download, Plus } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import FilterBar from "@/components/shared/FilterBar";
import DataTable, { Column } from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockDeliveryOrders, DeliveryOrder } from "@/data/mockDeliveryOrders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = ["All", "Delivered", "To Deliver", "Cancelled"];

export default function DeliveryOrderList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = mockDeliveryOrders.filter((d) => {
    const matchSearch =
      !search ||
      d.doNo.toLowerCase().includes(search.toLowerCase()) ||
      d.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "All" || d.status === status;
    return matchSearch && matchStatus;
  });

  const columns: Column<DeliveryOrder>[] = [
    { key: "date", header: "Date", className: "text-gray-500 w-24" },
    {
      key: "doNo",
      header: "DO#",
      render: (row) => (
        <span className="text-cyan-600 font-medium">{row.doNo}</span>
      ),
    },
    { key: "customerName", header: "Name" },
    {
      key: "invNo",
      header: "Inv#",
      render: (row) => (
        <span className="text-cyan-600">{row.invNo}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    { key: "shipBy", header: "Ship By", className: "text-gray-500" },
    { key: "shipDate", header: "Ship Date", className: "text-gray-500" },
    { key: "tracking", header: "Tracking No", className: "text-gray-500", render: (row) => row.tracking ?? "-" },
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
      <PageHeader title="Delivery Order">
        <FilterBar
          showStatus
          statusOptions={STATUS_OPTIONS}
          statusValue={status}
          onStatusChange={setStatus}
          searchValue={search}
          onSearchChange={setSearch}
          extraFilters={
            <Select value={status} onValueChange={setStatus}>
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
              <button className="h-8 px-3 text-xs border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 transition-colors">
                Uncreated DO
              </button>
              <button className="h-8 px-3 flex items-center gap-1.5 border border-gray-300 rounded bg-white text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
              <button
                onClick={() => navigate("/sale/delivery-order/new")}
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
          rowKey={(d) => d.id}
          onRowClick={(d) => navigate(`/sale/delivery-order/${d.id}`)}
          totalRecords={131}
          currentPage={1}
          totalPages={2}
        />
      </PageHeader>
    </div>
  );
}
