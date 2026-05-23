import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Pencil, Printer, MessageCircle } from "lucide-react";
import TableScrollArea from "@/components/shared/TableScrollArea";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockInvoices, InvoiceItem } from "@/data/mockInvoices";
import AddItemModal from "@/modals/AddItemModal";
import { Product } from "@/data/mockProducts";

const defaultTnC = `1. New Set Handphone tertakluk kepada 1 TAHUN WARANTI: Used / 2ND Handphone tertakluk kepada 2 MINGGU WARANTI.
2. Pihak kedai tidak akan bertanggungjawab terhadap kerosakan oleh kecuaian pembeli selepas WARANTI seperti Water Damage (Masuk Air), Handphone Terjatuh, (SCREEN PECAH), Overcharge (Pengecasan Melampau), Handphone bengkok, Fizikal, LCD & Touch Screen, Apple ID & Lock issues, Warranty Seal Removed, Self Update version.
3. Tiada pemulangan duit setelah pembelian.`;

export default function InvoiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const existing = isEdit ? mockInvoices.find((inv) => inv.id === id) : null;

  const [customerName, setCustomerName] = useState(existing?.customerName ?? "");
  const [shipBy, setShipBy] = useState(existing?.shipBy ?? "");
  const [date, setDate] = useState(existing?.date ?? new Date().toLocaleDateString("en-GB"));
  const [paymentTerm, setPaymentTerm] = useState(existing?.paymentTerm ?? "");
  const [dueDate, setDueDate] = useState(existing?.dueDate ?? "");
  const [billingInfo, setBillingInfo] = useState(existing?.billingInfo ?? "");
  const [ref, setRef] = useState(existing?.ref ?? "");
  const [remarks, setRemarks] = useState(existing?.remarks ?? "");
  const [tnc, setTnc] = useState(existing?.termsAndConditions ?? defaultTnC);
  const [rounding, setRounding] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);

  const [items, setItems] = useState<InvoiceItem[]>(
    existing?.items ?? []
  );

  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const delivery = 0;
  const discount = 0;
  const total = subtotal + delivery - discount + (rounding ? 0 : 0);
  const balance = total;

  const handleAddProducts = (products: { product: Product; qty: number }[]) => {
    const newItems: InvoiceItem[] = products.map((p) => ({
      id: `item-${Date.now()}-${Math.random()}`,
      description: p.product.description,
      productCode: p.product.code,
      unit: p.qty,
      price: p.product.sellingPrice,
      discount: 0,
      amount: p.product.sellingPrice * p.qty,
    }));
    setItems((prev) => [...prev, ...newItems]);
    setShowAddItem(false);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  return (
    <div className="min-h-full bg-gray-50 pb-8">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h1 className="text-lg font-bold text-gray-800 tracking-wide uppercase">
          {isEdit ? `Edit Sales Invoice : ${existing?.invNo}` : "New Sales Invoice"}
        </h1>
      </div>

      <div className="px-6 pt-5 max-w-5xl">
        {/* Customer section */}
        <div className="bg-white rounded border border-gray-200 p-5 mb-4">
          <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            Customer:
          </p>
          <div className="grid grid-cols-4 gap-4 mb-3">
            <div>
              <Label className="text-xs text-gray-500 mb-1">Name *</Label>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="h-8 text-xs"
                placeholder="Customer name"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1">Ship by</Label>
              <Select value={shipBy} onValueChange={setShipBy}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  {["-", "J&T", "Pos Laju", "Grab", "Self Pickup"].map((s) => (
                    <SelectItem key={s} value={s} className="text-xs">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1">Date *</Label>
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-8 text-xs"
                type="text"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1">Payment Term</Label>
              <Select value={paymentTerm} onValueChange={setPaymentTerm}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {["Immediate", "Net 7", "Net 14", "Net 30"].map((t) => (
                    <SelectItem key={t} value={t} className="text-xs">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                Billing info
                <Pencil className="w-3 h-3 text-cyan-500 cursor-pointer" />
              </Label>
              <Input
                value={billingInfo}
                onChange={(e) => setBillingInfo(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                Shipping info
                <Pencil className="w-3 h-3 text-cyan-500 cursor-pointer" />
              </Label>
              <Input className="h-8 text-xs" placeholder="-" />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1">Ref</Label>
              <Input
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1">Due date</Label>
              <Input
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-8 text-xs"
                type="text"
              />
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-400">
            By: {isEdit ? existing?.by : "ogtb"}
          </div>
        </div>

        {/* Items table */}
        <div className="bg-white rounded border border-gray-200 p-5 mb-4">
          <div className="flex justify-end mb-2">
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setShowAddItem(true)}
                className="text-cyan-600 hover:underline font-medium"
              >
                + Add product
              </button>
              <span className="text-gray-300">|</span>
              <button className="text-cyan-600 hover:underline font-medium">
                Add open item
              </button>
            </div>
          </div>

          <button className="text-xs text-cyan-600 hover:underline mb-3 flex items-center gap-1">
            <Plus className="w-3 h-3" />
            Add title
          </button>

          <TableScrollArea className="mb-4">
            <table className="min-w-max w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-200">
                <th className="px-3 py-2 text-left font-semibold text-gray-600">
                  Description
                </th>
                <th className="px-3 py-2 text-right font-semibold text-gray-600 w-16">
                  Unit
                </th>
                <th className="px-3 py-2 text-right font-semibold text-gray-600 w-24">
                  Price
                </th>
                <th className="px-3 py-2 text-right font-semibold text-gray-600 w-24">
                  Discount
                </th>
                <th className="px-3 py-2 text-right font-semibold text-gray-600 w-24">
                  Amount
                </th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-gray-400 border-b border-gray-100"
                  >
                    No items added. Click "+ Add product" to start.
                  </td>
                </tr>
              )}
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="px-3 py-2 text-gray-700">{item.description}</td>
                  <td className="px-3 py-2 text-right text-gray-700">
                    {item.unit}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-700">
                    {item.price.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-700">
                    {item.discount.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-700 font-medium">
                    {item.amount.toFixed(2)}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </TableScrollArea>

          {/* Summary */}
          <div className="flex gap-8">
            <div className="flex-1">
              <Label className="text-xs text-gray-500 mb-1">Remarks</Label>
              <Textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                className="text-xs resize-none"
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-500 mb-1">
                Terms & Conditions:
              </Label>
              <Textarea
                value={tnc}
                onChange={(e) => setTnc(e.target.value)}
                rows={3}
                className="text-xs resize-none"
              />
            </div>
            <div className="w-48 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-800">{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                <span className="text-gray-800">{delivery.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span className="text-gray-800">{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-1">
                  <Checkbox
                    checked={rounding}
                    onCheckedChange={(c) => setRounding(Boolean(c))}
                    className="w-3 h-3"
                  />
                  Rounding
                </span>
                <span className="text-gray-800">0.00</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1 font-semibold">
                <span className="text-gray-700">Total</span>
                <span className="text-gray-900">MYR {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Balance</span>
                <span className="text-gray-800">MYR {balance.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate("/sale/invoice")}
            className="h-8 px-4 text-xs border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button className="h-8 px-4 text-xs border border-cyan-500 rounded text-cyan-600 bg-white hover:bg-cyan-50 transition-colors flex items-center gap-1.5">
            <Printer className="w-3.5 h-3.5" />
            Save & Print
          </button>
          <button className="h-8 px-4 text-xs rounded text-white font-semibold flex items-center gap-1.5 transition-colors bg-green-600 hover:bg-green-700">
            <MessageCircle className="w-3.5 h-3.5" />
            Save & Whatsapp
          </button>
        </div>
      </div>

      {showAddItem && (
        <AddItemModal
          onClose={() => setShowAddItem(false)}
          onAdd={handleAddProducts}
        />
      )}
    </div>
  );
}
