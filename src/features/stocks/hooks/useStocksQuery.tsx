import { useQuery } from "@tanstack/react-query";
import type { StocksSearchFiltersProps } from "../pages/StocksPage";
import { getStocksApi } from "../api/stocksApi";

export function useStocksQuery(page: number, rowsPerPage: number, search: string, filters: StocksSearchFiltersProps) {
    const params: Record<string, any> = { offset: (page * rowsPerPage), limit: rowsPerPage };
    if(filters.orderBy) params.orderBy = filters.orderBy;
    if(filters.sortBy) params.sortBy = filters.sortBy;
    if(search) params.name = search;
    if(filters.type) params.type = filters.type;


return useQuery({
    queryKey: ["stocks", JSON.stringify(params)],
    queryFn: () => getStocksApi(params),
})
}