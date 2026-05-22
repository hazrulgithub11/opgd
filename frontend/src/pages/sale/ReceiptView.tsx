import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Printer, Copy, MessageCircle } from "lucide-react";
import DocumentLayout from "@/components/layout/DocumentLayout";
import ActionSidebar from "@/components/shared/ActionSidebar";
import { mockReceipts } from "@/data/mockReceipts";
import { mockInvoices } from "@/data/mockInvoices";
import EditPaymentModal from "@/modals/EditPaymentModal";

export default function ReceiptView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEditPayment, setShowEditPayment] = useState(false);

  const receipt = mockReceipts.find((r) => r.id === id);

  if (!receipt) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Receipt not found.</p>
      </div>
    );
  }

  const invoiceDetails = receipt.invoices.map((ri) => ({
    ...ri,
    invoice: mockInvoices.find((inv) => inv.invNo === ri.invNo),
  }));

  const actions = [
    { label: "Whatsapp", variant: "green" as const, icon: <MessageCircle className="w-3.5 h-3.5" /> },
    { label: "Edit", variant: "outline" as const, onClick: () => setShowEditPayment(true) },
    { label: "Back", variant: "outline" as const, onClick: () => navigate("/sale/receipt") },
    { label: "Print", variant: "outline" as const, icon: <Printer className="w-3.5 h-3.5" /> },
    { label: "Copy Link", variant: "ghost" as const, icon: <Copy className="w-3.5 h-3.5" /> },
    { label: "Cancel", variant: "danger" as const },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-lg font-bold text-gray-800 tracking-wide uppercase mb-1">
          Receipt
        </h1>
      </div>

      <DocumentLayout
        document={
          <div className="max-w-2xl">
            {/* Receipt Header */}
            <div className="flex justify-between items-start mb-6">
              <div />
              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-800 tracking-widest">
                  RECEIPT
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  OPTIONS TELESHOP (M) SDN. BHD.
                </p>
              </div>
            </div>

            {/* Bill To + Details */}
            <div className="flex justify-between gap-8 mb-6">
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  Bill To:
                </p>
                <p className="text-sm font-medium text-gray-800">
                  {receipt.customerName}
                </p>
                {receipt.customerPhone && (
                  <p className="text-xs text-gray-500">{receipt.customerPhone}</p>
                )}
              </div>
              <div className="text-right text-xs space-y-1">
                <p className="font-semibold text-gray-500 mb-1">Details:</p>
                <div className="grid grid-cols-2 gap-x-4 text-left">
                  <span className="text-gray-500">RCP#:</span>
                  <span className="text-gray-800 font-medium">{receipt.rcpNo}</span>
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-800">{receipt.date}</span>
                  <span className="text-gray-500">By:</span>
                  <span className="text-gray-800">{receipt.by}</span>
                  <span className="text-gray-500">Bank / Cash:</span>
                  <span className="text-gray-800">{receipt.bankCash}</span>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-xs mb-4">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200">
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">
                    INV
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">
                    Description
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-gray-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoiceDetails.map((detail, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="px-3 py-2 text-gray-700">{detail.date}</td>
                    <td className="px-3 py-2 text-gray-700">{detail.invNo}</td>
                    <td className="px-3 py-2 text-gray-700">
                      {detail.invoice?.items.map((i) => i.description).join(", ") ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-700">
                      {detail.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total */}
            <div className="flex justify-end mb-8">
              <div className="w-40 text-xs space-y-1 border-t border-gray-200 pt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-700">Total (MYR):</span>
                  <span className="text-gray-900">
                    {receipt.totalPayment.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                <p>Issued by:</p>
                <div className="mt-6 border-t border-gray-300 w-32 pt-1 text-center text-gray-400">
                  Signature
                </div>
              </div>
              <div className="text-xs text-gray-500">
                <p>Accepted by:</p>
                <div className="mt-6 border-t border-gray-300 w-32 pt-1 text-center text-gray-400">
                  Signature
                </div>
              </div>
            </div>
          </div>
        }
        actions={<ActionSidebar buttons={actions} />}
      />

      {showEditPayment && (
        <EditPaymentModal
          receipt={receipt}
          onClose={() => setShowEditPayment(false)}
        />
      )}
    </div>
  );
}
