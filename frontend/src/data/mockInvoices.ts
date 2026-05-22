export type InvoiceStatus = "Paid" | "Unpaid" | "Partial" | "Cancelled";

export interface InvoiceItem {
  id: string;
  description: string;
  productCode?: string;
  unit: number;
  price: number;
  discount: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invNo: string;
  date: string;
  dueDate?: string;
  customerName: string;
  billingInfo: string;
  shippingInfo: string;
  shipBy: string;
  paymentTerm: string;
  ref?: string;
  by: string;
  items: InvoiceItem[];
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  payment: number;
  balance: number;
  status: InvoiceStatus;
  remarks?: string;
  termsAndConditions: string;
}

const defaultTnC = `1. New Set Handphone tertakluk kepada 1 TAHUN WARANTI: Used / 2ND Handphone tertakluk kepada 2 MINGGU WARANTI.
2. Pihak kedai tidak akan bertanggungjawab terhadap kerosakan oleh kecuaian pembeli selepas WARANTI seperti Water Damage (Masuk Air), Handphone Terjatuh, (SCREEN PECAH), Overcharge (Pengecasan Melampau), Handphone bengkok, Fizikal, LCD & Touch Screen, Apple ID & Lock issues, Warranty Seal Removed, Self Update version.
3. Tiada pemulangan duit setelah pembelian.`;

