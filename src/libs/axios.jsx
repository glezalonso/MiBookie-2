import axios from 'axios'
import { useAuthStore } from '../store/auth'

const authApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

authApi.interceptors.request.use((config) => {
    const token = useAuthStore.getState().auth
    config.headers = {
        Authorization: `Bearer ${token}`,
    }
    return config
})

export default authApi
