export interface ApiResult<T> {
    success: boolean
    message?: string
    payload?: T
}