import { Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

// Sale pages
import InvoiceList from "@/pages/sale/InvoiceList";
import InvoiceView from "@/pages/sale/InvoiceView";
import InvoiceForm from "@/pages/sale/InvoiceForm";
import ReceiptList from "@/pages/sale/ReceiptList";
import ReceiptView from "@/pages/sale/ReceiptView";
import DeliveryOrderList from "@/pages/sale/DeliveryOrderList";
import DeliveryOrderView from "@/pages/sale/DeliveryOrderView";
import DeliveryOrderForm from "@/pages/sale/DeliveryOrderForm";

// Purchase pages
import ExpenseForm from "@/pages/purchase/ExpenseForm";

// Product pages
import InventoryList from "@/pages/product/InventoryList";
import InventoryDetail from "@/pages/product/InventoryDetail";

// Landing & fallback
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<AppLayout />}>
        {/* Sale */}
        <Route path="/sale/invoice" element={<InvoiceList />} />
        <Route path="/sale/invoice/new" element={<InvoiceForm />} />
        <Route path="/sale/invoice/:id" element={<InvoiceView />} />
        <Route path="/sale/invoice/:id/edit" element={<InvoiceForm />} />

        <Route path="/sale/receipt" element={<ReceiptList />} />
        <Route path="/sale/receipt/:id" element={<ReceiptView />} />

        <Route path="/sale/delivery-order" element={<DeliveryOrderList />} />
        <Route path="/sale/delivery-order/new" element={<DeliveryOrderForm />} />
        <Route path="/sale/delivery-order/:id" element={<DeliveryOrderView />} />
        <Route path="/sale/delivery-order/:id/edit" element={<DeliveryOrderForm />} />

        {/* Purchase */}
        <Route path="/purchase/expense/new" element={<ExpenseForm />} />

        {/* Product */}
        <Route path="/product/inventory" element={<InventoryList />} />
        <Route path="/product/inventory/:id" element={<InventoryDetail />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
