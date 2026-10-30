import axios from "axios"

// Backend address; set VITE_API_URL in frontend/.env when it isn't running locally
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
})

export default api
