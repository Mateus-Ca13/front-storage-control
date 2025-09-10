
export type MovementSummaryProps = {
    id: string
    type: 'TRANSFER' | 'ENTRY' | 'EXIT'
    observations: string | null
    originStockName : string  | null
    destinationStockName: string | null
    createdAt: Date
    totalProducts: number
}