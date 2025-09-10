import type { AxiosError } from "axios"
import type { iResponse } from "../../../shared/types/response"
import api from "../../../config/api"

export type MainSummaryApiResponse = iResponse<{productsBelowMinStock: number, totalMovementsLastWeek: number, totalProductsRegistered: number, totalStockedQuantity: number}>
export const MainSummaryApi = async () => {
    try {
        const response: MainSummaryApiResponse = 
        await api.get("dashboard/main").then(res => res.data) 
        return response

    } catch (error: AxiosError | any) {
        return error.response.data as iResponse<null>
    }
}
export const ProductsSummaryApi = async () => {
    try {
        const response: iResponse<null> = await api.get("dashboard/products").then(res => res.data) 
        return response

    } catch (error: AxiosError | any) {
        return error.response.data as iResponse<null>
    }
}
export const StocksSummaryApi = async () => {
    try {
        const response: iResponse<null> = await api.get("dashboard/stocks").then(res => res.data) 
        return response

    } catch (error: AxiosError | any) {
        return error.response.data as iResponse<null>
    }
}
