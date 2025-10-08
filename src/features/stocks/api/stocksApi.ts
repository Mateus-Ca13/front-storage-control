import type { AxiosError } from "axios"
import api from "../../../config/api"
import type { iResponse } from "../../../shared/types/response"
import type { iStock, iStockColumnConfig } from "../../../shared/types/stock"
import type { StockSchema } from "../../../schemas/stockSchema"

type iGetStocksReponse = iResponse<{pagination: Record<string, number>, stocks: (iStockColumnConfig)[]}>

export const getStocksApi = async (params: Record<string, any>): Promise<iGetStocksReponse> => {
    try {
        const response  = await api.get("stocks/", {params}).then(res => res.data) 
        console.log(response)
        return response as iGetStocksReponse

    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {stocks: [], pagination: {total: 0}}} as iGetStocksReponse
    }
}

export const getStockById = async (id: number): Promise<iResponse<iStock>> => {
    try {
        const response  = await api.get(`Stocks/${id}`).then(res => res.data)
        return response as iResponse<iStock>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iStock>
    }
}

export const updateStockApi = async (id: number, data: StockSchema): Promise<iResponse<iStock>> => {
    try {
        const response  = await api.put(`Stocks/${id}`, data).then(res => res.data)
        return response as iResponse<iStock>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iStock>
    }
}

export const createStockApi = async (data: StockSchema): Promise<iResponse<iStock>> => {
    try {
        const response  = await api.post(`Stocks/`, data).then(res => res.data)
        return response as iResponse<iStock>
        
    } catch (error: AxiosError | any) { 
        return {...error.response.data, data: {}} as iResponse<iStock>
    }
}

export const deleteStockApi = async (id: number): Promise<iResponse<iStock>> => {   
    try {
        const response  = await api.delete(`Stocks/${id}`).then(res => res.data)
        return response as iResponse<iStock>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iStock>
    }
}
    

    