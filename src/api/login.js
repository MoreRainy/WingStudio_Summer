import request from '@/utils/request.js'
import { useLoginStore } from '@/stores/modules/login.js'
import loading from '@/assets/loading.jpg'

const loginStore = useLoginStore()
let timer

//获取二维码
export const getKey = async () => {
  console.log('getKey')
  try {
    request
      .get('/login/qr/key', { params: { timeStamp: +new Date() } })
      .then((result) => {
        loginStore.picKey = result.data.data.unikey
        return request.get('/login/qr/create', {
          params: { key: loginStore.picKey, qrimg: 'qrimg' }
        })
      })
      .then((result) => {
        //清除上一个定时器
        if (timer) {
          clearInterval(timer)
          timer = null
        }
        //变更二维码
        loginStore.picBase64 = result.data.data.qrimg
        //持续获取二维码状态
        timer = setInterval(getStatus, 1000)
      })
  } catch (error) {
    console.error('获取二维码失败:', error)
  }
}

//获取二维码状态
export const getStatus = async () => {
  console.log('getStatus')
  request
    .get('/login/qr/check', {
      params: { key: loginStore.picKey, timeStamp: +new Date() }
    })
    .then((result) => {
      loginStore.picStatus = result.data.code
      loginStore.picMsg = result.data.message
      if (loginStore.picStatus != '801') {
        loginStore.picBase64 = loading
      }
    })
}
