import type { iCategory } from "../../../shared/types/category";

export type BelowStockSummaryProps = {
    productId: string;
    category: iCategory;
    productName: string;
    stockQuantity: number;
    minStockRecomended: number;
}