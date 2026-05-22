export interface Product {
  id: string;
  code: string;
  description: string;
  sellingPrice: number;
  promoPrice?: number;
  costPerUnit: number;
  category: string;
  openingStock: number;
  barcode?: string;
  stock: number;
}

export const mockProducts: Product[] = [
  { id: "p1", code: "5626555426923", description: "CD PS4 GTA", sellingPrice: 30.00, costPerUnit: 20.00, category: "Games", openingStock: 0, stock: 0 },
  { id: "p2", code: "5026555427227", description: "CD PS4 WWE2K20", sellingPrice: 30.00, costPerUnit: 20.00, category: "Games", openingStock: 0, stock: 0 },
  { id: "p3", code: "336899", description: "FAN MINI HANDHELD PORTABLE NTS SH", sellingPrice: 19.00, costPerUnit: 12.00, category: "Accessories", openingStock: 9, stock: 9 },
  { id: "p4", code: "35793933128781", description: "GOOGLE PIXEL 9 256GB WHT GGA", sellingPrice: 1799.00, costPerUnit: 1500.00, category: "Phones", openingStock: 0, stock: 0 },
  { id: "p5", code: "6989532512530", description: "HEADPHONE P47", sellingPrice: 0.00, costPerUnit: 0.00, category: "Accessories", openingStock: 8, stock: 8 },
  { id: "p6", code: "861700072946174", description: "HONOR 200 LITE 8/512GB BLUE", sellingPrice: 799.00, costPerUnit: 650.00, category: "Phones", openingStock: 1, stock: 1 },
  { id: "p7", code: "86420207395137", description: "HONOR 200 PRO 512GB WHT GTB", sellingPrice: 1299.00, costPerUnit: 1100.00, category: "Phones", openingStock: 0, stock: 0 },
  { id: "p8", code: "864647070349165", description: "HONOR 200 SMART 5G 8/256GB WHITE", sellingPrice: 599.00, costPerUnit: 500.00, category: "Phones", openingStock: 0, stock: 0 },
  { id: "p9", code: "8668920070892057", description: "HONOR 90 LITE 5G 8/256GB BLK GTB", sellingPrice: 699.00, costPerUnit: 590.00, category: "Phones", openingStock: 0, stock: 1 },
  { id: "p10", code: "860681087880968", description: "HONOR PLAY 10 4/128GB BLK GTB", sellingPrice: 599.00, costPerUnit: 500.00, category: "Phones", openingStock: 1, stock: 1 },
  { id: "p11", code: "860681086126972", description: "HONOR PLAY 10 4/128GB BLUE Z", sellingPrice: 599.00, costPerUnit: 500.00, category: "Phones", openingStock: 0, stock: 0 },
  { id: "p12", code: "86724207739494", description: "HONOR X5B PLUS 4/128GB BLK Z", sellingPrice: 449.00, costPerUnit: 380.00, category: "Phones", openingStock: 0, stock: 1 },
  { id: "p13", code: "86724207327349", description: "HONOR X5B PLUS 4/128GB BLUE Z", sellingPrice: 449.00, costPerUnit: 380.00, category: "Phones", openingStock: 1, stock: 1 },
  { id: "p14", code: "86700001234567", description: "INFINIX NOTE 50X 5G 8/256GB GREY XF", sellingPrice: 699.00, costPerUnit: 580.00, category: "Phones", openingStock: 2, stock: 2 },
  { id: "p15", code: "86800009876543", description: "IPHONE 12 PRO 512GB BLK U", sellingPrice: 2999.00, costPerUnit: 2700.00, category: "Phones", openingStock: 1, stock: 1 },
  { id: "p16", code: "86900001112233", description: "SAMSUNG GALAXY A35 5G 8/256GB BLK", sellingPrice: 999.00, costPerUnit: 850.00, category: "Phones", openingStock: 3, stock: 3 },
  { id: "p17", code: "86900004455667", description: "SAMSUNG GALAXY S24 FE 8/256GB GREY", sellingPrice: 1799.00, costPerUnit: 1550.00, category: "Phones", openingStock: 2, stock: 2 },
  { id: "p18", code: "86100007788990", description: "VIVO Y18S 4/128GB BLK", sellingPrice: 499.00, costPerUnit: 420.00, category: "Phones", openingStock: 4, stock: 4 },
  { id: "p19", code: "86200002233445", description: "OPPO A60 8/256GB BLUE", sellingPrice: 649.00, costPerUnit: 540.00, category: "Phones", openingStock: 2, stock: 2 },
  { id: "p20", code: "86300005566778", description: "REALME C67 6/128GB GREEN", sellingPrice: 549.00, costPerUnit: 460.00, category: "Phones", openingStock: 5, stock: 5 },
];

export const productCategories = ["No Category", "Phones", "Accessories", "Games", "Tablets", "Audio"];
