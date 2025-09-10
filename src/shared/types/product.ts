export interface iProduct {
    id: number
    name: string
    measurement: ProductMeasurementType
    description: string
    codebar: string | null
    categoryId: number | null
    createdAt: Date;
    minStock: number
    isBelowMinStock: boolean
}

export interface iProductColumnConfig {
    id: number
    name: string
    measurement: ProductMeasurementType
    codebar: string | null
    category: { name: string, colorPreset: number } | null
    minStock: number
    isBelowMinStock: boolean
    stockedQuantities: number

} 

export const ProductMeasurementTuple = ["UN" , "KG" , "L" , "M"] as const; 
export type ProductMeasurementType = (typeof ProductMeasurementTuple)[number];