import { instance } from "common/instance"
import { BaseResponse } from "common/types"
import { Inputs } from "../ui/Login/Login";

export const authApi = {
    login(payload: Inputs) {
        return instance.post<BaseResponse<{userId: number; token: string}>>('auth/login', payload)
    },
    logout() {
        return instance.delete<BaseResponse>('auth/login')
    },
    me(){
        return instance.get<BaseResponse<{id: number, email: string, password: string}>>('auth/me')
    }
}