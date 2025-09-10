import type { GetReturnType } from "./utils"

export interface iResponse<T> {
    success: boolean
    data: T 
    message: string
}


export interface ErrorResponse {
    success: boolean
    data: null
    message: string
}


export type AsyncResponseDataProps<T> = Awaited<GetReturnType<T>>