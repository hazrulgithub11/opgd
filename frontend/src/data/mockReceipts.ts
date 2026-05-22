export type ReceiptStatus = "Approved" | "Pending" | "Cancelled";

export interface Receipt {
  id: string;
  rcpNo: string;
  date: string;
  customerName: string;
  customerPhone?: string;
  bankCash: string;
  totalPayment: number;
  reference?: string;
  by: string;
  status: ReceiptStatus;
  invoices: {
    date: string;
    invNo: string;
    total: number;
    balance: number;
    amount: number;
  }[];
}

export const mockReceipts: Receipt[] = [
  {
    id: "r129",
    rcpNo: "R2600129",
    date: "11/02/2026",
    customerName: "MR HAIRIE",
    customerPhone: "601133335856",
    bankCash: "Bank",
    totalPayment: 699.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "11/02/26", invNo: "S2600130", total: 699.00, balance: 699.00, amount: 699.00 }],
  },
  {
    id: "r128",
    rcpNo: "R2600128",
    date: "11/02/2026",
    customerName: "MR ARIFFIN",
    bankCash: "Bank",
    totalPayment: 949.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "11/02/26", invNo: "S2600129", total: 949.00, balance: 949.00, amount: 949.00 }],
  },
  {
    id: "r127",
    rcpNo: "R2600127",
    date: "10/02/2026",
    customerName: "CASH REPAIR",
    bankCash: "Cash",
    totalPayment: 140.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "10/02/26", invNo: "S2600128", total: 140.00, balance: 140.00, amount: 140.00 }],
  },
  {
    id: "r126",
    rcpNo: "R2600126",
    date: "10/02/2026",
    customerName: "CASH REPAIR",
    bankCash: "Cash",
    totalPayment: 180.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "10/02/26", invNo: "S2600127", total: 180.00, balance: 180.00, amount: 180.00 }],
  },
  {
    id: "r125",
    rcpNo: "R2600125",
    date: "10/02/2026",
    customerName: "MRS FARYNA",
    bankCash: "Bank",
    totalPayment: 2799.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "10/02/26", invNo: "S2600126", total: 2799.00, balance: 2799.00, amount: 2799.00 }],
  },
  {
    id: "r124",
    rcpNo: "R2600124",
    date: "10/02/2026",
    customerName: "MR ACAD",
    bankCash: "Cash",
    totalPayment: 799.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "10/02/26", invNo: "S2600125", total: 799.00, balance: 799.00, amount: 799.00 }],
  },
  {
    id: "r123",
    rcpNo: "R2600123",
    date: "09/02/2026",
    customerName: "CASH REPAIR",
    bankCash: "Cash",
    totalPayment: 150.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "09/02/26", invNo: "S2600124", total: 150.00, balance: 150.00, amount: 150.00 }],
  },
  {
    id: "r122",
    rcpNo: "R2600122",
    date: "09/02/2026",
    customerName: "CASH REPAIR",
    bankCash: "Cash",
    totalPayment: 160.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "09/02/26", invNo: "S2600123", total: 160.00, balance: 160.00, amount: 160.00 }],
  },
  {
    id: "r121",
    rcpNo: "R2600121",
    date: "09/02/2026",
    customerName: "MR AMIZUL",
    bankCash: "Bank",
    totalPayment: 849.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "09/02/26", invNo: "S2600122", total: 849.00, balance: 849.00, amount: 849.00 }],
  },
  {
    id: "r120",
    rcpNo: "R2600120",
    date: "09/02/2026",
    customerName: "EN RASHID",
    bankCash: "Cash",
    totalPayment: 199.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "09/02/26", invNo: "S2600121", total: 199.00, balance: 199.00, amount: 199.00 }],
  },
  {
    id: "r119",
    rcpNo: "R2600119",
    date: "09/02/2026",
    customerName: "MR NUR AKMAL",
    bankCash: "Cash",
    totalPayment: 299.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "09/02/26", invNo: "S2600119", total: 299.00, balance: 299.00, amount: 299.00 }],
  },
  {
    id: "r118",
    rcpNo: "R2600118",
    date: "09/02/2026",
    customerName: "MR MYO MIN OO",
    bankCash: "Bank",
    totalPayment: 1399.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "09/02/26", invNo: "S2600118", total: 1399.00, balance: 1399.00, amount: 1399.00 }],
  },
  {
    id: "r117",
    rcpNo: "R2600117",
    date: "09/02/2026",
    customerName: "MRS AIN LAILI",
    bankCash: "Cash",
    totalPayment: 849.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "09/02/26", invNo: "S2600117", total: 849.00, balance: 849.00, amount: 849.00 }],
  },
  {
    id: "r116",
    rcpNo: "R2600116",
    date: "08/02/2026",
    customerName: "MR AIMAN ARIFF",
    bankCash: "Bank",
    totalPayment: 2870.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "08/02/26", invNo: "S2600116", total: 2870.00, balance: 2870.00, amount: 2870.00 }],
  },
  {
    id: "r115",
    rcpNo: "R2600115",
    date: "08/02/2026",
    customerName: "MR AIMAN ARIFF",
    bankCash: "Bank",
    totalPayment: 4099.00,
    by: "ogtb",
    status: "Approved",
    invoices: [{ date: "08/02/26", invNo: "S2600115", total: 4099.00, balance: 4099.00, amount: 4099.00 }],
  },
];
