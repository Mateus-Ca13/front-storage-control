import { useQuery } from "@tanstack/react-query";
import type { CategoriesSearchFiltersProps } from "../pages/CategoriesPage";
import { getCategoriesApi } from "../api/categoryApi";

export function useCategoryQuery(page: number, rowsPerPage: number, search: string, filters: CategoriesSearchFiltersProps) {
    const params: Record<string, any> = { offset: (page * rowsPerPage), limit: rowsPerPage };
    if(filters.orderBy) params.orderBy = filters.orderBy;
    if(filters.sortBy) params.sortBy = filters.sortBy;
    if(search) params.name = search;


return useQuery({
    queryKey: ["categories", JSON.stringify(params)],
    queryFn: () => getCategoriesApi(params),
})
}