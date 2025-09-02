
export interface iResponse<T> {
    success: boolean
    data: T | null
    message: string
}


export interface ErrorResponse {
    success: boolean
    data: null
    message: string
}