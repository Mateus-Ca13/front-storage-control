import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from '../api/productsApi';
import type { SearchFiltersProps } from '../pages/ProductsPage';

export function useProductsQuery(page: number, rowsPerPage: number, search: string, filters: SearchFiltersProps) {
  const params: Record<string, any> = { offset: (page * 10), limit: rowsPerPage };
  if (search) params.name = search;
  if (filters.categoriesIds.length) params.categoriesIds = filters.categoriesIds;
  if (filters.isBelowMinStock) params.isBelowMinStock = filters.isBelowMinStock;
  if (filters.orderBy) params.orderBy = filters.orderBy;
  if (filters.sortBy) params.sortBy = filters.sortBy;

  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProductsApi(params),
    staleTime: 30_000, // 30s
  });
}