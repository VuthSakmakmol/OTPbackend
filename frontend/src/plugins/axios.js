import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4190/api', // ✅ Base API
  headers: {
    'Content-Type': 'application/json'
  }
})

// ✅ Inject token into every request
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  install: (app) => {
    app.config.globalProperties.$api = instance
  }
}
