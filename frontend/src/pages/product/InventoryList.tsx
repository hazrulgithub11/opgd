import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Printer, Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable, { Column } from "@/components/shared/DataTable";
import { mockInventory, InventoryItem } from "@/data/mockInventory";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productCategories } from "@/data/mockProducts";

const STOCK_STATUS = ["All", "In Stock", "Out of Stock"];

export default function InventoryList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stockStatus, setStockStatus] = useState("All");

  const filtered = mockInventory.filter((item) => {
    const matchSearch =
      !search ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || item.category === category;
    const matchStatus =
      stockStatus === "All" ||
      (stockStatus === "In Stock" && item.balance > 0) ||
      (stockStatus === "Out of Stock" && item.balance === 0);
    return matchSearch && matchCategory && matchStatus;
  });

  const columns: Column<InventoryItem>[] = [
    {
      key: "code",
      header: "Code",
      render: (row) => (
        <span className="text-cyan-600 font-medium text-[11px]">{row.code}</span>
      ),
    },
    { key: "description", header: "Description" },
    {
      key: "in",
      header: "In",
      render: (row) => <span className="text-gray-700">{row.in}</span>,
      className: "text-right w-12",
      headerClassName: "text-right",
    },
    {
      key: "influenced",
      header: "Influenced",
      render: (row) => <span className="text-gray-700">{row.influenced}</span>,
      className: "text-right w-16",
      headerClassName: "text-right",
    },
    {
      key: "out",
      header: "Out",
      render: (row) => <span className="text-gray-700">{row.out}</span>,
      className: "text-right w-12",
      headerClassName: "text-right",
    },
    {
      key: "loss",
      header: "Loss",
      render: (row) => <span className="text-gray-700">{row.loss}</span>,
      className: "text-right w-12",
      headerClassName: "text-right",
    },
    {
      key: "damage",
      header: "Damage",
      render: (row) => <span className="text-gray-700">{row.damage}</span>,
      className: "text-right w-16",
      headerClassName: "text-right",
    },
    {
      key: "balance",
      header: "Balance",
      render: (row) => (
        <span className={row.balance > 0 ? "text-green-600 font-medium" : "text-gray-400"}>
          {row.balance}
        </span>
      ),
      className: "text-right w-16",
      headerClassName: "text-right",
    },
    {
      key: "toDeliver",
      header: "To Deliver",
      render: (row) => <span className="text-gray-700">{row.toDeliver}</span>,
      className: "text-right w-20",
      headerClassName: "text-right",
    },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <PageHeader title="Inventory">
        <Tabs defaultValue="stock-balance">
          <TabsList className="h-8 text-xs mb-4">
            <TabsTrigger value="stock-balance" className="text-xs">
              Stock Balance
            </TabsTrigger>
            <TabsTrigger value="stock-adjustment" className="text-xs">
              Stock Adjustment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stock-balance" className="mt-0">
            {/* Filter bar */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-8 w-32 text-xs">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All" className="text-xs">
                    All Categories
                  </SelectItem>
                  {productCategories.filter((c) => c !== "No Category").map((c) => (
                    <SelectItem key={c} value={c} className="text-xs">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={stockStatus} onValueChange={setStockStatus}>
                <SelectTrigger className="h-8 w-28 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {STOCK_STATUS.map((s) => (
                    <SelectItem key={s} value={s} className="text-xs">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <Input
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 pl-8 text-xs w-48"
                />
              </div>

              <div className="flex-1" />

              <button className="h-8 px-3 flex items-center gap-1.5 border border-gray-300 rounded bg-white text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                <Printer className="w-3.5 h-3.5" />
                Print
              </button>
              <button className="h-8 px-3 flex items-center gap-1.5 border border-gray-300 rounded bg-white text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
            </div>

            <DataTable
              columns={columns}
              data={filtered}
              rowKey={(item) => item.id}
              onRowClick={(item) => navigate(`/product/inventory/${item.id}`)}
              totalRecords={299}
              currentPage={1}
              totalPages={3}
            />
          </TabsContent>

          <TabsContent value="stock-adjustment" className="mt-0">
            <div className="py-16 text-center text-gray-400">
              <p className="text-sm">Stock Adjustment</p>
              <p className="text-xs mt-1">Use this tab to adjust stock quantities.</p>
            </div>
          </TabsContent>
        </Tabs>
      </PageHeader>
    </div>
  );
}
