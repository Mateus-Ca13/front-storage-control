import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from '../api/productsApi';
import type { ProductsSearchFiltersProps } from '../pages/ProductsPage';

export function useProductsQuery(page: number, rowsPerPage: number, search: string, filters: ProductsSearchFiltersProps) {
  const params: Record<string, any> = { offset: (page * rowsPerPage), limit: rowsPerPage };

  if (search) params.name = search;
  if (filters.categoriesIds.length) params.categoriesIds = JSON.stringify(filters.categoriesIds);
  if (filters.stockId) params.stockId = filters.stockId;
  if (filters.isBelowMinStock) params.isBelowMinStock = filters.isBelowMinStock;
  if (filters.orderBy) params.orderBy = filters.orderBy;
  if (filters.sortBy) params.sortBy = filters.sortBy;
  if (filters.hasNoCodebar) params.hasNoCodebar = filters.hasNoCodebar;


  return useQuery({
    queryKey: ["products", JSON.stringify(params)],
    queryFn: () => getProductsApi(params),
    staleTime: 0,                // sempre busca atualizado
    refetchOnWindowFocus: false, // evita fetch automático
    refetchOnReconnect: false,
  });
}