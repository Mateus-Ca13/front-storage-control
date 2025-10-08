import type { iCategory } from "./category"
import type { iProduct, ProductMeasurementType } from "./product"

export interface iMovement {
    id: number
    type: MovementType
    originStockId: number | null
    destinationStockId: number | null
    observations: string
    createdAt: Date
    products: iProduct[]

}

export interface iMovementFull {
    id: number
    type: MovementType
    observations: string
    originStockId: number | null
    destinationStockId: number | null
    createdAt: Date
    originStock: { id: number, name: string} | null
    destinationStock: { id: number, name: string} | null
    userCreator: {name: string}
    products: { 
        id: number
    pricePerUnit: number
    product : {
        codebar: string
        id: number
        category: iCategory
        measurement: ProductMeasurementType
        name: string
    }
    quantity: number
    }[]
}

export const MovementTuple = ["ENTRY", "EXIT", "TRANSFER"] as const;
export type MovementType = (typeof MovementTuple)[number];


export interface iMovementProduct{
    productId: number
    movementBatchId: number
    quantity: number
    pricePerUnit: number | null
    movDetails: iMovement
}

export interface iMinimizedProductMovementsColumnConfig {
    id: number
    quantity: number | string
    movementBatch: {
        id: number
        type: MovementType
        createdAt: Date
        originStock: {
            id: number
            name: string
        },
        destinationStock: {
            id: number
            name: string
        }
    }
}


export interface iMovementColumnConfig {
    id: number
    type: MovementType
    createdAt: Date
    user: string
    stocks: number
    originStock: {name: string, id: number}
    destinationStock: {name: string, id: number}
    totalProducts: number
    actions: null

}