export interface InventoryItem {
  id: string;
  code: string;
  description: string;
  in: number;
  influenced: number;
  out: number;
  loss: number;
  damage: number;
  balance: number;
  toDeliver: number;
  category: string;
}

export interface StockMovement {
  id: string;
  date: string;
  movement: string;
  remark: string;
  quantity: number;
  balance: number;
  by: string;
}

export const mockInventory: InventoryItem[] = [
  { id: "p1", code: "5626555426923", description: "CD PS4 GTA", in: 1, influenced: 0, out: 1, loss: 0, damage: 0, balance: 0, toDeliver: 0, category: "Games" },
  { id: "p2", code: "5026555427227", description: "CD PS4 WWE2K20", in: 1, influenced: 0, out: 1, loss: 0, damage: 0, balance: 0, toDeliver: 0, category: "Games" },
  { id: "p3", code: "336899", description: "FAN MINI HANDHELD PORTABLE NTS SH", in: 9, influenced: 0, out: 0, loss: 0, damage: 0, balance: 9, toDeliver: 0, category: "Accessories" },
  { id: "p4", code: "35793933128781", description: "GOOGLE PIXEL 9 256GB WHT GGA", in: 1, influenced: 0, out: 1, loss: 0, damage: 0, balance: 0, toDeliver: 0, category: "Phones" },
  { id: "p5", code: "6989532512530", description: "HEADPHONE P47", in: 9, influenced: 0, out: 1, loss: 0, damage: 0, balance: 8, toDeliver: 0, category: "Accessories" },
  { id: "p6", code: "861700072946174", description: "HONOR 200 LITE 8/512GB BLUE", in: 1, influenced: 0, out: 0, loss: 0, damage: 0, balance: 1, toDeliver: 0, category: "Phones" },
  { id: "p7", code: "86420207395137", description: "HONOR 200 PRO 512GB WHT GTB", in: 1, influenced: 0, out: 1, loss: 0, damage: 0, balance: 0, toDeliver: 0, category: "Phones" },
  { id: "p8", code: "864647070349165", description: "HONOR 200 SMART 5G 8/256GB WHITE", in: 1, influenced: 0, out: 1, loss: 0, damage: 0, balance: 0, toDeliver: 0, category: "Phones" },
  { id: "p9", code: "8668920070892057", description: "HONOR 90 LITE 5G 8/256GB BLK GTB", in: 1, influenced: 0, out: 0, loss: 0, damage: 0, balance: 1, toDeliver: 0, category: "Phones" },
  { id: "p10", code: "860681087880968", description: "HONOR PLAY 10 4/128GB BLK GTB", in: 1, influenced: 1, out: 0, loss: 0, damage: 0, balance: 1, toDeliver: 0, category: "Phones" },
  { id: "p11", code: "860681086126972", description: "HONOR PLAY 10 4/128GB BLUE Z", in: 1, influenced: 0, out: 1, loss: 0, damage: 0, balance: 0, toDeliver: 0, category: "Phones" },
  { id: "p12", code: "86724207739494", description: "HONOR X5B PLUS 4/128GB BLK Z", in: 1, influenced: 0, out: 0, loss: 0, damage: 0, balance: 1, toDeliver: 0, category: "Phones" },
  { id: "p13", code: "86724207327349", description: "HONOR X5B PLUS 4/128GB BLUE Z", in: 1, influenced: 0, out: 0, loss: 0, damage: 0, balance: 1, toDeliver: 0, category: "Phones" },
  { id: "p14", code: "86700001234567", description: "INFINIX NOTE 50X 5G 8/256GB GREY XF", in: 3, influenced: 0, out: 1, loss: 0, damage: 0, balance: 2, toDeliver: 0, category: "Phones" },
  { id: "p15", code: "86800009876543", description: "IPHONE 12 PRO 512GB BLK U", in: 1, influenced: 0, out: 0, loss: 0, damage: 0, balance: 1, toDeliver: 0, category: "Phones" },
  { id: "p16", code: "86900001112233", description: "SAMSUNG GALAXY A35 5G 8/256GB BLK", in: 4, influenced: 0, out: 1, loss: 0, damage: 0, balance: 3, toDeliver: 0, category: "Phones" },
  { id: "p17", code: "86900004455667", description: "SAMSUNG GALAXY S24 FE 8/256GB GREY", in: 3, influenced: 0, out: 1, loss: 0, damage: 0, balance: 2, toDeliver: 0, category: "Phones" },
  { id: "p18", code: "86100007788990", description: "VIVO Y18S 4/128GB BLK", in: 5, influenced: 0, out: 1, loss: 0, damage: 0, balance: 4, toDeliver: 0, category: "Phones" },
  { id: "p19", code: "86200002233445", description: "OPPO A60 8/256GB BLUE", in: 3, influenced: 0, out: 1, loss: 0, damage: 0, balance: 2, toDeliver: 0, category: "Phones" },
  { id: "p20", code: "86300005566778", description: "REALME C67 6/128GB GREEN", in: 6, influenced: 0, out: 1, loss: 0, damage: 0, balance: 5, toDeliver: 0, category: "Phones" },
];

export const mockStockMovements: Record<string, StockMovement[]> = {
  p15: [
    { id: "sm1", date: "11/02/2026", movement: "Adjustment-In", remark: "Opening Stock", quantity: 1, balance: 1, by: "adminb" },
  ],
  p5: [
    { id: "sm2", date: "05/01/2026", movement: "Adjustment-In", remark: "Opening Stock", quantity: 9, balance: 9, by: "adminb" },
    { id: "sm3", date: "11/02/2026", movement: "Sold", remark: "S2600131", quantity: -1, balance: 8, by: "ogtb" },
  ],
  p16: [
    { id: "sm4", date: "03/01/2026", movement: "Adjustment-In", remark: "Opening Stock", quantity: 4, balance: 4, by: "adminb" },
    { id: "sm5", date: "11/02/2026", movement: "Sold", remark: "S2600129", quantity: -1, balance: 3, by: "ogtb" },
  ],
  p3: [
    { id: "sm6", date: "03/01/2026", movement: "Adjustment-In", remark: "Opening Stock", quantity: 9, balance: 9, by: "adminb" },
  ],
};
