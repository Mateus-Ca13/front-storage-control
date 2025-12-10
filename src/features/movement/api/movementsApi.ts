import type { AxiosError } from "axios"
import api from "../../../config/api"
import type { iResponse } from "../../../shared/types/response"
import type { iMovementColumnConfig, iMovementFull } from "../../../shared/types/movement"
import type { MovementSchema } from "../../../schemas/MovementSchema"

type iGetMovementsReponse = iResponse<{pagination: Record<string, number>, movements: (iMovementColumnConfig)[]}>

export const getMovementsApi = async (params: Record<string, any>): Promise<iGetMovementsReponse> => {
    try {
        const response  = await api.get("movements/", {params}).then(res => res.data) 
        console.log(response)
        return response as iGetMovementsReponse

    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {movements: [], pagination: {total: 0}}} as iGetMovementsReponse
    }
}

export const getMovementById = async (id: number): Promise<iResponse<iMovementFull>> => {
    try {
        const response  = await api.get(`movements/${id}`).then(res => res.data)
        return response as iResponse<iMovementFull>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iMovementFull>
    }
}

export const updateMovementApi = async (id: number, data: iMovementColumnConfig): Promise<iResponse<iMovementColumnConfig>> => {
    try {
        const response  = await api.put(`movements/${id}`, data).then(res => res.data)
        return response as iResponse<iMovementColumnConfig>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iMovementColumnConfig>
    }
}

export const createMovementApi = async (data: MovementSchema): Promise<iResponse<iMovementFull>> => {
    try {
        const response  = await api.post(`movements/`, data).then(res => res.data)
        return response as iResponse<iMovementFull>
        
    } catch (error: AxiosError | any) { 
        return {...error.response.data, data: {}} as iResponse<iMovementFull>
    }
}

