import { useQuery } from "@tanstack/react-query";
import { getMovementById } from "../api/movementsApi";

export function useMovementByIdQuery(id: number) {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getMovementById(id),
        staleTime: 0,                // sempre busca atualizado
        refetchOnWindowFocus: false, // evita fetch automático
    })
}