export const mockInvoices: Invoice[] = [
  {
    id: "inv131",
    invNo: "S2600131",
    date: "11/02/2026",
    customerName: "FREE GIFT",
    billingInfo: "FREE GIFT",
    shippingInfo: "",
    shipBy: "-",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i1", description: "HEADPHONE P47", productCode: "6989532512530", unit: 1, price: 0.00, discount: 0, amount: 0.00 }],
    subtotal: 0.00, delivery: 0, discount: 0, total: 0.00, payment: 0.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv130",
    invNo: "S2600130",
    date: "11/02/2026",
    customerName: "MR HAIRIE",
    billingInfo: "MR HAIRIE\n601133335856",
    shippingInfo: "",
    shipBy: "J&T",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i2", description: "INFINIX NOTE 50X 5G 8/256GB GREY XF +1 x MYR699.00", productCode: "86700001234567", unit: 1, price: 699.00, discount: 0, amount: 699.00 }],
    subtotal: 699.00, delivery: 0, discount: 0, total: 699.00, payment: 699.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv129",
    invNo: "S2600129",
    date: "11/02/2026",
    customerName: "MR ARIFFIN",
    billingInfo: "MR ARIFFIN",
    shippingInfo: "",
    shipBy: "J&T",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i3", description: "SAMSUNG GALAXY A35 5G 8/256GB BLK", productCode: "86900001112233", unit: 1, price: 949.00, discount: 0, amount: 949.00 }],
    subtotal: 949.00, delivery: 0, discount: 0, total: 949.00, payment: 949.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv128",
    invNo: "S2600128",
    date: "10/02/2026",
    customerName: "CASH REPAIR",
    billingInfo: "CASH REPAIR",
    shippingInfo: "",
    shipBy: "",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i4", description: "Screen Replacement - HONOR 200", productCode: "", unit: 1, price: 140.00, discount: 0, amount: 140.00 }],
    subtotal: 140.00, delivery: 0, discount: 0, total: 140.00, payment: 140.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv127",
    invNo: "S2600127",
    date: "10/02/2026",
    customerName: "CASH REPAIR",
    billingInfo: "CASH REPAIR",
    shippingInfo: "",
    shipBy: "",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i5", description: "Battery Replacement", productCode: "", unit: 1, price: 180.00, discount: 0, amount: 180.00 }],
    subtotal: 180.00, delivery: 0, discount: 0, total: 180.00, payment: 180.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv126",
    invNo: "S2600126",
    date: "10/02/2026",
    customerName: "MRS FARYNA",
    billingInfo: "MRS FARYNA",
    shippingInfo: "",
    shipBy: "Pos Laju",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i6", description: "SAMSUNG GALAXY S24 FE 8/256GB GREY", productCode: "86900004455667", unit: 1, price: 2799.00, discount: 0, amount: 2799.00 }],
    subtotal: 2799.00, delivery: 0, discount: 0, total: 2799.00, payment: 2799.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv125",
    invNo: "S2600125",
    date: "10/02/2026",
    customerName: "MR ACAD",
    billingInfo: "MR ACAD",
    shippingInfo: "",
    shipBy: "",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i7", description: "HONOR 90 LITE 5G 8/256GB BLK GTB", productCode: "8668920070892057", unit: 1, price: 799.00, discount: 0, amount: 799.00 }],
    subtotal: 799.00, delivery: 0, discount: 0, total: 799.00, payment: 799.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv124",
    invNo: "S2600124",
    date: "09/02/2026",
    customerName: "CASH REPAIR",
    billingInfo: "CASH REPAIR",
    shippingInfo: "",
    shipBy: "",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i8", description: "Screen Replacement - VIVO Y18S", productCode: "", unit: 1, price: 150.00, discount: 0, amount: 150.00 }],
    subtotal: 150.00, delivery: 0, discount: 0, total: 150.00, payment: 150.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv123",
    invNo: "S2600123",
    date: "09/02/2026",
    customerName: "CASH REPAIR",
    billingInfo: "CASH REPAIR",
    shippingInfo: "",
    shipBy: "",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i9", description: "Charging Port Repair", productCode: "", unit: 1, price: 160.00, discount: 0, amount: 160.00 }],
    subtotal: 160.00, delivery: 0, discount: 0, total: 160.00, payment: 160.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv122",
    invNo: "S2600122",
    date: "09/02/2026",
    customerName: "MR AMIZUL",
    billingInfo: "MR AMIZUL",
    shippingInfo: "",
    shipBy: "J&T",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i10", description: "OPPO A60 8/256GB BLUE", productCode: "86200002233445", unit: 1, price: 649.00, discount: 0, amount: 649.00 }, { id: "i10b", description: "Phone Case OPPO A60", productCode: "", unit: 1, price: 200.00, discount: 0, amount: 200.00 }],
    subtotal: 849.00, delivery: 0, discount: 0, total: 849.00, payment: 849.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv121",
    invNo: "S2600121",
    date: "09/02/2026",
    customerName: "EN RASHID",
    billingInfo: "EN RASHID",
    shippingInfo: "",
    shipBy: "",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i11", description: "HEADPHONE P47", productCode: "6989532512530", unit: 1, price: 199.00, discount: 0, amount: 199.00 }],
    subtotal: 199.00, delivery: 0, discount: 0, total: 199.00, payment: 199.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv120",
    invNo: "S2600120",
    date: "09/02/2026",
    customerName: "MR AINA AQLA",
    billingInfo: "MR AINA AQLA",
    shippingInfo: "",
    shipBy: "Pos Laju",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i12", description: "VIVO Y18S 4/128GB BLK", productCode: "86100007788990", unit: 1, price: 499.00, discount: 0, amount: 499.00 }],
    subtotal: 499.00, delivery: 0, discount: 0, total: 499.00, payment: 0.00, balance: 499.00,
    status: "Unpaid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv119",
    invNo: "S2600119",
    date: "09/02/2026",
    customerName: "MR NUR AKMAL",
    billingInfo: "MR NUR AKMAL",
    shippingInfo: "",
    shipBy: "",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i13", description: "REALME C67 6/128GB GREEN", productCode: "86300005566778", unit: 1, price: 299.00, discount: 0, amount: 299.00 }],
    subtotal: 299.00, delivery: 0, discount: 0, total: 299.00, payment: 299.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv118",
    invNo: "S2600118",
    date: "09/02/2026",
    customerName: "MR MYO MIN OO",
    billingInfo: "MR MYO MIN OO",
    shippingInfo: "",
    shipBy: "J&T",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i14", description: "HONOR 200 LITE 8/512GB BLUE", productCode: "861700072946174", unit: 1, price: 1399.00, discount: 0, amount: 1399.00 }],
    subtotal: 1399.00, delivery: 0, discount: 0, total: 1399.00, payment: 1399.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv117",
    invNo: "S2600117",
    date: "09/02/2026",
    customerName: "MRS AIN LAILI",
    billingInfo: "MRS AIN LAILI",
    shippingInfo: "",
    shipBy: "",
    paymentTerm: "",
    by: "ogtb",
    items: [{ id: "i15", description: "HONOR PLAY 10 4/128GB BLK GTB", productCode: "860681087880968", unit: 1, price: 849.00, discount: 0, amount: 849.00 }],
    subtotal: 849.00, delivery: 0, discount: 0, total: 849.00, payment: 849.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
  {
    id: "inv116",
    invNo: "S2600116",
    date: "08/02/2026",
    customerName: "MR AIMAN ARIFF",
    billingInfo: "MR AIMAN ARIFF",
    shippingInfo: "",
    shipBy: "J&T",
    paymentTerm: "",
    by: "ogtb",
    items: [
      { id: "i16a", description: "IPHONE 12 PRO 512GB BLK U", productCode: "86800009876543", unit: 1, price: 2499.00, discount: 0, amount: 2499.00 },
      { id: "i16b", description: "iPhone Case", productCode: "", unit: 1, price: 371.00, discount: 0, amount: 371.00 },
    ],
    subtotal: 2870.00, delivery: 0, discount: 0, total: 2870.00, payment: 2870.00, balance: 0.00,
    status: "Paid",
    termsAndConditions: defaultTnC,
  },
];
