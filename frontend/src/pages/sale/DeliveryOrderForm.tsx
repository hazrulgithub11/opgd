import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Printer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockDeliveryOrders } from "@/data/mockDeliveryOrders";
import { mockInvoices } from "@/data/mockInvoices";

export default function DeliveryOrderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const existing = isEdit ? mockDeliveryOrders.find((d) => d.id === id) : null;

  const [invNo, setInvNo] = useState(existing?.invNo ?? "");
  const [shipBy, setShipBy] = useState(existing?.shipBy ?? "");
  const [date, setDate] = useState(existing?.date ?? new Date().toLocaleDateString("en-GB"));
  const [shipDate, setShipDate] = useState(existing?.shipDate ?? "");
  const [tracking, setTracking] = useState(existing?.tracking ?? "");
  const [billingInfo, setBillingInfo] = useState(existing?.billingInfo ?? "");
  const [shippingInfo, setShippingInfo] = useState(existing?.shippingInfo ?? "");
  const [ref, setRef] = useState(existing?.ref ?? "");
  const [status, setStatus] = useState(existing?.status ?? "To Deliver");
  const [remarks, setRemarks] = useState(existing?.remarks ?? "");

  const linkedInvoice = mockInvoices.find((inv) => inv.invNo === invNo);
  const items = existing?.items ?? linkedInvoice?.items.map((i) => ({
    id: i.id, description: i.description, balance: i.unit, unit: i.unit, checked: false,
  })) ?? [];

  const totalUnits = items.reduce((s, i) => s + i.unit, 0);

  return (
    <div className="min-h-full bg-gray-50 pb-8">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h1 className="text-lg font-bold text-gray-800 tracking-wide uppercase">
          {isEdit ? `Edit Delivery Order : ${existing?.doNo}` : "New Delivery Order"}
        </h1>
      </div>

      <div className="px-6 pt-5 max-w-5xl">
        <div className="bg-white rounded border border-gray-200 p-5 mb-4">
          <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            Delivery Order Info:
          </p>

          <div className="grid grid-cols-4 gap-4 mb-3">
            <div>
              <Label className="text-xs text-gray-500 mb-1">Sales Invoice *</Label>
              <Select value={invNo} onValueChange={setInvNo}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select invoice" />
                </SelectTrigger>
                <SelectContent>
                  {mockInvoices.map((inv) => (
                    <SelectItem key={inv.id} value={inv.invNo} className="text-xs">
                      {inv.invNo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Input value={date} onChange={(e) => setDate(e.target.value)} className="h-8 text-xs" />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1">Ship date</Label>
              <Input value={shipDate} onChange={(e) => setShipDate(e.target.value)} className="h-8 text-xs" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-3">
            <div className="col-span-2">
              <Label className="text-xs text-gray-500 mb-1">Tracking</Label>
              <Input value={tracking} onChange={(e) => setTracking(e.target.value)} className="h-8 text-xs" />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1">Ref</Label>
              <Input value={ref} onChange={(e) => setRef(e.target.value)} className="h-8 text-xs" />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1">Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["To Deliver", "Delivered", "Cancelled"].map((s) => (
                    <SelectItem key={s} value={s} className="text-xs">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-gray-500 mb-1">Billing Info</Label>
              <Input value={billingInfo} onChange={(e) => setBillingInfo(e.target.value)} className="h-8 text-xs" />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                Shipping Info
                <Pencil className="w-3 h-3 text-cyan-500 cursor-pointer" />
              </Label>
              <Input value={shippingInfo} onChange={(e) => setShippingInfo(e.target.value)} className="h-8 text-xs" />
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded border border-gray-200 p-5 mb-4">
          <table className="w-full text-xs mb-4">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-200">
                <th className="px-3 py-2 text-left font-semibold text-gray-600">Description</th>
                <th className="px-3 py-2 text-right font-semibold text-gray-600 w-20">Balance</th>
                <th className="px-3 py-2 text-right font-semibold text-gray-600 w-20">Unit</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-400">
                    Select a Sales Invoice to load items.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="px-3 py-2 text-gray-700">{item.description}</td>
                    <td className="px-3 py-2 text-right text-gray-700">{item.balance}</td>
                    <td className="px-3 py-2 text-right text-gray-700">{item.unit}</td>
                  </tr>
                ))
              )}
              {items.length > 0 && (
                <tr className="bg-gray-50 font-semibold text-xs">
                  <td className="px-3 py-2 text-gray-600">Total</td>
                  <td colSpan={2} className="px-3 py-2 text-right text-gray-800">{totalUnits} Unit</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-gray-500 mb-1">Remarks</Label>
              <Textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} className="text-xs resize-none" />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1">Terms & Conditions:</Label>
              <Textarea rows={3} className="text-xs resize-none" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate("/sale/delivery-order")}
            className="h-8 px-4 text-xs border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button className="h-8 px-4 text-xs border border-cyan-500 rounded text-cyan-600 bg-white hover:bg-cyan-50 transition-colors flex items-center gap-1.5">
            <Printer className="w-3.5 h-3.5" />
            Save & Print
          </button>
          <button
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
