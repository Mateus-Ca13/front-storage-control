import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/productsApi";

export function useProductByIdQuery(id: number) {

    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        staleTime: 0,                // sempre busca atualizado
        refetchOnWindowFocus: false, // evita fetch automático
    })
}