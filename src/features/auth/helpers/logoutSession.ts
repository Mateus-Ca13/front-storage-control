import { navigate } from "../../../shared/components/RouterNavigator/RouterNavigator"
import { useToastStore } from "../../../shared/store/toastStore"
import { logoutUserApi } from "../api/authApi"
import { useAuthStore } from "../stores/useAuthStore"

export async function logoutSession () {
    const clearUserInfo = useAuthStore.getState().logout
    const renderToast = useToastStore.getState().renderToast

    const response = await logoutUserApi()
    console.log(response)

    if(response.success) {
        if(navigate) navigate('/login', {replace: true})
        clearUserInfo()
    }else {
        renderToast({message: response.message || "Ops! Algo deu errado.", type: "error" })
    
    }

}