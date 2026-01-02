import axios from 'axios';
import { navigate } from '../shared/components/RouterNavigator/RouterNavigator';
import { refreshTokenApi } from '../features/auth/api/authApi';
import { useAuthStore } from '../features/auth/stores/useAuthStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


let isRefreshing = false;
let failedQueue: { resolve: (value: any) => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: boolean, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Se não for 401 ou se já tentou atualizar
        if (error.response.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then(() => {
                // Tenta a requisição original novamente
                return api(originalRequest);
            }).catch(err => {
                return Promise.reject(err);
            });
        }
        
        originalRequest._retry = true;
        isRefreshing = true;

            const response = await refreshTokenApi()
            isRefreshing = false;

            if(response.success){
                processQueue(false, response.data?.accessToken); 
                return api(originalRequest);

            } else {
                const clearUserInfo = useAuthStore.getState().logout
                
                clearUserInfo()
                processQueue(true); // Rejeita todas as requisições na fila
                if (navigate) {
                navigate('/login', {replace: true} ); // Redireciona para a página de login
                
                return Promise.reject("refreshError");
            }
            
        }
    }
);

export default api;

