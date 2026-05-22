export type DOStatus = "Delivered" | "To Deliver" | "Cancelled";

export interface DeliveryOrder {
  id: string;
  doNo: string;
  date: string;
  shipDate: string;
  customerName: string;
  billingInfo: string;
  shippingInfo: string;
  invNo: string;
  invDate: string;
  shipBy: string;
  tracking?: string;
  ref?: string;
  status: DOStatus;
  by: string;
  items: {
    id: string;
    description: string;
    balance: number;
    unit: number;
    checked: boolean;
  }[];
  remarks?: string;
  termsAndConditions?: string;
}

export const mockDeliveryOrders: DeliveryOrder[] = [
  {
    id: "do131",
    doNo: "DO2600131",
    date: "11/02/2026",
    shipDate: "11/02/2026",
    customerName: "FREE GIFT",
    billingInfo: "FREE GIFT",
    shippingInfo: "",
    invNo: "S2600131",
    invDate: "11/02/2026",
    shipBy: "-",
    status: "Delivered",
    by: "ogtb",
    items: [{ id: "di1", description: "HEADPHONE P47", balance: 1, unit: 1, checked: true }],
  },
  {
    id: "do130",
    doNo: "DO2600130",
    date: "11/02/2026",
    shipDate: "11/02/2026",
    customerName: "MR HAIRIE",
    billingInfo: "MR HAIRIE\n601133335856",
    shippingInfo: "",
    invNo: "S2600130",
    invDate: "11/02/2026",
    shipBy: "J&T",
    tracking: "JT12345678MY",
    status: "Delivered",
    by: "ogtb",
    items: [{ id: "di2", description: "INFINIX NOTE 50X 5G 8/256GB GREY XF", balance: 1, unit: 1, checked: true }],
  },
  {
    id: "do129",
    doNo: "DO2600129",
    date: "11/02/2026",
    shipDate: "11/02/2026",
    customerName: "MR ARIFFIN",
    billingInfo: "MR ARIFFIN",
    shippingInfo: "",
    invNo: "S2600129",
    invDate: "11/02/2026",
    shipBy: "J&T",
    tracking: "JT98765432MY",
    status: "Delivered",
    by: "ogtb",
    items: [{ id: "di3", description: "SAMSUNG GALAXY A35 5G 8/256GB BLK", balance: 1, unit: 1, checked: true }],
  },
  {
    id: "do128",
    doNo: "DO2600128",
    date: "10/02/2026",
    shipDate: "10/02/2026",
    customerName: "CASH REPAIR",
    billingInfo: "CASH REPAIR",
    shippingInfo: "",
    invNo: "S2600128",
    invDate: "10/02/2026",
    shipBy: "",
    status: "To Deliver",
    by: "ogtb",
    items: [{ id: "di4", description: "Screen Replacement - HONOR 200", balance: 1, unit: 1, checked: false }],
  },
  {
    id: "do127",
    doNo: "DO2600127",
    date: "10/02/2026",
    shipDate: "10/02/2026",
    customerName: "CASH REPAIR",
    billingInfo: "CASH REPAIR",
    shippingInfo: "",
    invNo: "S2600127",
    invDate: "10/02/2026",
    shipBy: "",
    status: "Delivered",
    by: "ogtb",
    items: [{ id: "di5", description: "Battery Replacement", balance: 1, unit: 1, checked: true }],
  },
  {
    id: "do126",
    doNo: "DO2600126",
    date: "10/02/2026",
    shipDate: "10/02/2026",
    customerName: "MRS FARYNA",
    billingInfo: "MRS FARYNA",
    shippingInfo: "",
    invNo: "S2600126",
    invDate: "10/02/2026",
    shipBy: "Pos Laju",
    tracking: "EH123456789MY",
    status: "Delivered",
    by: "ogtb",
    items: [{ id: "di6", description: "SAMSUNG GALAXY S24 FE 8/256GB GREY", balance: 1, unit: 1, checked: true }],
  },
  {
    id: "do125",
    doNo: "DO2600125",
    date: "10/02/2026",
    shipDate: "10/02/2026",
    customerName: "MR ACAD",
    billingInfo: "MR ACAD",
    shippingInfo: "",
    invNo: "S2600125",
    invDate: "10/02/2026",
    shipBy: "",
    status: "Delivered",
    by: "ogtb",
    items: [{ id: "di7", description: "HONOR 90 LITE 5G 8/256GB BLK GTB", balance: 1, unit: 1, checked: true }],
  },
  {
    id: "do124",
    doNo: "DO2600124",
    date: "09/02/2026",
    shipDate: "09/02/2026",
    customerName: "CASH REPAIR",
    billingInfo: "CASH REPAIR",
    shippingInfo: "",
    invNo: "S2600124",
    invDate: "09/02/2026",
    shipBy: "",
    status: "Delivered",
    by: "ogtb",
    items: [{ id: "di8", description: "Screen Replacement - VIVO Y18S", balance: 1, unit: 1, checked: true }],
  },
  {
    id: "do123",
    doNo: "DO2600123",
    date: "09/02/2026",
    shipDate: "09/02/2026",
    customerName: "CASH REPAIR",
    billingInfo: "CASH REPAIR",
    shippingInfo: "",
    invNo: "S2600123",
    invDate: "09/02/2026",
    shipBy: "",
    status: "Delivered",
    by: "ogtb",
    items: [{ id: "di9", description: "Charging Port Repair", balance: 1, unit: 1, checked: true }],
  },
  {
    id: "do122",
    doNo: "DO2600122",
    date: "09/02/2026",
    shipDate: "09/02/2026",
    customerName: "MR AMIZUL",
    billingInfo: "MR AMIZUL",
    shippingInfo: "",
    invNo: "S2600122",
    invDate: "09/02/2026",
    shipBy: "J&T",
    status: "Delivered",
    by: "ogtb",
    items: [
      { id: "di10a", description: "OPPO A60 8/256GB BLUE", balance: 1, unit: 1, checked: true },
      { id: "di10b", description: "Phone Case OPPO A60", balance: 1, unit: 1, checked: true },
    ],
  },
];
