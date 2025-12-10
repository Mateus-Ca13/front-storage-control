import type { AxiosError } from "axios"
import api from "../../../config/api"
import type { iProduct, iProductColumnConfig } from "../../../shared/types/product"
import type { iResponse } from "../../../shared/types/response"
import type { ProductSchema } from "../../../schemas/productSchema"

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

export const getProductById = async (id: number): Promise<iResponse<iProduct>> => {
    try {
        const response  = await api.get(`products/${id}`).then(res => res.data)
        return response as iResponse<iProduct>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iProduct>
    }
}

export const getProductByCodebar = async (codebar: string, stockId: number): Promise<iResponse<iProduct>> => {
    try {
        const response  = await api.get(`products/codebar/${codebar}`, {params: {stockId: stockId}}).then(res => res.data)
        return response as iResponse<iProduct>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iProduct>
    }
}

export const updateProductApi = async (id: number, data: ProductSchema): Promise<iResponse<iProduct>> => {
    try {
        const response  = await api.put(`products/${id}`, data).then(res => res.data)
        return response as iResponse<iProduct>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iProduct>
    }
}

export const createProductApi = async (data: ProductSchema): Promise<iResponse<iProduct>> => {
    try {
        const response  = await api.post(`products/`, data).then(res => res.data)
        return response as iResponse<iProduct>
        
    } catch (error: AxiosError | any) { 
        return {...error.response.data, data: {}} as iResponse<iProduct>
    }
}

export const deleteProductApi = async (id: number): Promise<iResponse<iProduct>> => {   
    try {
        const response  = await api.delete(`products/${id}`).then(res => res.data)
        return response as iResponse<iProduct>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iProduct>
    }
}
    

    