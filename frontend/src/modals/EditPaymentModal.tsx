import { useState } from "react";
import { X, Upload } from "lucide-react";
import TableScrollArea from "@/components/shared/TableScrollArea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Receipt } from "@/data/mockReceipts";

interface EditPaymentModalProps {
  receipt: Receipt;
  onClose: () => void;
}

export default function EditPaymentModal({ receipt, onClose }: EditPaymentModalProps) {
  const [name, setName] = useState(receipt.customerName);
  const [date, setDate] = useState(receipt.date);
  const [bankCash, setBankCash] = useState(receipt.bankCash);
  const [totalPayment, setTotalPayment] = useState(
    String(receipt.totalPayment)
  );
  const [autoCalculate, setAutoCalculate] = useState(false);
  const [reference, setReference] = useState(receipt.reference ?? "");

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-lg bg-white shadow-xl sm:max-w-[640px] sm:rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-800">
            Edit Invoice Payment — {receipt.rcpNo}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto px-5 py-4">
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Left column */}
            <div className="flex-1 space-y-3">
              <div>
                <Label className="text-xs text-gray-500 mb-1">Name *</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1">Date *</Label>
                  <Input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1">
                    Bank / Cash *
                  </Label>
                  <Select value={bankCash} onValueChange={setBankCash}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Bank", "Cash", "eWallet"].map((b) => (
                        <SelectItem key={b} value={b} className="text-xs">
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1">
                    Total payment *
                  </Label>
                  <Input
                    value={totalPayment}
                    onChange={(e) => setTotalPayment(e.target.value)}
                    className="h-8 text-xs"
                    type="number"
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                    <Checkbox
                      checked={autoCalculate}
                      onCheckedChange={(c) => setAutoCalculate(Boolean(c))}
                      className="w-3.5 h-3.5"
                    />
                    Auto calculate
                  </label>
                </div>
              </div>
            </div>

            {/* Right column - Attachment */}
            <div className="w-full md:w-52">
              <Label className="text-xs text-gray-500 mb-1">Attachment:</Label>
              <div className="border border-dashed border-gray-300 rounded p-4 flex flex-col items-center gap-1">
                <Upload className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-400">No file chosen</span>
                <span className="text-[10px] text-gray-300 text-center">
                  Supported file type: PNG, JPG or PDF
                </span>
              </div>
            </div>
          </div>

          {/* Invoice table */}
          <TableScrollArea className="rounded border border-gray-200">
            <table className="min-w-max w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-3 py-2 text-left w-6" />
                  <th className="px-3 py-2 text-left font-semibold text-cyan-600">
                    Date
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-cyan-600">
                    INV#
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-cyan-600">
                    Total
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-cyan-600">
                    Balance
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-cyan-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {receipt.invoices.map((inv, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="px-3 py-2">
                      <Checkbox className="w-3.5 h-3.5" defaultChecked />
                    </td>
                    <td className="px-3 py-2 text-gray-700">{inv.date}</td>
                    <td className="px-3 py-2 text-cyan-600 font-medium">
                      {inv.invNo}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-700">
                      {inv.total.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-700">
                      {inv.balance.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-700">
                      {inv.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold text-xs">
                  <td colSpan={3} className="px-3 py-2 text-gray-600">
                    Unused Balance
                  </td>
                  <td colSpan={3} className="px-3 py-2 text-right text-gray-700">
                    0.00
                  </td>
                </tr>
              </tbody>
            </table>
          </TableScrollArea>

          <div>
            <Label className="text-xs text-gray-500 mb-1">Reference:</Label>
            <Input
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="h-8 text-xs max-w-xs"
            />
          </div>
        </div>

        <div className="px-5 py-3 border-t border-gray-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-8 px-4 text-xs border border-gray-300 rounded text-gray-600 bg-white hover:bg-gray-50 transition-colors"
          >
            Back
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
