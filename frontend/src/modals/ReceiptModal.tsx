import { X } from "lucide-react";
import { Invoice } from "@/data/mockInvoices";
import { mockReceipts } from "@/data/mockReceipts";

interface ReceiptModalProps {
  invoice: Invoice;
  onClose: () => void;
}

export default function ReceiptModal({ invoice, onClose }: ReceiptModalProps) {
  const receipts = mockReceipts.filter((r) =>
    r.invoices.some((inv) => inv.invNo === invoice.invNo)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-[640px]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-800">Receipt</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-4">
          {receipts.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-8">
              No receipts found for this invoice.
            </p>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200">
                  <th className="px-3 py-2 text-left font-semibold text-cyan-600">
                    Date
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-cyan-600">
                    RCP#
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-cyan-600">
                    Bank / Cash
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-cyan-600">
                    Amount
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-cyan-600">
                    Reference
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-cyan-600">
                    File
                  </th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100">
                    <td className="px-3 py-2 text-gray-700">{r.date}</td>
                    <td className="px-3 py-2 text-cyan-600 font-medium">
                      {r.rcpNo}
                    </td>
                    <td className="px-3 py-2 text-gray-700">{r.bankCash}</td>
                    <td className="px-3 py-2 text-right text-gray-700">
                      {r.totalPayment.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-gray-500">
                      {r.reference ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-gray-400">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
