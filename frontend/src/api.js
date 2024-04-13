import axios from "axios"

const apiUrl = '/choreo-apis/hangman/backend/hangman-be2/v1.0'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL: apiUrl,
})
console.log(import.meta.env.VITE_API_URL, "dsfa")

export default api