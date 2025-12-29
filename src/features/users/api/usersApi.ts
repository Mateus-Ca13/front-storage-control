import type { AxiosError } from "axios"
import api from "../../../config/api"
import type { iResponse } from "../../../shared/types/response"
import type { iUser, iUserColumnConfig } from "../../../shared/types/user"
import type { CreateUserDTO, PasswordSchema, UserSchema } from "../../../schemas/userSchema"

type iGetUsersReponse = iResponse<{pagination: Record<string, number>, users: (iUserColumnConfig)[]}>

export const getUsersApi = async (params: Record<string, any>): Promise<iGetUsersReponse> => {
    try {
        const response  = await api.get("users/", {params}).then(res => res.data) 
        console.log(response)
        return response as iGetUsersReponse

    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {users: [], pagination: {total: 0}}} as iGetUsersReponse
    }
}

export const getUserById = async (id: number): Promise<iResponse<iUser>> => {
    try {
        const response  = await api.get(`users/${id}`).then(res => res.data)
        return response as iResponse<iUser>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iUser>
    }
}

export const updateUserApi = async (id: number, data: UserSchema): Promise<iResponse<iUser>> => {
    try {
        const response  = await api.put(`users/${id}`, data).then(res => res.data)
        return response as iResponse<iUser>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iUser>
    }
}

export const updateUserPasswordApi = async (id: number, passwordData: PasswordSchema) => {
    try {
        const response  = await api.put(`users/${id}/password`, passwordData).then(res => res.data)
        return response as iResponse<iUser>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iUser>
    }
}


export const createUserApi = async (data: CreateUserDTO): Promise<iResponse<iUser>> => {
    try {
        const response  = await api.post(`users/`, data).then(res => res.data)
        return response as iResponse<iUser>
        
    } catch (error: AxiosError | any) { 
        return {...error.response.data, data: {}} as iResponse<iUser>
    }
}

export const deleteUserApi = async (id: number): Promise<iResponse<iUser>> => {   
    try {
        const response  = await api.delete(`users/${id}`).then(res => res.data)
        return response as iResponse<iUser>
        
    } catch (error: AxiosError | any) {
        return {...error.response.data, data: {}} as iResponse<iUser>
    }
}
