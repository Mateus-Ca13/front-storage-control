import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../api/categoryApi";

export function useCategoryByIdQuery(id: number) {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getCategoryById(id),
        staleTime: 0,                // sempre busca atualizado
        refetchOnWindowFocus: false, // evita fetch automático
    })
}