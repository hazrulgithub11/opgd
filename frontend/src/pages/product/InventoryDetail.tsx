import { useNavigate, useParams } from "react-router-dom";
import { Printer, Download } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DataTable, { Column } from "@/components/shared/DataTable";
import FilterBar from "@/components/shared/FilterBar";
import { mockInventory, mockStockMovements, StockMovement } from "@/data/mockInventory";

export default function InventoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = mockInventory.find((i) => i.id === id);
  const movements: StockMovement[] = mockStockMovements[id ?? ""] ?? [];

  if (!item) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Item not found.</p>
      </div>
    );
  }

  const totalQty = movements.reduce((s, m) => s + m.quantity, 0);

  const columns: Column<StockMovement>[] = [
    { key: "date", header: "Date", className: "text-gray-500 w-24" },
    {
      key: "movement",
      header: "Movement",
      render: (row) => (
        <span
          className={
            row.quantity > 0 ? "text-green-600 font-medium" : "text-red-500 font-medium"
          }
        >
          {row.movement}
        </span>
      ),
    },
    { key: "remark", header: "Remark", className: "text-gray-500" },
    {
      key: "quantity",
      header: "Quantity",
      render: (row) => (
        <span className={row.quantity > 0 ? "text-green-600" : "text-red-500"}>
          {row.quantity > 0 ? `+${row.quantity}` : row.quantity}
        </span>
      ),
      className: "text-right w-20",
      headerClassName: "text-right",
    },
    {
      key: "balance",
      header: "Balance",
      render: (row) => <span className="font-medium text-gray-800">{row.balance}</span>,
      className: "text-right w-20",
      headerClassName: "text-right",
    },
    { key: "by", header: "By", className: "text-gray-500 w-20" },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-lg font-bold text-gray-800 tracking-wide uppercase mb-4">
          Inventory
        </h1>

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
            {/* Product title */}
            <div className="mb-3">
              <h2 className="text-sm font-bold text-gray-800 uppercase">
                {item.description}
              </h2>
            </div>

            <FilterBar
              showYear
              showMonth
              searchValue=""
              actions={
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate("/product/inventory")}
                    className="h-8 px-3 text-xs border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button className="h-8 px-3 flex items-center gap-1.5 border border-gray-300 rounded bg-white text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                    <Printer className="w-3.5 h-3.5" />
                    Print
                  </button>
                  <button className="h-8 px-3 flex items-center gap-1.5 border border-gray-300 rounded bg-white text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    Export
                  </button>
                  <button
                    className="h-8 px-3 text-xs rounded text-white font-semibold transition-colors"
                    style={{ backgroundColor: "#06b6d4" }}
                  >
                    Adjust Stock
                  </button>
                </div>
              }
            />

            <DataTable
              columns={columns}
              data={movements}
              rowKey={(m) => m.id}
              showArrow={false}
              emptyMessage="No stock movements recorded for this item."
              totalRecords={movements.length}
              currentPage={1}
              totalPages={1}
            />

            {/* Total row */}
            {movements.length > 0 && (
              <div className="mt-1 bg-white border border-gray-200 border-t-0 rounded-b px-3 py-2 flex justify-end gap-16 text-xs">
                <span className="font-semibold text-gray-600">Total:</span>
                <span className="font-bold text-gray-800 w-16 text-right">{totalQty}</span>
                <span className="w-20" />
              </div>
            )}
          </TabsContent>

          <TabsContent value="stock-adjustment" className="mt-0">
            <div className="py-16 text-center text-gray-400">
              <p className="text-sm">Stock Adjustment for {item.description}</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
