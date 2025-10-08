import { useQuery } from "@tanstack/react-query";
import { getUsersApi } from "../api/usersApi";
import type { UsersSearchFiltersProps } from "../pages/UserPage";

export function useUsersQuery(page: number, rowsPerPage: number, search: string, filters: UsersSearchFiltersProps) {
    const params: Record<string, any> = { offset: (page * rowsPerPage), limit: rowsPerPage };

    if(filters.orderBy) params.orderBy = filters.orderBy;
    if(filters.sortBy) params.sortBy = filters.sortBy;
    if(search) params.name = search;

return useQuery({
    queryKey: ["users", JSON.stringify(params)],
    queryFn: () => getUsersApi(params),
    staleTime: 0,                // sempre busca atualizado
    refetchOnWindowFocus: false, // evita fetch automático
    refetchOnReconnect: false,
})
}