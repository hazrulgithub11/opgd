import { useState } from "react";
import { X, Minus, Plus as PlusIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockProducts, Product, productCategories } from "@/data/mockProducts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NewProductModal from "./NewProductModal";

interface AddItemModalProps {
  onClose: () => void;
  onAdd: (products: { product: Product; qty: number }[]) => void;
}

export default function AddItemModal({ onClose, onAdd }: AddItemModalProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showNewProduct, setShowNewProduct] = useState(false);

  const filtered = mockProducts.filter((p) => {
    const matchSearch =
      !search ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  const setQty = (id: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, qty) }));
  };

  const handleAdd = () => {
    const selected = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const product = mockProducts.find((p) => p.id === id)!;
        return { product, qty };
      });
    if (selected.length > 0) onAdd(selected);
  };

  const totalSelected = Object.values(quantities).filter((q) => q > 0).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-[680px] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-800">Add Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="product" className="h-full">
            <div className="px-5 pt-3">
              <TabsList className="h-8 text-xs mb-3">
                <TabsTrigger value="product" className="text-xs">
                  Product
                </TabsTrigger>
                <TabsTrigger value="package" className="text-xs">
                  Package
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="product" className="mt-0 px-5">
              {/* Filters */}
              <div className="flex items-center gap-2 mb-3">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-8 w-32 text-xs">
                    <SelectValue />
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

                <Select defaultValue="All">
                  <SelectTrigger className="h-8 w-28 text-xs">
                    <SelectValue placeholder="Price Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All" className="text-xs">
                      All Price Types
                    </SelectItem>
                    <SelectItem value="Retail" className="text-xs">
                      Retail
                    </SelectItem>
                    <SelectItem value="Wholesale" className="text-xs">
                      Wholesale
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <Input
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8 pl-8 text-xs"
                  />
                </div>

                <button
                  onClick={() => setShowNewProduct(true)}
                  className="h-8 px-3 text-xs font-semibold text-white rounded transition-colors"
                  style={{ backgroundColor: "#06b6d4" }}
                >
                  New Product
                </button>
              </div>

              <p className="text-xs text-gray-500 mb-2">
                1 - {Math.min(100, filtered.length)} of {filtered.length} records
              </p>

              {/* Product list */}
              <div className="space-y-px border border-gray-200 rounded overflow-hidden">
                {filtered.slice(0, 100).map((product) => {
                  const qty = quantities[product.id] ?? 0;
                  return (
                    <div
                      key={product.id}
                      className="flex items-center justify-between px-3 py-2 bg-white hover:bg-gray-50 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex-1 min-w-0 mr-4">
                        <p className="text-xs font-medium text-cyan-600 truncate">
                          {product.code} — {product.description}
                        </p>
                        <p className="text-xs text-gray-400">
                          Stock: {product.stock} | Price: {product.sellingPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => setQty(product.id, qty - 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-medium text-gray-800">
                          {qty}
                        </span>
                        <button
                          onClick={() => setQty(product.id, qty + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <PlusIcon className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="package" className="mt-0 px-5">
              <div className="py-12 text-center text-gray-400 text-sm">
                No packages available.
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {totalSelected > 0 ? `${totalSelected} product(s) selected` : ""}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="h-8 px-4 text-xs border border-gray-300 rounded text-gray-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleAdd}
              disabled={totalSelected === 0}
              className="h-8 px-4 text-xs rounded text-white font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#06b6d4" }}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {showNewProduct && (
        <NewProductModal onClose={() => setShowNewProduct(false)} />
      )}
    </div>
  );
}
