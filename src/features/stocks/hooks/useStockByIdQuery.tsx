import { useQuery } from "@tanstack/react-query";
import { getStockById } from "../api/stocksApi";

export function useStockByIdQuery(id: number) {

    return useQuery({
        queryKey: ["stock", id],
        queryFn: () => getStockById(id),
        staleTime: 0,                // sempre busca atualizado
        refetchOnWindowFocus: false, // evita fetch automático
    })
}