import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

http.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

export default http
