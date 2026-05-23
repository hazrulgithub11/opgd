import { useNavigate, useParams } from "react-router-dom";
import { Printer, Copy, MessageCircle } from "lucide-react";
import DocumentLayout from "@/components/layout/DocumentLayout";
import ActionSidebar from "@/components/shared/ActionSidebar";
import TableScrollArea from "@/components/shared/TableScrollArea";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockDeliveryOrders } from "@/data/mockDeliveryOrders";
import { Checkbox } from "@/components/ui/checkbox";

export default function DeliveryOrderView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = mockDeliveryOrders.find((d) => d.id === id);

  if (!order) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Delivery order not found.</p>
      </div>
    );
  }

  const totalUnits = order.items.reduce((s, i) => s + i.unit, 0);

  const actions = [
    { label: "Whatsapp", variant: "green" as const, icon: <MessageCircle className="w-3.5 h-3.5" /> },
    { label: "Edit", variant: "outline" as const, onClick: () => navigate(`/sale/delivery-order/${id}/edit`) },
    { label: "Back", variant: "outline" as const, onClick: () => navigate("/sale/delivery-order") },
    { label: "Print", variant: "outline" as const, icon: <Printer className="w-3.5 h-3.5" /> },
    { label: "Copy Link", variant: "ghost" as const, icon: <Copy className="w-3.5 h-3.5" /> },
    { label: "Add Relation", variant: "ghost" as const },
    { label: "Cancel", variant: "danger" as const },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <div className="px-3 pt-4 pb-2 md:px-6 md:pt-6">
        <h1 className="text-lg font-bold text-gray-800 tracking-wide uppercase mb-1">
          Delivery Order
        </h1>
      </div>

      <DocumentLayout
        document={
          <div className="w-full max-w-2xl">
            {/* DO Header */}
            <div className="flex justify-between items-start mb-6">
              <div />
              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-800 tracking-widest">
                  DELIVERY ORDER
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  OPTIONS TELESHOP (M) SDN. BHD.
                </p>
              </div>
            </div>

            {/* Bill To + Ship To + Details */}
            <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:gap-8">
              <div className="flex-1 min-w-0">
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    Bill To:
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {order.billingInfo}
                  </p>
                </div>
                {order.shippingInfo && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">
                      Ship To:
                    </p>
                    <p className="text-sm text-gray-700">{order.shippingInfo}</p>
                  </div>
                )}
              </div>
              <div className="text-left text-xs md:text-right">
                <p className="font-semibold text-gray-500 mb-1">Details:</p>
                <div className="grid grid-cols-2 gap-x-4 text-left space-y-0.5">
                  <span className="text-gray-500">DO#:</span>
                  <span className="text-gray-800 font-medium">{order.doNo}</span>
                  <span className="text-gray-500">Ship date:</span>
                  <span className="text-gray-800">{order.shipDate}</span>
                  <span className="text-gray-500">Status:</span>
                  <StatusBadge status={order.status} />
                  <span className="text-gray-500">INV#:</span>
                  <span className="text-gray-800">{order.invNo}</span>
                  <span className="text-gray-500">INV# date:</span>
                  <span className="text-gray-800">{order.invDate}</span>
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
                  <th className="px-3 py-2 text-center font-semibold text-gray-600 w-16">
                    Check
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="px-3 py-2 text-gray-500">{idx + 1}</td>
                    <td className="px-3 py-2 text-gray-700">{item.description}</td>
                    <td className="px-3 py-2 text-right text-gray-700">
                      {item.unit}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <Checkbox checked={item.checked} className="w-3.5 h-3.5" />
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 text-xs font-semibold">
                  <td colSpan={2} className="px-3 py-2 text-gray-600">
                    Total:
                  </td>
                  <td className="px-3 py-2 text-right text-gray-800">
                    {totalUnits}
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
            </TableScrollArea>

            {/* Signatures */}
            <div className="flex flex-col gap-6 mt-8 border-t border-gray-200 pt-4 sm:flex-row sm:justify-between">
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
    </div>
  );
}
