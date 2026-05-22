export type TransactionType = "Credit" | "Debit";

export interface Expense {
  id: string;
  date: string;
  transactionType: TransactionType;
  particular: string;
  bankCash: string;
  amount: number;
  ledger: string;
  payerPayee?: string;
  reference?: string;
  attachment?: string;
}

export const mockExpenses: Expense[] = [
  {
    id: "exp1",
    date: "13/02/2026",
    transactionType: "Credit",
    particular: "Monthly Rent - February 2026",
    bankCash: "Cash",
    amount: 1500.00,
    ledger: "Rent Expense",
    payerPayee: "Tuan Haji Ahmad",
    reference: "REF-001",
  },
  {
    id: "exp2",
    date: "12/02/2026",
    transactionType: "Credit",
    particular: "Electricity Bill - January 2026",
    bankCash: "Bank",
    amount: 342.50,
    ledger: "Utilities Expense",
    payerPayee: "TNB",
    reference: "TNB-FEB2026",
  },
  {
    id: "exp3",
    date: "10/02/2026",
    transactionType: "Credit",
    particular: "Stock Purchase - Honor Phones",
    bankCash: "Bank",
    amount: 5600.00,
    ledger: "Cost of Goods",
    payerPayee: "Honor Malaysia",
    reference: "PO-2026-001",
  },
  {
    id: "exp4",
    date: "08/02/2026",
    transactionType: "Debit",
    particular: "Refund - Defective Item",
    bankCash: "Cash",
    amount: 299.00,
    ledger: "Sales Returns",
    payerPayee: "MR ALI",
  },
  {
    id: "exp5",
    date: "05/02/2026",
    transactionType: "Credit",
    particular: "Internet & Phone Bill",
    bankCash: "Bank",
    amount: 188.00,
    ledger: "Utilities Expense",
    payerPayee: "Unifi",
    reference: "UNIFI-FEB26",
  },
];

export const ledgerOptions = [
  "Please select ledger",
  "Rent Expense",
  "Utilities Expense",
  "Cost of Goods",
  "Sales Returns",
  "Salaries Expense",
  "Marketing Expense",
  "Miscellaneous Expense",
];
