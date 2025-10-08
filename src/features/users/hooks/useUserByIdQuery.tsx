import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/usersApi";

export function useUserByIdQuery(id: number) {

    return useQuery({
        queryKey: ["stock", id],
        queryFn: () => getUserById(id),
        staleTime: 0,                // sempre busca atualizado
        refetchOnWindowFocus: false, // evita fetch automático
    })
}