import type { AxiosError } from "axios"
import api from "../../../config/api"
import type { iProductColumnConfig } from "../../../shared/types/product"
import type { iResponse } from "../../../shared/types/response"

type iGetProductsReponse = iResponse<{pagination: Record<string, number>, products: (iProductColumnConfig)[]}>

export const getProductsApi = async (params: Record<string, any>): Promise<iGetProductsReponse> => {
    try {
        const response  = await api.get("products/", {params}).then(res => res.data) 
        console.log(response)
        return response as iGetProductsReponse

    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {products: [], pagination: {total: 0}}} as iGetProductsReponse
    }
}