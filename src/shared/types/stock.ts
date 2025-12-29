export interface iStock {
    id: number
    name: string
    type: StockType
    status: StockStatusType
    stockedQuantities?: number
    createdAt: Date;
    updatedAt: Date;
}

export interface iStockColumnConfig {
    id: number
    name: string
    type: StockType
    status: StockStatusType
    stockedQuantities: number
    actions: null
} 

export const StockTypeTuple = ["CENTRAL", "SECONDARY"] as const; 
export type StockType = (typeof StockTypeTuple)[number];


export const StockStatusTypeTuple = ["ACTIVE", "MAINTENANCE", "INACTIVE"] as const; 
export type StockStatusType = (typeof StockStatusTypeTuple)[number];

