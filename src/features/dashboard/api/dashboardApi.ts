import type { AxiosError } from "axios"
import type { iResponse } from "../../../shared/types/response"
import api from "../../../config/api"

export type MainSummaryApiResponse = 
    iResponse<{
        productsBelowMinStock: {value: number, metrics: string}, 
        totalMovementsLastWeek: {value: number, metrics: string}, 
        totalProductsRegistered: {value: number, metrics: string}, 
        totalStockedQuantity: {value: number, metrics: string}
    }>


export const MainSummaryApi = async () => {
    try {
        const response = 
        await api.get("dashboard/main").then(res => res.data) 
        return response as MainSummaryApiResponse

    } catch (error: AxiosError | any) {
        return error.response.data as iResponse<null>
    }
}
export const ProductsSummaryApi = async () => {
    try {
        const response = await api.get("dashboard/products").then(res => res.data) 
        return response as iResponse<null>

    } catch (error: AxiosError | any) {
        return error.response.data as iResponse<null>
    }
}
export const StocksSummaryApi = async () => {
    try {
        const response = await api.get("dashboard/stocks").then(res => res.data) 
        return response as iResponse<null>

    } catch (error: AxiosError | any) {
        return error.response.data as iResponse<null>
    }
}
