import { useState } from "react";
import { X, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productCategories } from "@/data/mockProducts";

interface NewProductModalProps {
  onClose: () => void;
  onSave?: (product: Record<string, unknown>) => void;
}

export default function NewProductModal({ onClose, onSave }: NewProductModalProps) {
  const [description, setDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [promo, setPromo] = useState("");
  const [costPerUnit, setCostPerUnit] = useState("");
  const [category, setCategory] = useState("No Category");
  const [productCode, setProductCode] = useState("");
  const [openingStock, setOpeningStock] = useState("0");
  const [barcode, setBarcode] = useState("");

  const handleSave = () => {
    onSave?.({
      description,
      sellingPrice: parseFloat(sellingPrice) || 0,
      promoPrice: parseFloat(promo) || undefined,
      costPerUnit: parseFloat(costPerUnit) || 0,
      category,
      productCode,
      openingStock: parseInt(openingStock) || 0,
      barcode,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-[560px]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-800">New Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Description + Attachment */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="text-xs text-gray-500 mb-1">Description *</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-8 text-xs"
                placeholder="Product description"
              />
            </div>
            <div className="w-52">
              <Label className="text-xs text-gray-500 mb-1">Attachment:</Label>
              <div className="border border-dashed border-gray-300 rounded p-3 flex flex-col items-center gap-1">
                <Upload className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-400">No file chosen</span>
                <span className="text-[10px] text-gray-300">
                  Supported file type: PNG, JPG
                </span>
              </div>
            </div>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-xs text-gray-500 mb-1">Selling price *</Label>
              <Input
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="h-8 text-xs"
                placeholder="0.00"
                type="number"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1">Promo:</Label>
              <Input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="h-8 text-xs"
                placeholder="0.00"
                type="number"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1">Cost / unit:</Label>
              <Input
                value={costPerUnit}
                onChange={(e) => setCostPerUnit(e.target.value)}
                className="h-8 text-xs"
                placeholder="0.00"
                type="number"
              />
            </div>
          </div>

          {/* Category + Product Code + Opening Stock */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-xs text-gray-500 mb-1">Category:</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((c) => (
                    <SelectItem key={c} value={c} className="text-xs">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1">Product code:</Label>
              <Input
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1">Opening stock:</Label>
              <Input
                value={openingStock}
                onChange={(e) => setOpeningStock(e.target.value)}
                className="h-8 text-xs"
                type="number"
              />
            </div>
          </div>

          {/* Barcode */}
          <div className="max-w-xs">
            <Label className="text-xs text-gray-500 mb-1">Barcode:</Label>
            <Input
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="h-8 text-xs"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-8 px-4 text-xs border border-gray-300 rounded text-gray-600 bg-white hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleSave}
            className="h-8 px-4 text-xs rounded text-white font-semibold transition-colors"
            style={{ backgroundColor: "#06b6d4" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
