import type { ProductSchema } from "../../schemas/productSchema"
import type { iMinimizedProductMovementsColumnConfig } from "./movement"
import type { StockType } from "./stock"

export interface iProduct {
    id: number
    name: string
    measurement: ProductMeasurementType
    description: string
    codebar: string | null
    lastPrice: number | null
    categoryId: number | null
    createdAt: Date;
    updatedAt: Date;
    minStock: number
    isBelowMinStock: boolean
    stockedQuantities?: { quantity: number, stock: {id: number, name: string, type: StockType} }[]
    movements?: iMinimizedProductMovementsColumnConfig[]

}
    
export interface iProductColumnConfig {
    id: number
    name: string
    measurement: ProductMeasurementType
    codebar: string | null
    lastPrice: number | null
    category: { name: string, colorPreset: number } | null
    minStock: number
    isBelowMinStock: boolean
    stockedQuantities: number
    actions: (...args: any[]) => any

} 

export interface iMinimizedProductColumnConfig { 
    quantity: string
    stock: { id: number, name: string, type: StockType }
}

export interface iProductAddedToMovementColumnConfig {
    id: number
    codebar: string | null
    name: string
    measurement: ProductMeasurementType
    pricePerUnit: number
    quantity: number
    totalPrice: number
    excludeAction: (...args: any[]) => any
}

export interface iProductsImportCsvReturn {
    data: ProductSchema
    errors: any[]
    success: boolean
}

export type ProductUpdateInput = Partial<Omit<iProduct, 'id' | 'createdAt' | 'isBelowMinStock' | 'stockedQuantities' | 'movements' >>;

export const ProductMeasurementTuple = ["UN" , "KG" , "L" , "M"] as const; 
export type ProductMeasurementType = (typeof ProductMeasurementTuple)[number];