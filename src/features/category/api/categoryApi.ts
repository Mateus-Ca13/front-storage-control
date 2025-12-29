import type { AxiosError } from "axios"
import api from "../../../config/api"
import type { iResponse } from "../../../shared/types/response"
import type { iCategory, iCategoryColumnConfig } from "../../../shared/types/category"
import type { CategorySchema } from "../../../schemas/categorySchema"

type iGetCategoriesReponse = iResponse<{pagination: Record<string, number>, categories: (iCategoryColumnConfig)[]}>

export const getCategoriesApi = async (params: Record<string, any>): Promise<iGetCategoriesReponse> => {
    try {
        const response  = await api.get("categories/", {params}).then(res => res.data) 
        console.log(response)
        return response as iGetCategoriesReponse

    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {Categories: [], pagination: {total: 0}}} as iGetCategoriesReponse
    }
}

export const getCategoryById = async (id: number): Promise<iResponse<iCategory>> => {
    try {
        const response  = await api.get(`categories/${id}`).then(res => res.data)
        return response as iResponse<iCategory>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iCategory>
    }
}

export const updateCategoryApi = async (id: number, data: CategorySchema): Promise<iResponse<iCategory>> => {
    try {
        const response  = await api.put(`categories/${id}`, data).then(res => res.data)
        return response as iResponse<iCategory>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iCategory>
    }
}

export const createCategoryApi = async (data: CategorySchema): Promise<iResponse<iCategory>> => {
    try {
        const response  = await api.post(`categories/`, data).then(res => res.data)
        return response as iResponse<iCategory>
        
    } catch (error: AxiosError | any) { 
        return {...error.response.data, data: {}} as iResponse<iCategory>
    }
}

export const deleteCategoryApi = async (id: number): Promise<iResponse<{deletedCategory: iCategory, updatedProductsCount: number}>> => {   
    try {
        const response  = await api.delete(`categories/${id}`).then(res => res.data)
        return response as iResponse<{deletedCategory: iCategory, updatedProductsCount: number}>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<{deletedCategory: iCategory, updatedProductsCount: number}>
    }
}
