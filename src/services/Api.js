import axios from "axios"

const API = axios.create({
    baseURL: import.meta.env.VITE_API_ADDR || 'http://localhost:3000',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

API.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error)
    }
)

export default API