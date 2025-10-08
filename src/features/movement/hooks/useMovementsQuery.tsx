import { useQuery } from "@tanstack/react-query";
import { getMovementsApi } from "../api/movementsApi";
import type { MovementsSearchFiltersProps } from "../pages/MovementsPage";

export function useMovementsQuery(page: number, rowsPerPage: number, search: string, filters: MovementsSearchFiltersProps) {
    const params: Record<string, any> = { offset: (page * rowsPerPage), limit: rowsPerPage };

    if(filters.orderBy) params.orderBy = filters.orderBy;
    if(filters.sortBy) params.sortBy = filters.sortBy;
    if(search) params.name = search;
    if(filters.userId) params.userId = filters.userId;
    if(filters.type) params.type = filters.type;
    if(filters.sentFrom) params.sentFrom = filters.sentFrom;
    if(filters.sentTo) params.sentTo = filters.sentTo;

return useQuery({
    queryKey: ["movements", JSON.stringify(params)],
    queryFn: () => getMovementsApi(params),
    staleTime: 0,                // sempre busca atualizado
    refetchOnWindowFocus: false, // evita fetch automático
    refetchOnReconnect: false,
})
}