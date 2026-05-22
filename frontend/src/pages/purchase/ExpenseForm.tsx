import { useState } from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ledgerOptions } from "@/data/mockExpenses";

export default function ExpenseForm() {
  const [date, setDate] = useState(new Date().toLocaleDateString("en-GB"));
  const [transactionType, setTransactionType] = useState("Credit");
  const [particular, setParticular] = useState("");
  const [bankCash, setBankCash] = useState("Cash");
  const [amount, setAmount] = useState("0.00");
  const [ledger, setLedger] = useState("Please select ledger");
  const [payerPayee, setPayerPayee] = useState("");
  const [reference, setReference] = useState("");

  const handleSave = () => {
    setDate(new Date().toLocaleDateString("en-GB"));
    setTransactionType("Credit");
    setParticular("");
    setBankCash("Cash");
    setAmount("0.00");
    setLedger("Please select ledger");
    setPayerPayee("");
    setReference("");
  };

  return (
    <div className="min-h-full bg-gray-50 pb-8">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200 bg-white">
        <h1 className="text-lg font-bold text-gray-800 tracking-wide uppercase">
          New Expense
        </h1>
      </div>

      <div className="px-6 pt-5 max-w-4xl">
        <div className="bg-white rounded border border-gray-200 p-6">
          {/* Row 1: Date | Transaction type | Attachment */}
          <div className="flex gap-6 mb-5">
            <div className="flex-1">
              <Label className="text-xs text-gray-500 mb-1">Date *</Label>
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-8 text-xs max-w-xs"
                type="text"
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-500 mb-1">Transaction type:</Label>
              <Select value={transactionType} onValueChange={setTransactionType}>
                <SelectTrigger className="h-8 text-xs max-w-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Credit" className="text-xs">Credit</SelectItem>
                  <SelectItem value="Debit" className="text-xs">Debit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-64">
              <Label className="text-xs text-gray-500 mb-1">Attachment:</Label>
              <div className="border border-dashed border-gray-300 rounded p-3 flex flex-col items-center gap-1 cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-400">No file chosen</span>
                <span className="text-[10px] text-gray-300">
                  Supported file type: PNG, JPG or PDF
                </span>
              </div>
              <div className="mt-2">
                <Label className="text-xs text-gray-500">Preview:</Label>
                <div className="border border-gray-200 rounded h-16 bg-gray-50 mt-1 flex items-center justify-center">
                  <span className="text-xs text-gray-300">No preview</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Particular */}
          <div className="mb-5">
            <Label className="text-xs text-gray-500 mb-1">Particular *</Label>
            <Input
              value={particular}
              onChange={(e) => setParticular(e.target.value)}
              className="h-8 text-xs"
              placeholder="Expense description"
            />
          </div>

          {/* Row 3: Bank/Cash | Amount */}
          <div className="flex gap-4 mb-5">
            <div className="flex-1 max-w-xs">
              <Label className="text-xs text-gray-500 mb-1">Bank / Cash *</Label>
              <Select value={bankCash} onValueChange={setBankCash}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash" className="text-xs">Cash</SelectItem>
                  <SelectItem value="Bank" className="text-xs">Bank</SelectItem>
                  <SelectItem value="eWallet" className="text-xs">eWallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 max-w-xs">
              <Label className="text-xs text-gray-500 mb-1">Amount *</Label>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-8 text-xs"
                type="number"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Row 4: Ledger */}
          <div className="mb-5">
            <Label className="text-xs text-gray-500 mb-1">Ledger *</Label>
            <Select value={ledger} onValueChange={setLedger}>
              <SelectTrigger className="h-8 text-xs max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ledgerOptions.map((l) => (
                  <SelectItem key={l} value={l} className="text-xs">
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Row 5: Payer/Payee | Reference */}
          <div className="flex gap-4">
            <div className="flex-1 max-w-xs">
              <Label className="text-xs text-gray-500 mb-1">Payer / Payee:</Label>
              <Input
                value={payerPayee}
                onChange={(e) => setPayerPayee(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div className="flex-1 max-w-xs">
              <Label className="text-xs text-gray-500 mb-1">Reference:</Label>
              <Input
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="h-8 px-5 text-xs rounded text-white font-semibold transition-colors"
            style={{ backgroundColor: "#06b6d4" }}
          >
            Save &amp; New
          </button>
        </div>
      </div>
    </div>
  );
}
