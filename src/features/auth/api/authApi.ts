import type { AxiosError } from "axios"
import api from "../../../config/api"
import type { iUser, UserRoleType } from "../types/user"
import type { iResponse } from "../../../shared/types/response"

const loginUserApi = async (email: string, password: string) => {
    try {
        const response: iResponse<{accessToken: string}> = await api.post("auth/login", { userData:{email, password} }).then(res => res.data)
        sessionStorage.setItem("access-token", response.data?.accessToken as string) 
        return response

    } catch (error: AxiosError | any) {
        return error.response.data as iResponse<null>
    }
}

const registerUserApi = async (name: string, username: string, role: UserRoleType, email: string, password: string, confirmPassword: string) => {
    try {
        const response: iResponse<{userData: iUser}> = await api.post("auth/register", { name, username, email, password, confirmPassword, role }).then(res => res.data)
        return response.data
        
    } catch (error: AxiosError | any) {
        return error.response.data as iResponse<null>
    }
}

const logoutUserApi = async () => {
    try {
        const response: iResponse<null> = await api.post("auth/logout").then(res => res.data)    
        return response.data

    } catch (error: AxiosError | any) {
        return error.response.data as iResponse<null>
    }
}

const refreshTokenApi = async () => {
    try {
        const response = await api.post("auth/refresh-token").then(res => res.data)
        return response.data
        
    } catch (error: AxiosError | any) {
        return error.response.data as iResponse<null>
    }
}


export { loginUserApi, registerUserApi, logoutUserApi, refreshTokenApi }