import type { Category } from "../../../shared/types/category";

export type BelowStockSummaryProps = {
    productId: string;
    category: Category;
    productName: string;
    stockQuantity: number;
    minStockRecomended: number;
}