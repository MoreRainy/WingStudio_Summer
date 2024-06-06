import axios from 'axios'
// import { useUserStore } from '@/stores'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    //携带时间戳
    const timeStamp = new Date().getTime()
    if (config.method === 'post')
      config.url = `${config.url}&timestamp=${timeStamp}` //POST请求添加时间戳
    // else config.url = `${config.url}?timestamp=${timeStamp}`
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default instance
