export interface parts {
    SKU : string;
    PartId : number;
    PartName : string;
    CategoryId: number;
    SellPrice: number;
    quantity :number;
    specialPrice : number;
    SupplierId: string;
    Warehouse: string;
}
export interface partsResponse{
    partId: number;
    sku: string;
    partName: string;
    sellingPrice: number;
    supplierName: string;
    totalQuantity: number;
    WarehouseName:string;
    NewQuantity: number;
    NewPrice: number;
}

