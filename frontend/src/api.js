import axios from "axios"

const apiUrl = ''

const api = axios.create({
    baseURL: import.meta.VITE_API_URL ? import.meta.env.VITE_API_URL: apiUrl
})

export default api