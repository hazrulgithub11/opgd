import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Printer, Copy, MessageCircle } from "lucide-react";
import DocumentLayout from "@/components/layout/DocumentLayout";
import ActionSidebar from "@/components/shared/ActionSidebar";
import TableScrollArea from "@/components/shared/TableScrollArea";
import PageHeader from "@/components/shared/PageHeader";
import { mockInvoices } from "@/data/mockInvoices";
import ReceiptModal from "@/modals/ReceiptModal";

export default function InvoiceView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showReceipt, setShowReceipt] = useState(false);

  const invoice = mockInvoices.find((inv) => inv.id === id);

  if (!invoice) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Invoice not found.</p>
      </div>
    );
  }

  const actions = [
    { label: "Whatsapp", variant: "green" as const, icon: <MessageCircle className="w-3.5 h-3.5" /> },
    { label: "Receipt", variant: "outline" as const, onClick: () => setShowReceipt(true) },
    { label: "Edit", variant: "outline" as const, onClick: () => navigate(`/sale/invoice/${id}/edit`) },
    { label: "Back", variant: "outline" as const, onClick: () => navigate("/sale/invoice") },
    { label: "Delivery Order", variant: "outline" as const },
    { label: "Credit Note", variant: "outline" as const },
    { label: "Print", variant: "outline" as const, icon: <Printer className="w-3.5 h-3.5" /> },
    { label: "Print Silam", variant: "ghost" as const },
    { label: "Copy Link", variant: "ghost" as const, icon: <Copy className="w-3.5 h-3.5" /> },
    { label: "Duplicate", variant: "ghost" as const },
    { label: "Add Another", variant: "ghost" as const },
    { label: "Cancel", variant: "danger" as const },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <div className="px-3 pt-4 pb-2 md:px-6 md:pt-6">
        <h1 className="text-lg font-bold text-gray-800 tracking-wide uppercase mb-1">
          Sale Invoice
        </h1>
      </div>

      <DocumentLayout
        document={
          <div className="w-full max-w-2xl">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-6">
              <div />
              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-800 tracking-widest">
                  INVOICE
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  OPTIONS TELESHOP (M) SDN. BHD.
                </p>
              </div>
            </div>

            {/* Bill To + Details */}
            <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:gap-8">
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  Bill To:
                </p>
                <p className="text-sm font-medium text-gray-800 break-words">
                  {invoice.billingInfo}
                </p>
              </div>
              <div className="text-left text-xs space-y-1 md:text-right">
                <p className="font-semibold text-gray-500 mb-1">Details:</p>
                <div className="grid grid-cols-2 gap-x-4 text-left">
                  <span className="text-gray-500">INV#:</span>
                  <span className="text-gray-800 font-medium">{invoice.invNo}</span>
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-800">{invoice.date}</span>
                  <span className="text-gray-500">By:</span>
                  <span className="text-gray-800">{invoice.by}</span>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <TableScrollArea className="mb-4">
              <table className="min-w-max w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200">
                  <th className="px-3 py-2 text-left font-semibold text-gray-600 w-8">
                    No
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">
                    Description
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-gray-600 w-12">
                    Unit
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-gray-600 w-20">
                    Price
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-gray-600 w-20">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="px-3 py-2 text-gray-500">{idx + 1}</td>
                    <td className="px-3 py-2 text-gray-700">{item.description}</td>
                    <td className="px-3 py-2 text-right text-gray-700">
                      {item.unit}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-700">
                      {item.price.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-700">
                      {item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </TableScrollArea>

            {/* Totals */}
            <div className="flex justify-end mb-6">
              <div className="w-48 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total (MYR):</span>
                  <span className="font-semibold text-gray-800">
                    {invoice.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment:</span>
                  <span className="text-gray-800">
                    {invoice.payment.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-1">
                  <span className="text-gray-500">Balance:</span>
                  <span className="font-semibold text-gray-800">
                    {invoice.balance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Terms */}
            {invoice.termsAndConditions && (
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-600 mb-1">
                  Terms & Conditions
                </p>
                <p className="text-xs text-gray-500 whitespace-pre-line leading-relaxed">
                  {invoice.termsAndConditions}
                </p>
              </div>
            )}

            {/* Payment slip footer */}
            <div className="border-t-2 border-dashed border-gray-300 pt-3 mt-4">
              <div className="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:gap-8">
                <span>CASH __________</span>
                <span>TRANSFER __________</span>
                <span>DEBIT/CREDIT CARD __________</span>
              </div>
            </div>
          </div>
        }
        actions={<ActionSidebar buttons={actions} />}
      />

      {showReceipt && (
        <ReceiptModal
          invoice={invoice}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
}
